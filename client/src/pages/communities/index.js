 import styles from "@/styles/Communities.module.css";

import Head from "next/head";

export default function () {
  const communities = [
    {
      community_address: "0x343...2321",
      is_approved: "Yes",
      total_votes: 1.123,
      number_of_projects: 5,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repudiandae reprehenderit praesentium possimus. Quis consequatur pariatur fuga blanditiis voluptatibus eaque?",
    },
    {
      community_address: "0x343...2321",
      is_approved: "Yes",
      total_votes: 1.123,
      number_of_projects: 5,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repudiandae reprehenderit praesentium possimus. Quis consequatur pariatur fuga blanditiis voluptatibus eaque?",
    },
    {
      community_address: "0x343...2321",
      is_approved: "Yes",
      total_votes: 1.123,
      number_of_projects: 5,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repudiandae reprehenderit praesentium possimus. Quis consequatur pariatur fuga blanditiis voluptatibus eaque?",
    },
    {
      community_address: "0x343...2321",
      is_approved: "Yes",
      total_votes: 1.123,
      number_of_projects: 5,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repudiandae reprehenderit praesentium possimus. Quis consequatur pariatur fuga blanditiis voluptatibus eaque?",
    },
    {
      community_address: "0x343...2321",
      is_approved: "Yes",
      total_votes: 1.123,
      number_of_projects: 5,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repudiandae reprehenderit praesentium possimus. Quis consequatur pariatur fuga blanditiis voluptatibus eaque?",
    },
  ];

  const listItems = communities.map((communities, i) => {
    return (
      <>
        <Head>
          <title>Font Wave | Communities</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
            integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
          />
        </Head>

        <div class="col">
          <div className={`${styles.card} card mb-3 shadow`}>
            <div className="card-body">
              <div className={`${styles.info}`}>
                <p>Community Contract Address:</p>
                <p>{communities.community_address}</p>
              </div>
              <div className={`${styles.info}`}>
                <p>Is Approved: </p>
                <p>{communities.is_approved}</p>
              </div>
              <div className={`${styles.info}`}>
                <p>Number of Projects:</p>
                <p>{communities.number_of_projects}</p>
              </div>
              <div className={`${styles.card_footer} card-footer`}>
                <button className={`${styles.btn} btn`}>Details</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      <div className="container my-4">
        <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-4">
          {listItems}
        </div>
      </div>
    </>
  );
}
