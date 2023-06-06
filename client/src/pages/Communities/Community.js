import React, { useEffect, useState } from "react";
import "./Community.css";
import { useParams } from "react-router-dom";
import { Contract } from "ethers";
import { DAO_ABI, DAO_CONTRACT_ADDRESS, MULTI_ABI } from "../../constants";
import { sliceAddress } from "../../utils/sliceAddress";

const Community = ({ getProviderOrSigner }) => {
  const { contractAddress } = useParams();
  const [community, setCommunity] = useState(null);

  useEffect(() => {
    const getCommunity = async () => {
      try {
        const provider = await getProviderOrSigner();
        const contract = new Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, provider);
        const comm = await contract.multiWallets(contractAddress);
        const projects = await contract.getProjects(contractAddress);

        const commContract = new Contract(contractAddress, MULTI_ABI, provider);
        const owners = await commContract.getOwners();

        setCommunity({
          community_address: comm.contractAddress,
          is_approved: comm.approved,
          number_of_projects: comm.executedProjectCounts,
          owners,
          projects,
        });
      } catch (error) {
        alert(error.message);
      }
    };
    getCommunity();
  }, []);

  return (
    <>
      {community && (
        <>
          <img
            className="comm_image"
            src="https://img.freepik.com/free-vector/radiating-light-movement-background_52683-14635.jpg?size=626&ext=jpg&ga=GA1.1.1725162033.1684514575&semt=sph"
            alt=""
          ></img>
          <div className="container">
            <div className="comm_card_bg card px-4 pt-4">
              <div className="row">
                <div className="col-8">
                  <div className="comm_info">
                    <h1 className="card-title">
                      <a
                        className="a_tag_modal"
                        href={`https://mumbai.polygonscan.com/address/${community.community_address}`}
                        target="blank"
                      >
                        {sliceAddress(community.community_address)}
                      </a>
                    </h1>
                  </div>
                  <div className="form-label">
                    <label for="text">Approved</label>
                    {community.is_approved && <i className={`fa-sharp fa-solid fa-circle-check fa-xl ms-2`}></i>}
                    {!community.is_approved && <i className={`fa-sharp fa-solid fa-circle-xmark fa-xl ms-2`}></i>}
                  </div>
                  <div className="comm_info">
                    <h3>Number of Projects: {community.number_of_projects}</h3>
                  </div>
                </div>
                <div className="col-4">
                  <div className={`card-body`}>
                    <p className="comm_info">
                      <b>Team Members:</b>
                    </p>
                    <div className="comm_scroll">
                      {community.owners.map((owner) => {
                        return (
                          <p key={owner}>
                            <a
                              className="a_tag_modal"
                              href={`https://mumbai.polygonscan.com/address/${owner}`}
                              target="blank"
                            >
                              {sliceAddress(owner)}
                            </a>
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {community.number_of_projects > 0 &&
              community.projects.map((project, i) => {
                return (
                  <div key={i} className="comm_card_single card pt-3">
                    <div className="row">
                      <div className="col-8">
                        <h3 className="card-title">Stage: {project.stageId}</h3>
                        <h3 className="card-title">Project ID: {project.id}</h3>
                        <h3 className="card-title">{project.title}</h3>
                        <div className="comm_info">
                          <h5>Subject:</h5>
                          <p>{project.subject}</p>
                        </div>
                        <div className="comm_info">
                          <h5>Project Details:</h5>
                          <p>{project.explanation} </p>
                        </div>
                      </div>
                      <div className="col-4">
                        <div>
                          <i className="fa-solid fa-coins"></i>
                          <p>{project.totalFunds.toString() / 10 ** 18}</p>
                        </div>
                        <div>
                          <i className="fa-sharp fa-solid fa-user"></i>
                          <p>{project.totalVotes.toString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </>
  );
};

export default Community;
