import Link from "next/link";
import styles from "../styles/ExecuteProject.module.css";
import { Stage } from "./Stage";
import { Modal } from "bootstrap";
import { useRef } from "react";

export function ExecuteProject() {
  const projects = [
    {
      project_name: "PROJECT NAME",
      community_address: "0x343...2321",
      totalFunds: 342.123,
      totalVotes: 1.123,
      subject: "Subject",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repudiandae reprehenderit praesentium possimus. Quis consequatur pariatur fuga blanditiis voluptatibus eaque?",
    },
    {
      project_name: "PROJECT NAME",
      community_address: "0x343...2321",
      totalFunds: 342.123,
      totalVotes: 1.123,
      subject: "Subject",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repudiandae reprehenderit praesentium possimus. Quis consequatur pariatur fuga blanditiis voluptatibus eaque?",
    },
    {
      project_name: "PROJECT NAME",
      community_address: "0x343...2321",
      totalFunds: 342.123,
      totalVotes: 1.123,
      subject: "Subject",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repudiandae reprehenderit praesentium possimus. Quis consequatur pariatur fuga blanditiis voluptatibus eaque?",
    },
    {
      project_name: "PROJECT NAME",
      community_address: "0x343...2321",
      totalFunds: 342.123,
      totalVotes: 1.123,
      subject: "Subject",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repudiandae reprehenderit praesentium possimus. Quis consequatur pariatur fuga blanditiis voluptatibus eaque?",
    },
    {
      project_name: "PROJECT NAME",
      community_address: "0x343...2321",
      totalFunds: 342.123,
      totalVotes: 1.123,
      subject: "Subject",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repudiandae reprehenderit praesentium possimus. Quis consequatur pariatur fuga blanditiis voluptatibus eaque?",
    },
  ];

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
          <div className={`${styles.card} card mb-3 shadow`}>
            <div className="card-body">
              <h5 className="card-title">{project.project_name}</h5>
              <div className={`${styles.info}`}>
                <p>{project.community_address}</p>
                <div className={`${styles.number}`}>
                    <i className="fa-solid fa-coins"></i>
                  <p>{project.totalFunds}</p>
                </div>
                <div className={`${styles.number}`}>
                    <i
                      className="fa-sharp fa-solid fa-user"></i>
                  <p>{project.totalVotes}</p>
                </div>
              </div>
              <h5>{project.subject}</h5>
              <p>{project.text}</p>
            </div>
            <div className={`${styles.card_footer} card-footer`}>
              <button onClick={showModal}
                type="button"
                className={`${styles.fund_btn} btn`}>
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
                <button
                  type="button"
                  className="btn-close"
                  onClick={hideModal}
                ></button>
              </div>
              <div className={`modal-body`}>
                <p>Community Address: {project.community_address}</p>
                <p>Subject: {project.subject}</p>
                <p>Explanation: </p>
                <p>{project.text}</p>
                <div className={`${styles.icons}`}>
                  <div>
                      <i className="fa-solid fa-coins"></i>
                    <p>{project.totalFunds}</p>
                  </div>
                  <div>
                      <i className="fa-sharp fa-solid fa-user"></i>
                    <p>{project.totalVotes}</p>
                  </div>
                </div>
                <div className={`${styles.modal_footer} modal-footer`}></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      <Stage stage={"EXECUTE_PROJECT"} />
      <div className="container my-4">
        <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-4">
          {listItems}
        </div>
      </div>
    </>
  );
}
