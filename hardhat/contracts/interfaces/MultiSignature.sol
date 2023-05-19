// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface MultiSignature {
    function getDaoContractAddress() external view returns (address);

    function getOwners() external view returns (address[] memory);
}
