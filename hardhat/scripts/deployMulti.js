// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const Contract = await hre.ethers.getContractFactory("contracts/MultiSignature.sol:MultiSignature");
  const ownersAddresses = [
    "0x24CC375B80ADc32F7bc79b83343301458219FA50",
    "0x333A2399f8b7d898d8F20F53AD725455F679845D",
    "0x3a179ca8b981bf0dE44E7D40B777fbdc58D799B3",
    "0x3cd699f77Dd6a48aFb451BDAE3565EE1c79d3Acb",
    "0x8a352721f081aa3188af4466B3d74A13a5893eCa",
  ];
  const daoAddress = "0x6906647F46a3a70DD1FE59cb6Fb8af5a63fa7644";
  const contract = await Contract.deploy(ownersAddresses, 1, daoAddress);

  await contract.deployed();

  console.log(` deployed to ${contract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
