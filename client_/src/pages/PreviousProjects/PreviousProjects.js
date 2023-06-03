import React, { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";
import "./PreviousProjects.css";
import { Contract } from "ethers";
import { DAO_ABI, DAO_CONTRACT_ADDRESS } from "../../constants";
import { sliceAddress } from "../../utils/sliceAddress";

const PreviousProjects = ({ projects, setProjects, getProviderOrSigner, selectedStage }) => {
  const modalRef = useRef();
  const [stageCount, setStageCount] = useState(null);

  const stageSection = async () => {
    const provider = await getProviderOrSigner();
    const contract = new Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, provider);
    const _stageCount = await contract.stageCount();
    setStageCount(_stageCount);
  };

  useEffect(() => {
    const getProjects = async () => {
      try {
        const provider = await getProviderOrSigner();
        const contract = new Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, provider);
        const projectsArr = [];
        // update stageCount with less than, not less equal than
        for (let i = 1; i <= stageCount; i++) {
          const { projectCount } = await contract.stages(stageCount);
          for (let j = 1; j <= projectCount; j++) {
            const _project = await contract.stagesToProject(i, j);
            projectsArr.push({
              project_name: _project.title,
              community_address: _project.ownerContractAddress,
              totalFunds: _project.totalFunds.toString() / 10 ** 18,
              confirmedBalance: _project.confirmedBalance.toString() / 10 ** 18,
              totalVotes: _project.totalVotes.toString(),
              id: _project.id,
              subject: _project.subject,
              text: _project.explanation,
            });
          }
        }
        setProjects(projectsArr);
      } catch (error) {
        console.log(error);
      }
    };

    stageSection();
    getProjects();
  }, [projects]);

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

  const listItems = projects.map((project, i) => {
    return (
      <span key={i}>
        <div className="col">
          <div className={`color${i % 6} prev_card card mb-3 shadow`}>
            <div className="card-body">
              <h5 className="card-title">{project.project_name}</h5>
              <div className="execute_info">
                <p>
                  <a
                    className="a_tag"
                    href={`https://mumbai.polygonscan.com/address/${project.community_address}`}
                    target="blank"
                  >
                    {sliceAddress(project.community_address)}
                  </a>
                </p>
                <div className="execute_number">
                  <i className="fa-solid fa-coins"></i>
                  <p>{project.totalFunds}</p>
                </div>
                <div className="execute_number">
                  <i className="fa-sharp fa-solid fa-user"></i>
                  <p>{project.totalVotes}</p>
                </div>
              </div>
              <h5>{project.subject}</h5>
              <p>{project.text.length > 120 ? `${project.text.substring(0, 120)}...` : project.text}</p>
            </div>
            <div className="execute_card_footer card-footer">
              <button onClick={showModal} type="button" className="btn-light prev_btn btn">
                Details
              </button>
            </div>
          </div>
        </div>

        <div className="modal" ref={modalRef}>
          <div className="modal-dialog modal-dialog-scrollable modal-fullscreen-sm-down">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">{project.project_name}</h4>
                <button type="button" className="btn-close" onClick={hideModal}></button>
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
                <div className="execute_icons">
                  <div>
                    <i className="fa-solid fa-coins"></i>
                    <p>{project.totalFunds}</p>
                  </div>
                  <div>
                    <i className="fa-sharp fa-solid fa-user"></i>
                    <p>{project.totalVotes}</p>
                  </div>
                </div>
                <div className="execute_modal_footer modal-footer"></div>
              </div>
            </div>
          </div>
        </div>
      </span>
    );
  });

  return (
    <div className="my-5">
      ern
      <div className="container my-4">
        <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-4">{listItems}</div>
      </div>
    </div>
  );
};

export default PreviousProjects;
