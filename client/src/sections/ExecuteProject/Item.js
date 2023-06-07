import React, { useRef } from "react";
import { Modal } from "bootstrap";
import "./ExecuteProject.css";
import { sliceAddress } from "../../utils/sliceAddress";

const Item = ({ project }) => {
  const modalRef = useRef();

  const showModal = () => {
    const modalEl = modalRef.current;
    const bsModal = new Modal(modalEl, {
      keyboard: true,
    });
    bsModal.show();
  };

  const hideModal = () => {
    const modalEl = modalRef.current;
    const bsModal = Modal.getInstance(modalEl);
    bsModal.hide();
  };

  return (
    <>
      <div className="col">
        <div className={`color${project.id % 6} execute_card card mb-3 shadow`}>
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
                <p>{project.totalFunds.toFixed(3)} MATIC</p>
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
              <div className="execute_icons text-center">
                <div>
                  <i className="fa-solid fa-coins"></i>
                  <p>{project.totalFunds.toFixed(3)} MATIC</p>
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
};

export default Item;
