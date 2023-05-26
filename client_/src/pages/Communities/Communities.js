import React from "react";
import { Link } from "react-router-dom";
import "./Community.css";

const communities = [
  {
    community_address: "0x343...2321",
    is_approved: false,
    number_of_projects: 5,
    owners: [
      "0x32748uidsjfkashdasuye72",
      "0x32748uidsjfkashdasqqw72",
      "0x32748uidsjfkashdasuls72",
      "0x32748uidsjfkashdasuye12",
      "0x32748uidsjfkashdasuye99",
      "0x32748uidsjfkashdasuye29",
      "0x32748uidsjfkashdasuye39",
      "0x32748uidsjfkashdasuye19",
    ],
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repudiandae reprehenderit praesentium possimus. Quis consequatur pariatur fuga blanditiis voluptatibus eaque?",
  },
  {
    community_address: "0x343...2321",
    is_approved: true,
    number_of_projects: 5,
    owners: [
      "0x32748uidsjfkashdasuye72",
      "0x32748uidsjfkashdasqqw72",
      "0x32748uidsjfkashdasuls72",
      "0x32748uidsjfkashdasuye12",
      "0x32748uidsjfkashdasuye99",
      "0x32748uidsjfkashdasuye29",
      "0x32748uidsjfkashdasuye39",
      "0x32748uidsjfkashdasuye19",
    ],
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repudiandae reprehenderit praesentium possimus. Quis consequatur pariatur fuga blanditiis voluptatibus eaque?",
  },
  {
    community_address: "0x343...2321",
    is_approved: true,
    number_of_projects: 5,
    owners: [
      "0x32748uidsjfkashdasuye72",
      "0x32748uidsjfkashdasqqw72",
      "0x32748uidsjfkashdasuls72",
      "0x32748uidsjfkashdasuye12",
      "0x32748uidsjfkashdasuye99",
      "0x32748uidsjfkashdasuye29",
      "0x32748uidsjfkashdasuye39",
      "0x32748uidsjfkashdasuye19",
    ],
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repudiandae reprehenderit praesentium possimus. Quis consequatur pariatur fuga blanditiis voluptatibus eaque?",
  },
  {
    community_address: "0x343...2321",
    is_approved: true,
    number_of_projects: 5,
    owners: [
      "0x32748uidsjfkashdasuye72",
      "0x32748uidsjfkashdasqqw72",
      "0x32748uidsjfkashdasuls72",
      "0x32748uidsjfkashdasuye12",
      "0x32748uidsjfkashdasuye99",
      "0x32748uidsjfkashdasuye29",
      "0x32748uidsjfkashdasuye39",
      "0x32748uidsjfkashdasuye19",
    ],
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repudiandae reprehenderit praesentium possimus. Quis consequatur pariatur fuga blanditiis voluptatibus eaque?",
  },
  {
    community_address: "0x343...2321",
    is_approved: true,
    number_of_projects: 5,
    owners: [
      "0x32748uidsjfkashdasuye72",
      "0x32748uidsjfkashdasqqw72",
      "0x32748uidsjfkashdasuls72",
      "0x32748uidsjfkashdasuye12",
      "0x32748uidsjfkashdasuye99",
      "0x32748uidsjfkashdasuye29",
      "0x32748uidsjfkashdasuye39",
      "0x32748uidsjfkashdasuye19",
    ],
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repudiandae reprehenderit praesentium possimus. Quis consequatur pariatur fuga blanditiis voluptatibus eaque?",
  },
];

const Communities = () => {
  const listItems = communities.map((community, i) => {
    return (
      <>
        <div class="col">
          <div className="comm_card card mb-3 shadow">
            <div className="card-body">
              <div className="comm_info">
                <p>Community Contract Address:</p>
                <p>{community.community_address}</p>
              </div>
              <div className="comm_info">
                <p>Is Approved: </p>
                <p>
                  {community.is_approved && <i className={`fa-sharp fa-solid fa-circle-check fa-xl ms-2`}></i>}
                  {!community.is_approved && <i className={`fa-sharp fa-solid fa-circle-xmark fa-xl ms-2`}></i>}
                </p>
              </div>
              <div className="comm_info">
                <p>Number of Projects: {community.number_of_projects}</p>
              </div>
              <div className="comm_card_footer card-footer">
                <Link
                  className="comm_btn btn"
                  to={{ pathname: `/communities/${community.community_address}`, state: { ...community } }}
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  });

  return (
    <div className="container my-4">
      <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-4">{listItems}</div>
    </div>
  );
};

export default Communities;
