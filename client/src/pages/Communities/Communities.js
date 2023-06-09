import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Community.css";
import { Contract } from "ethers";
import { DAO_CONTRACT_ADDRESS, DAO_ABI } from "../../constants";
import { sliceAddress } from "../../utils/sliceAddress";

const Communities = ({ getProviderOrSigner, setWallets, setCommunities, communities, wallets, address }) => {
  const getWallets = async () => {
    try {
      const provider = await getProviderOrSigner();
      const contract = new Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, provider);
      const multiWalletCount = await contract.multiWalletCount();
      const walletArr = [];
      for (let i = 0; i < multiWalletCount; i++) {
        const address = await contract.multiAddresses(i);
        walletArr.push(address);
      }
      setWallets(walletArr);
    } catch (err) {
      console.error(err);
    }
  };

  const getComms = async () => {
    try {
      const provider = await getProviderOrSigner();
      const contract = new Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, provider);
      const arr = [];

      wallets.forEach(async (address) => {
        const comm = await contract.multiWallets(address);
        arr.push({
          approved: comm.approved,
          contractAddress: comm.contractAddress,
          executedProjectCounts: comm.executedProjectCounts,
        });
      });
      setCommunities(arr);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWallets();
    getComms();
  }, []);

  const approveComm = async (_contractAddress) => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, signer);
      const tx = await contract.approveRequest(_contractAddress);
      await tx.wait();
      alert("Community Approved");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="container my-4">
      <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-4">
        {communities
          .sort((a, b) => b.executedProjectCounts - a.executedProjectCounts)
          .map((community, i) => {
            return (
              <div key={i} className="col">
                <div className={`color${i} comm_card card mb-3 shadow`}>
                  <div className="card-body">
                    <div className="comm_info">
                      <p>Community Contract Address:</p>
                      <p>
                        <a href={`https://mumbai.polygonscan.com/address/${community.contractAddress}`} target="blank">
                          {sliceAddress(community.contractAddress)}
                        </a>
                      </p>
                    </div>
                    <div className="comm_info">
                      <p>Is Approved: </p>
                      <p>
                        {community.approved && (
                          <i className={`text-success fa-sharp fa-solid fa-circle-check fa-xl ms-2`}></i>
                        )}
                        {!community.approved && (
                          <i className={`text-danger fa-sharp fa-solid fa-circle-xmark fa-xl ms-2`}></i>
                        )}
                      </p>
                    </div>
                    <div className="comm_info">
                      <p>Number of Projects: {community.executedProjectCounts}</p>
                    </div>
                    <div className="comm_card_footer card-footer">
                      <Link className="comm_btn btn" to={{ pathname: `/communities/${community.contractAddress}` }}>
                        Details
                      </Link>
                      {!community.approved && address === "0x24CC375B80ADc32F7bc79b83343301458219FA50" && (
                        <button onClick={() => approveComm(community.contractAddress)} className="comm_btn btn">
                          Approve
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Communities;
