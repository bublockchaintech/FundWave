import styles from "@/styles/Communities.module.css";

import Head from "next/head";
import Link from "next/link";

export default function () {
  const communities = [
    {
      community_address: "0x343...2321",
      is_approved: false,
      total_votes: 1.123,
      number_of_projects: 5,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repudiandae reprehenderit praesentium possimus. Quis consequatur pariatur fuga blanditiis voluptatibus eaque?",
    },
    {
      community_address: "0x343...2321",
      is_approved: true,
      total_votes: 1.123,
      number_of_projects: 5,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repudiandae reprehenderit praesentium possimus. Quis consequatur pariatur fuga blanditiis voluptatibus eaque?",
    },
    {
      community_address: "0x343...2321",
      is_approved: true,
      total_votes: 1.123,
      number_of_projects: 5,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repudiandae reprehenderit praesentium possimus. Quis consequatur pariatur fuga blanditiis voluptatibus eaque?",
    },
    {
      community_address: "0x343...2321",
      is_approved: true,
      total_votes: 1.123,
      number_of_projects: 5,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repudiandae reprehenderit praesentium possimus. Quis consequatur pariatur fuga blanditiis voluptatibus eaque?",
    },
    {
      community_address: "0x343...2321",
      is_approved: true,
      total_votes: 1.123,
      number_of_projects: 5,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repudiandae reprehenderit praesentium possimus. Quis consequatur pariatur fuga blanditiis voluptatibus eaque?",
    },
  ];

  const listItems = communities.map((community, i) => {
    return (
      <>
        <div class="col">
          <div className={`${styles.card_comm} card mb-3 shadow`}>
            <div className="card-body">
              <div className={`${styles.info}`}>
                <p>Community Contract Address:</p>
                <p>{community.community_address}</p>
              </div>
              <div className={`${styles.info}`}>
                <p>Is Approved: </p>
                <p>
                  {community.is_approved && <i className={`fa-sharp fa-solid fa-circle-check fa-xl ms-2`}></i>}
                  {!community.is_approved && <i className={`fa-sharp fa-solid fa-circle-xmark fa-xl ms-2`}></i>}
                </p>
              </div>
              <div className={`${styles.info}`}>
                <p>Number of Projects:</p>
              </div>
              <div className={`${styles.card_footer} card-footer`}>
                <Link className={`${styles.btn} btn`} href={`/communities/${community.community_address}`}>
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
    <>
      <Head></Head>
      <div className="container my-4">
        <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-4">{listItems}</div>
      </div>
    </>
  );
}
