import React, { useRef } from "react";
import { Stage } from "../../components";
import { Modal } from "bootstrap";
import "./FundProject.css";

const FundProject = ({ projects }) => {
  const modalRef = useRef();

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
      <>
        <div key={i} className="col">
          <div className="fund_card card mb-3 shadow">
            <div className="card-body" onClick={showModal} type="button">
              <h5 className="card-title">{project.project_name}</h5>
              <div className="fund_info">
                <p>{project.community_address}</p>
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
              <p>{project.text} </p>
            </div>
            <div className="card-footer fund_card_footer">
              <div className="form-label">
                <input type="number" name="number" id="number" className="form-control" />
              </div>
              <button className="fund_btn btn">FUND</button>
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
                <p>Community Address: {project.community_address}</p>
                <p>Subject: {project.subject}</p>
                <p>Explanation: </p>
                <p>{project.text}</p>
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
                    <input type="number" name="number" id="fund_number" className="form-control modal-input" />
                  </div>
                  <button className="btn fund_modal_btn">FUND</button>
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
      <Stage stage={"FUND_PROJECT"} />
      <div className="container my-4">
        <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-4">{listItems}</div>
      </div>
    </>
  );
};

export default FundProject;
