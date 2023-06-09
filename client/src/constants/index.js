export const DAO_CONTRACT_ADDRESS = "0x65E1d98B899354Ce94E8e280f5E3d43f9e8D5F29";

export const MULTI_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "owners",
    outputs: [
      {
        internalType: "address",
        name: "owners",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOwners",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const DAO_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "multiSignatureContract",
        type: "address",
      },
    ],
    name: "approveRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "_title",
        type: "string",
      },
      {
        internalType: "string",
        name: "_subject",
        type: "string",
      },
      {
        internalType: "string",
        name: "_explanation",
        type: "string",
      },
    ],
    name: "createProject",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "projectId",
        type: "uint16",
      },
    ],
    name: "fund",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "performUpkeep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "multiSignatureContract",
        type: "address",
      },
    ],
    name: "requestForMultiSignature",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "updateInterval",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "stageId",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "projectId",
        type: "uint16",
      },
    ],
    name: "withdrawProjectMoney",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "allStagesFundAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "allStagesProjectCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "allStagesVoteCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "checkUpkeep",
    outputs: [
      {
        internalType: "bool",
        name: "upkeepNeeded",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "getOwners",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "getProjects",
    outputs: [
      {
        components: [
          {
            internalType: "uint16",
            name: "stageId",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "id",
            type: "uint16",
          },
          {
            internalType: "address",
            name: "ownerContractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "totalFunds",
            type: "uint256",
          },
          {
            internalType: "uint64",
            name: "totalVotes",
            type: "uint64",
          },
          {
            internalType: "uint256",
            name: "confirmedBalance",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "withdrawed",
            type: "bool",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "subject",
            type: "string",
          },
          {
            internalType: "string",
            name: "explanation",
            type: "string",
          },
        ],
        internalType: "struct DAO.Project[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getStageDonationAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "stageId",
        type: "uint16",
      },
    ],
    name: "getStageDonationAmountWithStageId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getStageProjectsCount",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "stageId",
        type: "uint16",
      },
    ],
    name: "getStageProjectsCountWithStageId",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "interval",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastTimeStamp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "multiAddresses",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "multiWalletCount",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "multiWallets",
    outputs: [
      {
        internalType: "uint16",
        name: "id",
        type: "uint16",
      },
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
      {
        internalType: "uint16",
        name: "executedProjectCounts",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stageCount",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    name: "stages",
    outputs: [
      {
        internalType: "uint16",
        name: "id",
        type: "uint16",
      },
      {
        internalType: "uint48",
        name: "createdAt",
        type: "uint48",
      },
      {
        internalType: "uint48",
        name: "updatedAt",
        type: "uint48",
      },
      {
        internalType: "uint256",
        name: "moneyPool",
        type: "uint256",
      },
      {
        internalType: "enum DAO.StageSection",
        name: "stageState",
        type: "uint8",
      },
      {
        internalType: "uint16",
        name: "projectCount",
        type: "uint16",
      },
      {
        internalType: "uint256",
        name: "coefficient",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isFundDistributed",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "firstTimeCreation",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "firstTimeFunding",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    name: "stagesToProject",
    outputs: [
      {
        internalType: "uint16",
        name: "stageId",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "id",
        type: "uint16",
      },
      {
        internalType: "address",
        name: "ownerContractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "totalFunds",
        type: "uint256",
      },
      {
        internalType: "uint64",
        name: "totalVotes",
        type: "uint64",
      },
      {
        internalType: "uint256",
        name: "confirmedBalance",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "withdrawed",
        type: "bool",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "subject",
        type: "string",
      },
      {
        internalType: "string",
        name: "explanation",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
