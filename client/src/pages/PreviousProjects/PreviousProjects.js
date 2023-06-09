import React, { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";
import "./PreviousProjects.css";
import { Contract } from "ethers";
import { DAO_ABI, DAO_CONTRACT_ADDRESS } from "../../constants";
import { sliceAddress } from "../../utils/sliceAddress";

const PreviousProjects = ({ projects, setProjects, getProviderOrSigner }) => {
  const modalRef = useRef();
  const [stageCount, setStageCount] = useState(null);

  useEffect(() => {
    const stageSection = async () => {
      try {
        const provider = await getProviderOrSigner();
        const contract = new Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, provider);
        const _stageCount = await contract.stageCount();
        setStageCount(_stageCount);
      } catch (err) {
        console.log(err);
      }
    };

    const getProjects = async () => {
      try {
        const provider = await getProviderOrSigner();
        const contract = new Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, provider);
        const projectsArr = [];
        // update stageCount with less than, not less equal than
        for (let i = 1; i <= stageCount; i++) {
          const { projectCount } = await contract.stages(i);
          for (let j = 1; j <= projectCount; j++) {
            const _project = await contract.stagesToProject(i, j);
            projectsArr.push({
              project_name: _project.title,
              community_address: _project.ownerContractAddress,
              totalFunds: (_project.totalFunds.toString() / 10 ** 18).toFixed(3),
              confirmedBalance: (_project.confirmedBalance.toString() / 10 ** 18).toFixed(3),
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
    if (projects.length === 0) {
      getProjects();
    }
  }, [getProviderOrSigner, setProjects, stageCount]);

  const [show, setShow] = useState(false);
  const [tempData, setTempData] = useState([]);

  const showModal = (project_name, community_address, totalFunds, totalVotes, confirmedBalance, subject, text) => {
    try {
      setShow(true);
      setTempData([project_name, community_address, totalFunds, totalVotes, confirmedBalance, subject, text]);
      const modalEl = modalRef.current;
      const bsModal = new Modal(modalEl, {
        keyboard: true,
      });
      bsModal.show();
    } catch (error) {
      console.error(error);
    }
  };

  const hideModal = () => {
    setShow(false);
    const modalEl = modalRef.current;
    const bsModal = Modal.getOrCreateInstance(modalEl);
    bsModal.hide();
  };

  const listItems = projects
    .sort((a, b) => b.confirmedBalance - a.confirmedBalance)
    .map((project, i) => {
      return (
        <span key={i}>
          <div className="col">
            <div className={`color${i % 6} prev_card card mb-3 shadow`}>
              <div className="card-body">
                <h5 className="card-title">{project.project_name}</h5>
                <p>
                  <a
                    className="a_tag"
                    href={`https://mumbai.polygonscan.com/address/${project.community_address}`}
                    target="blank"
                  >
                    {sliceAddress(project.community_address)}
                  </a>
                </p>
                <div className="execute_info">
                  <div className="execute_number">
                    <i className="fa-solid fa-coins"></i>
                    <p>{project.totalFunds} MATIC</p>
                  </div>
                  <div className="execute_number h6">
                    <i className="fa-solid fa-circle-dollar-to-slot"></i>
                    <p>{project.confirmedBalance} MATIC</p>
                  </div>
                  <div className="execute_number">
                    <i className="fa-sharp fa-solid fa-user"></i>
                    <p>{project.totalVotes}</p>
                  </div>
                </div>
                <b>{project.subject}</b>
                <p>{project.text.length > 120 ? `${project.text.substring(0, 120)}...` : project.text}</p>
              </div>
              <div className="execute_card_footer card-footer">
                <button
                  data-toggle="modal"
                  data-target="target-model"
                  onClick={() =>
                    showModal(
                      project.project_name,
                      project.community_address,
                      project.totalFunds,
                      project.totalVotes,
                      project.confirmedBalance,
                      project.subject,
                      project.text
                    )
                  }
                  type="button"
                  className="btn-light prev_btn btn"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </span>
      );
    });
  return (
    <div className="my-5">
      <p className="eren">eren</p>
      <div className="container prev_cont my-5">
        <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-4">{listItems}</div>
        {show && (
          <div id="target-modal" className="modal" ref={modalRef}>
            <div className="modal-dialog modal-dialog-scrollable modal-fullscreen-sm-down">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">{tempData[0]}</h4>
                  <button type="button" className="btn-close" onClick={hideModal}></button>
                </div>
                <div className="modal-body">
                  <p>
                    Community Address:
                    <a
                      className="a_tag_modal"
                      href={`https://mumbai.polygonscan.com/address/${tempData[1]}`}
                      target="blank"
                    >
                      <span className="bold">{`  ${sliceAddress(tempData[1])}`}</span>
                    </a>
                  </p>
                  <p>
                    Subject: <span className="bold">{tempData[5]}</span>
                  </p>
                  <p>Explanation: </p>
                  <p>
                    <span className="bold">{tempData[6]}</span>
                  </p>
                  <div className="execute_icons text-center">
                    <div>
                      <i className="fa-solid fa-coins"></i>
                      <p>{tempData[2]} MATIC</p>
                    </div>
                    <div className="text-success">
                      <i className="fa-solid fa-circle-dollar-to-slot"></i>
                      <p>{tempData[4]} MATIC</p>
                    </div>
                    <div>
                      <i className="fa-sharp fa-solid fa-user"></i>
                      <p>{tempData[3]}</p>
                    </div>
                  </div>
                  <div className="execute_modal_footer modal-footer"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviousProjects;
