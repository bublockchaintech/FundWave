import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { DAO_ABI, DAO_CONTRACT_ADDRESS } from "../../constants/";

export const useContract = (providerOrSigner) => {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const _contract = new ethers.Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, providerOrSigner);
    setContract(_contract);
  }, []);

  return contract;
};
