import Link from "next/link";
import styles from "../styles/FundProject.module.css";
import { Stage } from "./Stage";

export function FundProject() {
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

  const listItems = projects.map((project) => {
    return (
      <div className="col">
        <div className={`${styles.card} card mb-3 shadow`}>
          <div className="card-body" data-bs-toggle="modal" data-bs-target="#myModal" type="button">
            <h5 className="card-title">{project.project_name}</h5>
            <div className={`${styles.info}`}>
              <p>{project.community_address}</p>
              <div className={`${styles.number}`}>
                <i className="fa-solid fa-coins me-2"></i>
                <p>{project.totalFunds}</p>
              </div>
              <div className={`${styles.number}`}>
                <i className="fa-sharp fa-solid fa-user me-2"></i>
                <p>{project.totalVotes}</p>
              </div>
            </div>
            <h5>{project.subject}</h5>
            <p>{project.text} </p>
          </div>
          <div className={`card-footer ${styles.card_footer}`}>
            <div className="form-label">
              <input type="number" name="number" id="number" className="form-control" />
            </div>
            <button className={`${styles.fund_btn} btn`}>FUND</button>
          </div>
        </div>
      </div>
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
}
