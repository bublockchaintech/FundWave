import React from "react";
import { DAO_ABI, DAO_CONTRACT_ADDRESS } from "../../constants";
import { Contract } from "ethers";

const ProjectCard = ({ project, getProviderOrSigner }) => {
  console.log(project);

  const withdrawMoney = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, signer);
      let tx = await contract.withdrawProjectMoney(project.stageId, project.id);
      await tx.wait();
      window.alert("Withdrawed successfully.");
    } catch (error) {
      window.alert(error.message);
      console.log(error);
    }
  };
  return (
    <div className="comm_card_single card pt-3">
      <div className="row">
        <div className="col-7">
          <h3 className="card-title">
            <i>Stage:</i> {project.stageId}
          </h3>
          <h3 className="card-title">
            <i>Project ID:</i> {project.id}
          </h3>
          <h3 className="card-title">
            <i>{project.title}</i>
          </h3>
          <div className="comm_info">
            <h5>
              <i>Subject:</i> <span className="h6">{project.subject}</span>
            </h5>
          </div>
          <div className="comm_info">
            <h5>
              <i>Project Details:</i> <span className="h6">{project.explanation}</span>
            </h5>
          </div>
        </div>
        <div className="col-3 d-flex flex-column align-items-center justify-content-center text-center">
          <div className="text-center">
            <i className="fa-solid fa-coins"></i>
            <p>{(project.totalFunds.toString() / 10 ** 18).toFixed(3)} MATIC</p>
          </div>
          <div className="h4 text-success text-center">
            <i className="fa-solid fa-circle-dollar-to-slot"></i>
            <p>{(project.confirmedBalance.toString() / 10 ** 18).toFixed(3)} MATIC</p>
          </div>
          <div>
            <i className="fa-sharp fa-solid fa-user"></i>
            <p>{project.totalVotes.toString()}</p>
          </div>
        </div>
        {!project.withdrawed && project.confirmedBalance.toString() !== "0" && (
          <div className="col-1 d-flex flex-row justify-content-end align-items-end m-4">
            <button className="btn btn-success" onClick={withdrawMoney}>
              Withdraw
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
