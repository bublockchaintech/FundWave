import React, { useRef } from "react";
import { Stage } from "../../components";
import { Modal } from "bootstrap";
import "./ExecuteProject.css";

const ExecuteProject = ({ projects, lastUpdate }) => {
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
          <div className={`color${i % 6} execute_card card mb-3 shadow`}>
            <div className="card-body">
              <h5 className="card-title">{project.project_name}</h5>
              <div className="execute_info">
                <p>{project.community_address}</p>
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
              <p>{project.text}</p>
            </div>
            <div className="execute_card_footer card-footer">
              <button onClick={showModal} type="button" className="execute_btn btn">
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
                <p>Community Address: {project.community_address}</p>
                <p>Subject: {project.subject}</p>
                <p>Explanation: </p>
                <p>{project.text}</p>
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
      </>
    );
  });

  return (
    <>
      <Stage stage={"EXECUTE_PROJECT"} lastUpdate={lastUpdate} />
      <div className="container my-4">
        <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-4">{listItems}</div>
      </div>
    </>
  );
};

export default ExecuteProject;
