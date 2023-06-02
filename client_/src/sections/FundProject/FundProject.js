import React, { useEffect, useRef, useState } from "react";
import { Stage } from "../../components";
import { Modal } from "bootstrap";
import "./FundProject.css";
import { DAO_ABI, DAO_CONTRACT_ADDRESS } from "../../constants";
import { Contract } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { sliceAddress } from "../../utils/sliceAddress";

const FundProject = ({
  projects,
  lastUpdate,
  getProviderOrSigner,
  stageState,
  stageCount,
  stageProjectsCount,
  setStageProjects,
}) => {
  const [fundAmount, setFundAmount] = useState(0);

  const modalRef = useRef();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const provider = await getProviderOrSigner();
        const contract = new Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, provider);
        const projectsArr = [];
        for (let i = 1; i <= stageProjectsCount; i++) {
          const _project = await contract.stagesToProject(stageCount, i);
          projectsArr.push({
            project_name: _project.title,
            community_address: _project.ownerContractAddress,
            totalFunds: _project.totalFunds.toString() / 10 ** 18,
            totalVotes: _project.totalVotes.toString(),
            id: _project.id,
            subject: _project.subject,
            text: _project.explanation,
          });
        }
        setStageProjects(projectsArr);
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, [getProviderOrSigner, projects, setStageProjects, stageCount, stageProjectsCount]);

  const showModal = () => {
    const modalEl = modalRef.current;
    const bsModal = new Modal(modalEl, {
      backdrop: "static",
      keyboard: false,
    });
    bsModal.show();
  };

  const hideModal = () => {
    const modalEl = modalRef.current;
    const bsModal = Modal.getInstance(modalEl);
    bsModal.hide();
  };

  const fundProject = async (_id) => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, signer);
      let tx = await contract.fund(_id, { value: parseEther(fundAmount.toString()) });
      tx.wait();
      window.alert("Funded successfully");
      setFundAmount(0);
    } catch (error) {
      window.alert(error.message);
      console.error(error);
    }
  };

  const listItems = projects.map((project, i) => {
    return (
      <>
        <div key={i} className="col">
          <div className={`color${i % 6} fund_card card mb-3 shadow`}>
            <div className="card-body" onClick={showModal} type="button">
              <h5 className="card-title">{project.project_name}</h5>
              <div className="fund_info">
                <p>
                  <a
                    className="a_tag"
                    href={`https://mumbai.polygonscan.com/address/${project.community_address}`}
                    target="blank"
                  >
                    {sliceAddress(project.community_address)}
                  </a>
                </p>
                <div className="fund_number">
                  <i className="fa-solid fa-coins me-2"></i>
                  <p>{project.totalFunds}</p>
                </div>
                <div className="fund_number">
                  <i className="fa-sharp fa-solid fa-user me-2"></i>
                  <p>{project.totalVotes}</p>
                </div>
              </div>
              <h5>{project.subject}</h5>
              <p>{project.text.length > 120 ? `${project.text.substring(0, 120)}...` : project.text}</p>
            </div>
            <div className="card-footer fund_card_footer">
              <div className="form-label">
                <input
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                  type="number"
                  name="number"
                  id="number"
                  className="form-control"
                />
              </div>
              <button onClick={() => fundProject(project.id)} className="fund_btn btn">
                FUND
              </button>
            </div>
          </div>
        </div>

        <div className="modal" ref={modalRef}>
          <div className="modal-dialog modal-dialog-scrollable modal-fullscreen-sm-down">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">{project.project_name}</h4>
                <button type="button" onClick={hideModal} className="btn-close"></button>
              </div>
              <div className="modal-body">
                <p>
                  Community Address:
                  <a
                    className="a_tag_modal"
                    href={`https://mumbai.polygonscan.com/address/${project.community_address}`}
                    target="blank"
                  >
                    <span className="bold">{`  ${sliceAddress(project.community_address)}`}</span>
                  </a>
                </p>
                <p>
                  Subject: <span className="bold">{project.subject}</span>
                </p>
                <p>Explanation: </p>
                <p>
                  <span className="bold">{project.text}</span>
                </p>
                <div className="fund_icons">
                  <div>
                    <i className="fa-solid fa-coins" />
                    <p>{project.totalFunds}</p>
                  </div>
                  <div>
                    <i className="fa-sharp fa-solid fa-user" />
                    <p>{project.totalVotes}</p>
                  </div>
                </div>
                <div className="fund_modal_footer">
                  <div className="form-label">
                    <input
                      value={fundAmount}
                      onChange={(e) => setFundAmount(e.target.value)}
                      type="number"
                      name="number"
                      id="fund_number"
                      className="form-control modal-input"
                    />
                  </div>
                  <button onClick={() => fundProject(project.id)} className="btn fund_modal_btn">
                    FUND
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      <Stage
        stage={"FUND_PROJECT"}
        lastUpdate={lastUpdate}
        stageState={stageState}
        getProviderOrSigner={getProviderOrSigner}
      />
      <div className="container my-4">
        <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-4">{listItems}</div>
      </div>
    </>
  );
};

export default FundProject;
