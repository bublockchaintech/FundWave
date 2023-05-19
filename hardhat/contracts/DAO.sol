// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./interfaces/MultiSignature.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract DAO {
    using SafeMath for uint256;

    enum StageSection {
        NON_STAGE,
        PROJECT_CREATION_STAGE,
        PROJECT_FUNDING_STAGE,
        PROJECT_EXECUTION_STAGE
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

    mapping(uint16 => mapping(uint16 => Project)) stagesToProject;
    mapping(address => MultiSignatureWallet) public multiWallets;
    mapping(uint16 => Stage) public stages;

    address private owner;

    modifier isProjectCreationStage(uint16 stageId) {
        require(
            stages[stageId].stageState == StageSection.PROJECT_CREATION_STAGE
        );
        _;
    }

    modifier isProjectFundingStage(uint16 stageId) {
        require(
            stages[stageId].stageState == StageSection.PROJECT_FUNDING_STAGE
        );
        _;
    }

    modifier isProjectExecutingStage(uint16 stageId) {
        require(
            stages[stageId].stageState == StageSection.PROJECT_EXECUTION_STAGE
        );
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

    modifier isFormulaCalculated(uint16 stageId) {
        require(stages[stageId].coefficient > 0);
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

    // STAGE, APPROVED
    function createProject(
        address contractAddress,
        uint16 stageId
    )
        external
        approvedAccount(contractAddress)
        isProjectCreationStage(stageId)
    {
        Stage storage stage = stages[stageId];
        stage.projectCount++;

        Project memory project = Project({
            stageId: stageId,
            id: stage.projectCount,
            ownerContractAddress: contractAddress,
            totalFunds: 0,
            totalVotes: 0,
            confirmedBalance: 0
        });

        stagesToProject[stageId][project.id] = project;
    }

    function fund(
        uint16 stageId,
        uint16 projectId
    ) external payable isProjectFundingStage(stageId) {
        Project storage project = stagesToProject[stageId][projectId];
        Stage storage stage = stages[stageId];

        require(project.stageId != 0, "Project not initialized");

        stage.moneyPool += msg.value;
        project.totalFunds += msg.value;
        project.totalVotes++;
    }

    function distributeFunds(
        uint16 stageId
    )
        external
        onlyOwner
        isProjectExecutingStage(stageId)
        isFormulaCalculated(stageId)
    {
        Stage memory stage = stages[stageId];
        for (
            uint16 projectIndex = 1;
            projectIndex <= stage.projectCount;
            projectIndex++
        ) {
            Project memory project = stagesToProject[stageId][projectIndex];
            uint256 multiplication = project.totalFunds.mul(project.totalVotes);
            project.confirmedBalance = stage.coefficient.mul(multiplication);
            (bool sent, ) = project.ownerContractAddress.call{
                value: project.confirmedBalance
            }("");
            require(sent, "Failed to send ether");
        }
        stage.stageState = StageSection.NON_STAGE;
    }

    function calculateFormula(uint16 stageId) internal view {
        Stage memory stage = stages[stageId];
        uint256 sum = 0;
        for (
            uint16 projectIndex = 1;
            projectIndex <= stage.projectCount;
            projectIndex++
        ) {
            Project memory project = stagesToProject[stageId][projectIndex];
            uint256 multiplication = project.totalFunds.mul(project.totalVotes);
            sum = sum.add(multiplication);
        }
        uint256 coefficient = stage.moneyPool.div(sum);
        stage.coefficient = coefficient;
    }

    function getMultiSignatureWallet(
        address contractAddress
    ) external view returns (MultiSignatureWallet memory) {
        return multiWallets[contractAddress];
    }

    function getProject(
        uint16 stageId,
        uint16 projectId
    ) external view returns (Project memory) {
        return stagesToProject[stageId][projectId];
    }
}
