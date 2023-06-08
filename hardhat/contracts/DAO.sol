// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./interfaces/MultiSignature.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";

contract DAO is AutomationCompatibleInterface {
    using SafeMath for uint256;

    uint256 public immutable interval;
    uint256 public lastTimeStamp;

    enum StageSection {
        NON_STAGE, // Stage Opening, 3 DAYS
        PROJECT_CREATION_STAGE, // Project Creation, 5 DAYS
        PROJECT_FUNDING_STAGE, // Project Funding 8 DAYS
        PROJECT_EXECUTION_STAGE, // Project Execution 3 DAYS
        FINISHED // Finished
    }

    struct Stage {
        uint16 id;
        uint48 createdAt;
        uint48 updatedAt;
        uint256 moneyPool;
        StageSection stageState;
        uint16 projectCount;
        uint256 coefficient;
        bool isFundDistributed;
    }

    struct MultiSignatureWallet {
        uint16 id;
        address contractAddress;
        address[] owners;
        bool approved;
        uint16 executedProjectCounts;
        Project[] previousProjects;
    }

    struct Project {
        uint16 stageId;
        uint16 id;
        address ownerContractAddress;
        uint256 totalFunds;
        uint64 totalVotes;
        uint256 confirmedBalance;
        bool withdrawed;
        string title;
        string subject;
        string explanation;
    }

    uint16 public stageCount;
    uint16 public multiWalletCount;
    uint256 public allStagesVoteCount;
    uint256 public allStagesFundAmount;
    uint256 public allStagesProjectCount;
    address[] public multiAddresses;

    mapping(uint16 => mapping(uint16 => Project)) public stagesToProject;
    mapping(address => MultiSignatureWallet) public multiWallets;
    mapping(uint16 => Stage) public stages;
    mapping(address => mapping(uint16 => mapping(uint16 => bool))) isAddressFundProject;

    address private owner;

    modifier isProjectCreationStage() {
        require(
            stages[stageCount].stageState == StageSection.PROJECT_CREATION_STAGE
        );
        _;
    }

    modifier isProjectFundingStage() {
        require(
            stages[stageCount].stageState == StageSection.PROJECT_FUNDING_STAGE
        );
        _;
    }

    modifier isFinishedStage(uint16 stageId) {
        require(stages[stageId].stageState == StageSection.FINISHED);
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    modifier approvedAccount(address contractAddress) {
        require(multiWallets[contractAddress].approved == true);
        _;
    }

    modifier isFormulaCalculated() {
        require(stages[stageCount].coefficient > 0);
        _;
    }

    constructor(uint256 updateInterval) {
        owner = msg.sender;
        interval = updateInterval;
        lastTimeStamp = block.timestamp;

        stages[stageCount].stageState = StageSection.FINISHED;
    }

    function checkUpkeep(
        bytes calldata /* checkData */
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory /* performData */)
    {
        upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        if ((block.timestamp - lastTimeStamp) > interval) {
            if (stages[stageCount].stageState == StageSection.FINISHED) {
                lastTimeStamp = block.timestamp;
                initializeStage();
            } else if (
                stages[stageCount].stageState == StageSection.NON_STAGE
            ) {
                setStageToCreation();
            } else if (
                stages[stageCount].stageState ==
                StageSection.PROJECT_CREATION_STAGE
            ) {
                setStageToFunding();
            } else if (
                stages[stageCount].stageState ==
                StageSection.PROJECT_FUNDING_STAGE
            ) {
                setStageToExecution();
            } else if (
                stages[stageCount].stageState ==
                StageSection.PROJECT_EXECUTION_STAGE
            ) {
                if (stages[stageCount].projectCount > 0) {
                    calculateFormula();
                    distributeFunds();
                } else {
                    initializeStage();
                }
            }
        }
    }

    /*
     *  Contrat should be verified, so we can check it's appropriate or not.
     */
    function requestForMultiSignature(address multiSignatureContract) external {
        if (
            MultiSignature(multiSignatureContract).getDaoContractAddress() ==
            address(this)
        ) {
            MultiSignatureWallet storage _wallet = multiWallets[
                multiSignatureContract
            ];

            if (_wallet.id == 0) {
                multiWalletCount++;
                _wallet.id = multiWalletCount;
                _wallet.contractAddress = multiSignatureContract;
                multiAddresses.push(multiSignatureContract);
            }
            _wallet.owners = MultiSignature(multiSignatureContract).getOwners();
        }
    }

    function approveRequest(address multiSignatureContract) external onlyOwner {
        multiWallets[multiSignatureContract].approved = true;
    }

    function initializeStage() internal {
        stageCount++;
        stages[stageCount] = Stage({
            id: stageCount,
            createdAt: uint48(block.timestamp),
            updatedAt: uint48(block.timestamp),
            moneyPool: 0,
            stageState: StageSection.NON_STAGE,
            projectCount: 0,
            coefficient: 0,
            isFundDistributed: false
        });
    }

    function setStageToCreation() internal {
        Stage storage stage = stages[stageCount];
        // require(
        //     (stage.updatedAt + 3 days) < block.timestamp,
        //     "Initialized stage is not over"
        // );
        stage.stageState = StageSection.PROJECT_CREATION_STAGE;
        stage.updatedAt = uint48(block.timestamp);
    }

    function setStageToFunding() internal {
        Stage storage stage = stages[stageCount];
        // require(
        //     (stage.updatedAt + 5 days) < block.timestamp,
        //     "Creation stage is not over"
        // );
        stage.stageState = StageSection.PROJECT_FUNDING_STAGE;
        stage.updatedAt = uint48(block.timestamp);
    }

    function setStageToExecution() internal {
        Stage storage stage = stages[stageCount];
        // require(
        //     (stage.updatedAt + 8 days) < block.timestamp,
        //     "Funding stage is not over"
        // );
        stage.stageState = StageSection.PROJECT_EXECUTION_STAGE;
        stage.updatedAt = uint48(block.timestamp);
    }

    // STAGE, APPROVED
    function createProject(
        address contractAddress,
        string memory _title,
        string memory _subject,
        string memory _explanation
    ) external approvedAccount(contractAddress) isProjectCreationStage {
        require(
            MultiSignature(contractAddress).isOwner(msg.sender),
            "Not authorized"
        );
        Stage storage stage = stages[stageCount];
        stage.projectCount++;

        Project memory project = Project({
            stageId: stageCount,
            id: stage.projectCount,
            ownerContractAddress: contractAddress,
            totalFunds: 0,
            totalVotes: 0,
            confirmedBalance: 0,
            withdrawed: false,
            title: _title,
            subject: _subject,
            explanation: _explanation
        });
        allStagesProjectCount++;
        stagesToProject[stageCount][project.id] = project;
    }

    function fund(uint16 projectId) external payable isProjectFundingStage {
        require(msg.value > 0, "Fund must be more than 0");
        Project storage project = stagesToProject[stageCount][projectId];
        Stage storage stage = stages[stageCount];

        require(project.stageId != 0, "Project not initialized");

        if (!isAddressFundProject[msg.sender][stageCount][projectId]) {
            isAddressFundProject[msg.sender][stageCount][projectId] = true;
            project.totalVotes++;
        }
        allStagesFundAmount += msg.value;
        stage.moneyPool += msg.value;
        project.totalFunds += msg.value;
        allStagesVoteCount++;
    }

    function distributeFunds() internal {
        Stage storage stage = stages[stageCount];
        require(!stage.isFundDistributed, "Fund already distributed");
        stage.isFundDistributed = true;
        for (
            uint16 projectIndex = 1;
            projectIndex <= stage.projectCount;
            projectIndex++
        ) {
            Project storage project = stagesToProject[stageCount][projectIndex];
            MultiSignatureWallet storage multiWallet = multiWallets[
                project.ownerContractAddress
            ];
            uint256 multiplication = project.totalFunds.mul(project.totalVotes);
            uint256 dividerForCoefficient = multiplication.div(10 ** 9);
            project.confirmedBalance = stage.coefficient.mul(
                dividerForCoefficient
            );
            multiWallet.executedProjectCounts++;
            multiWallet.previousProjects.push(project);
        }
        stage.stageState = StageSection.FINISHED;
        stage.updatedAt = uint48(block.timestamp);
    }

    function withdrawProjectMoney(
        uint16 stageId,
        uint16 projectId
    ) external isFinishedStage(stageId) {
        Project storage project = stagesToProject[stageId][projectId];
        require(
            MultiSignature(project.ownerContractAddress).isOwner(msg.sender),
            "Not authorized"
        );
        require(!project.withdrawed, "Project already withdrawed");
        project.withdrawed = true;

        (bool sent, ) = project.ownerContractAddress.call{
            value: project.confirmedBalance
        }("");
        require(sent, "Failed to send ether");
    }

    function calculateFormula() internal {
        Stage storage stage = stages[stageCount];
        uint256 sum = 0;
        for (
            uint16 projectIndex = 1;
            projectIndex <= stage.projectCount;
            projectIndex++
        ) {
            Project memory project = stagesToProject[stageCount][projectIndex];
            uint256 multiplication = project.totalFunds.mul(project.totalVotes);
            sum = sum.add(multiplication);
        }
        sum = sum.div(10 ** 9);
        uint256 coefficient = stage.moneyPool.div(sum);
        stage.coefficient = coefficient;
    }

    function getStageProjectsCountWithStageId(
        uint16 stageId
    ) public view returns (uint16) {
        return stages[stageId].projectCount;
    }

    function getStageProjectsCount() external view returns (uint16) {
        return getStageProjectsCountWithStageId(stageCount);
    }

    function getStageDonationAmountWithStageId(
        uint16 stageId
    ) public view returns (uint256) {
        return stages[stageId].moneyPool;
    }

    function getStageDonationAmount() external view returns (uint256) {
        return getStageDonationAmountWithStageId(stageCount);
    }

    function getOwners(
        address contractAddress
    ) external view returns (address[] memory) {
        return multiWallets[contractAddress].owners;
    }

    function getProjects(
        address contractAddress
    ) external view returns (Project[] memory) {
        return multiWallets[contractAddress].previousProjects;
    }

    function getOwner() external view returns (address) {
        return owner;
    }
}
