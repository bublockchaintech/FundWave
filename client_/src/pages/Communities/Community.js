import React from "react";
import "./Community.css";
import { useParams, useLocation } from "react-router-dom";

const Community = () => {
  const { contractAddress } = useParams();
  const { state } = useLocation();
  let community;

  if (state) {
    community = {
      community_address: state.community_address,
      is_approved: state.is_approved,
      number_of_projects: state.number_of_projects,
      owners: state.owners,
      text: state.text,
    };
  } else {
    console.log(contractAddress);
  }

  return (
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
                <h1 className="card-title">{community.community_address}</h1>
              </div>
              <form>
                <div className="form-label">
                  <label for="text">Approved</label>
                  {community.is_approved && <i className={`fa-sharp fa-solid fa-circle-check fa-xl ms-2`}></i>}
                  {!community.is_approved && <i className={`fa-sharp fa-solid fa-circle-xmark fa-xl ms-2`}></i>}
                </div>
              </form>
              <div className="comm_info">
                <h5>Number of Projects:</h5>
                <p>{community.number_of_projects}</p>
              </div>
            </div>
            <div className="col-4">
              <div className={`card-body`}>
                <p className="comm_info">
                  <b>Team Members:</b>
                </p>
                <div className="comm_scroll">
                  {community.owners.map((owner) => {
                    return <p key={owner}>{owner}</p>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="comm_card_single card pt-3">
          <div className="row">
            <div className="col-8">
              <h3 className="card-title">01</h3>
              <h3 className="card-title">Project Name</h3>
              <div className="comm_info">
                <h5>Subject:</h5>
                <p>Lorem ipsum</p>
              </div>
              <div className="comm_info">
                <h5>Project Details:</h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus impedit doloribus minima nisi dolor
                  voluptatem numquam explicabo cupiditate velit reiciendis.
                </p>
              </div>
            </div>
            <div className="col-4">
              <div>
                <i className="fa-solid fa-coins"></i>
                <p>231.468</p>
              </div>
              <div>
                <i className="fa-sharp fa-solid fa-user"></i>
                <p>789.236</p>
              </div>
            </div>
          </div>
        </div>
        <div className="comm_card_single card pt-3">
          <div className="row">
            <div className="col-8">
              <h3 className="card-title">01</h3>
              <h3 className="card-title">Project Name</h3>
              <div className="comm_info">
                <h5>Subject:</h5>
                <p>Lorem ipsum</p>
              </div>
              <div className="comm_info">
                <h5>Project Details:</h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus impedit doloribus minima nisi dolor
                  voluptatem numquam explicabo cupiditate velit reiciendis.
                </p>
              </div>
            </div>
            <div className="col-4">
              <div>
                <i className="fa-solid fa-coins"></i>
                <p>231.468</p>
              </div>
              <div>
                <i className="fa-sharp fa-solid fa-user"></i>
                <p>789.236</p>
              </div>
            </div>
          </div>
        </div>
        <div className="comm_card_single card pt-3">
          <div className="row">
            <div className="col-8">
              <h3 className="card-title">01</h3>
              <h3 className="card-title">Project Name</h3>
              <div className="comm_info">
                <h5>Subject:</h5>
                <p>Lorem ipsum</p>
              </div>
              <div className="comm_info">
                <h5>Project Details:</h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus impedit doloribus minima nisi dolor
                  voluptatem numquam explicabo cupiditate velit reiciendis.
                </p>
              </div>
            </div>
            <div className="col-4">
              <div>
                <i className="fa-solid fa-coins"></i>
                <p>231.468</p>
              </div>
              <div>
                <i className="fa-sharp fa-solid fa-user"></i>
                <p>789.236</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Community;
