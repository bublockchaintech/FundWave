import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Community.css";
import { Contract } from "ethers";
import { DAO_CONTRACT_ADDRESS, DAO_ABI } from "../../constants";
import { sliceAddress } from "../../utils/sliceAddress";

const Communities = ({ getProviderOrSigner, setWallets, setCommunities, communities, wallets }) => {
  const getWallets = async () => {
    const provider = await getProviderOrSigner();
    const contract = new Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, provider);
    const multiWalletCount = await contract.multiWalletCount();
    for (let i = 0; i < multiWalletCount; i++) {
      const address = await contract.multiAddresses(i);
      const found = wallets.find((_address) => _address === address);
      if (!found) {
        setWallets([...wallets, address]);
      }
    }
  };

  const getComms = async () => {
    const provider = await getProviderOrSigner();
    const contract = new Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, provider);
    const arr = [];
    wallets.length > 0 &&
      wallets.forEach(async (address) => {
        const comm = await contract.multiWallets(address);
        setCommunities([
          ...communities,
          {
            approved: comm.approved,
            contractAddress: comm.contractAddress,
            executedProjectCounts: comm.executedProjectCounts,
          },
        ]);
      });
    setCommunities(arr);
  };

  useEffect(() => {
    setWallets([]);
    setCommunities([]);
    getWallets();
    getComms();
  }, []);

  return (
    <div className="container my-4">
      <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-4">
        {communities.map((community, i) => {
          return (
            <div key={i} className="col">
              <div className={`color${i} comm_card card mb-3 shadow`}>
                <div className="card-body">
                  <div className="comm_info">
                    <p>Community Contract Address:</p>
                    <p>{sliceAddress(community.contractAddress)}</p>
                  </div>
                  <div className="comm_info">
                    <p>Is Approved: </p>
                    <p>
                      {community.approved && <i className={`fa-sharp fa-solid fa-circle-check fa-xl ms-2`}></i>}
                      {!community.approved && <i className={`fa-sharp fa-solid fa-circle-xmark fa-xl ms-2`}></i>}
                    </p>
                  </div>
                  <div className="comm_info">
                    <p>Number of Projects: {community.executedProjectCounts}</p>
                  </div>
                  <div className="comm_card_footer card-footer">
                    <Link
                      className="comm_btn btn"
                      to={{ pathname: `/communities/${community.contractAddress}`, state: { ...community } }}
                    >
                      Details
                    </Link>
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
