// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./interfaces/MultiSignature.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "hardhat/console.sol";

contract DAO {
    using SafeMath for uint256;

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

    modifier isStageInitialized() {
        require(stages[stageCount].stageState == StageSection.NON_STAGE);
        _;
    }

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

    modifier isProjectExecutingStage() {
        require(
            stages[stageCount].stageState ==
                StageSection.PROJECT_EXECUTION_STAGE
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

    constructor() {
        owner = msg.sender;
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

    function initializeStage() external onlyOwner {
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

    function setStageToCreation() external onlyOwner isStageInitialized {
        Stage storage stage = stages[stageCount];
        require(
            (stage.updatedAt + 30 seconds) < block.timestamp, // 3 days should be
            "Initialized stage is not over"
        );
        stage.stageState = StageSection.PROJECT_CREATION_STAGE;
        stage.updatedAt = uint48(block.timestamp);
    }

    function setStageToFunding() external onlyOwner isProjectCreationStage {
        Stage storage stage = stages[stageCount];
        require(
            (stage.updatedAt + 30 seconds) < block.timestamp, // 5 days should be
            "Creation stage is not over"
        );
        stage.stageState = StageSection.PROJECT_FUNDING_STAGE;
        stage.updatedAt = uint48(block.timestamp);
    }

    function setStageToExecution() external onlyOwner isProjectFundingStage {
        Stage storage stage = stages[stageCount];
        require(
            (stage.updatedAt + 30 seconds) < block.timestamp, // 8 days should be
            "Funding stage is not over"
        );
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
        // require(msg.value > 0, "Fund must be more than 0");
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

    function distributeFunds()
        external
        onlyOwner
        isProjectExecutingStage
        isFormulaCalculated
    {
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

    function calculateFormula() external onlyOwner isProjectExecutingStage {
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
