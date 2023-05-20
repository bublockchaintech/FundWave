// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./interfaces/MultiSignature.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "hardhat/console.sol";

contract DAO {
    using SafeMath for uint256;

    enum StageSection {
        NON_STAGE,
        PROJECT_CREATION_STAGE,
        PROJECT_FUNDING_STAGE,
        PROJECT_EXECUTION_STAGE,
        FINISHED
    }

    struct Stage {
        uint16 id;
        uint256 moneyPool;
        StageSection stageState;
        uint16 projectCount;
        uint256 coefficient;
    }

    struct MultiSignatureWallet {
        uint16 id;
        address contractAddress;
        address[] owners;
        bool approved;
        uint16 executedProjectCounts;
        uint16 rejectedProjectCounts;
        Project[] previousProjects;
    }

    struct Project {
        uint16 stageId;
        uint16 id;
        address ownerContractAddress;
        uint256 totalFunds;
        uint64 totalVotes;
        uint256 confirmedBalance;
    }

    uint16 public stageCount;
    uint16 public multiWalletCount;

    mapping(uint16 => mapping(uint16 => Project)) public stagesToProject;
    mapping(address => MultiSignatureWallet) public multiWallets;
    mapping(uint16 => Stage) public stages;

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

    modifier isProjectExecutingStage() {
        require(
            stages[stageCount].stageState ==
                StageSection.PROJECT_EXECUTION_STAGE
        );
        _;
    }

    modifier isFinishedStage() {
        require(stages[stageCount].stageState == StageSection.FINISHED);
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
                _wallet.owners = MultiSignature(multiSignatureContract)
                    .getOwners();
            }
        }
    }

    function approveRequest(address multiSignatureContract) external onlyOwner {
        multiWallets[multiSignatureContract].approved = true;
    }

    function initializeStage() external onlyOwner {
        stageCount++;
        stages[stageCount] = Stage({
            id: stageCount,
            moneyPool: 0,
            stageState: StageSection.NON_STAGE,
            projectCount: 0,
            coefficient: 0
        });
    }

    function setStageToCreation() external onlyOwner {
        stages[stageCount].stageState = StageSection.PROJECT_CREATION_STAGE;
    }

    function setStageToFunding() external onlyOwner {
        stages[stageCount].stageState = StageSection.PROJECT_FUNDING_STAGE;
    }

    function setStageToExecution() external onlyOwner {
        stages[stageCount].stageState = StageSection.PROJECT_EXECUTION_STAGE;
    }

    // STAGE, APPROVED
    function createProject(
        address contractAddress
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
            confirmedBalance: 0
        });

        stagesToProject[stageCount][project.id] = project;
    }

    function fund(uint16 projectId) external payable isProjectFundingStage {
        // require(msg.value > 0, "Fund must be more than 0");
        Project storage project = stagesToProject[stageCount][projectId];
        Stage storage stage = stages[stageCount];

        require(project.stageId != 0, "Project not initialized");

        stage.moneyPool += msg.value;
        project.totalFunds += msg.value;
        project.totalVotes++;
    }

    function distributeFunds()
        external
        onlyOwner
        isProjectExecutingStage
        isFormulaCalculated
    {
        Stage storage stage = stages[stageCount];
        for (
            uint16 projectIndex = 1;
            projectIndex <= stage.projectCount;
            projectIndex++
        ) {
            Project storage project = stagesToProject[stageCount][projectIndex];
            uint256 multiplication = project.totalFunds.mul(project.totalVotes);
            uint256 dividerForCoefficient = multiplication.div(10 ** 9);
            project.confirmedBalance = stage.coefficient.mul(
                dividerForCoefficient
            );
        }
        stage.stageState = StageSection.FINISHED;
    }

    function withdrawProjectMoney(
        uint16 stageId,
        uint16 projectId
    ) external isFinishedStage {
        Project storage project = stagesToProject[stageId][projectId];
        require(
            MultiSignature(project.ownerContractAddress).isOwner(msg.sender),
            "Not authorized"
        );
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
}
