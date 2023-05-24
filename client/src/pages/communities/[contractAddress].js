import styles from "@/styles/Communities.module.css";
import Head from "next/head";
import { useRouter } from "next/router";

export default function (props) {
  const router = useRouter();
  console.log(router.query);

  const community = {
    community_address: "0x343...2321",
    is_approved: false,
    total_votes: 1.123,
    number_of_projects: 5,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repudiandae reprehenderit praesentium possimus. Quis consequatur pariatur fuga blanditiis voluptatibus eaque?",
  };

  return (
    <>
      <Head>
        <title>Fund Wave | Communities</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
      <img
        className={`${styles.image}`}
        src="https://img.freepik.com/free-vector/radiating-light-movement-background_52683-14635.jpg?size=626&ext=jpg&ga=GA1.1.1725162033.1684514575&semt=sph"
        alt=""
      ></img>
      <div className="container">
        <div className={`${styles.card_bg} ${styles.card} card px-4 pt-4`}>
          <div className="row">
            <div className="col-8">
              <div className={`${styles.info}`}>
                <h1 className="card-title">{community.community_address}</h1>
              </div>
              <form>
                <div className="form-label">
                  <label for="text">Approved</label>
                  {community.is_approved && <i className={`fa-sharp fa-solid fa-circle-check fa-xl ms-2`}></i>}
                  {!community.is_approved && <i className={`fa-sharp fa-solid fa-circle-xmark fa-xl ms-2`}></i>}
                </div>
              </form>
              <div className={`${styles.info}`}>
                <h5>Number of Projects:</h5>
                <p>{community.number_of_projects}</p>
              </div>
            </div>
            <div className="col-4">
              <div className="card-body">
                <p className={`${styles.info}`}>Team Members:</p>
                <p>0x0000000000000000000000</p>
                <p>0x0000000000000000000000</p>
                <p>0x0000000000000000000000</p>
                <p>0x0000000000000000000000</p>
                <p>0x0000000000000000000000</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.card} card pt-3`}>
          <div className="row">
            <div className="col-8">
              <h3 className="card-title">01</h3>
              <h3 className="card-title">Project Name</h3>
              <div className={`${styles.info}`}>
                <h5>Subject:</h5>
                <p>Lorem ipsum</p>
              </div>
              <div className={`${styles.info}`}>
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
        <div className={`${styles.card} card pt-3`}>
          <div className="row">
            <div className="col-8">
              <h3 className="card-title">01</h3>
              <h3 className="card-title">Project Name</h3>
              <div className={`${styles.info}`}>
                <h5>Subject:</h5>
                <p>Lorem ipsum</p>
              </div>
              <div className={`${styles.info}`}>
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
        <div className={`${styles.card} card pt-3`}>
          <div className="row">
            <div className="col-8">
              <h3 className="card-title">01</h3>
              <h3 className="card-title">Project Name</h3>
              <div className={`${styles.info}`}>
                <h5>Subject:</h5>
                <p>Lorem ipsum</p>
              </div>
              <div className={`${styles.info}`}>
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
        <div className={`${styles.card} card pt-3`}>
          <div className="row">
            <div className="col-8">
              <h3 className="card-title">01</h3>
              <h3 className="card-title">Project Name</h3>
              <div className={`${styles.info}`}>
                <h5>Subject:</h5>
                <p>Lorem ipsum</p>
              </div>
              <div className={`${styles.info}`}>
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
        <div className={`${styles.card} card pt-3`}>
          <div className="row">
            <div className="col-8">
              <h3 className="card-title">01</h3>
              <h3 className="card-title">Project Name</h3>
              <div className={`${styles.info}`}>
                <h5>Subject:</h5>
                <p>Lorem ipsum</p>
              </div>
              <div className={`${styles.info}`}>
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
        <div className={`${styles.card} card pt-3`}>
          <div className="row">
            <div className="col-8">
              <h3 className="card-title">01</h3>
              <h3 className="card-title">Project Name</h3>
              <div className={`${styles.info}`}>
                <h5>Subject:</h5>
                <p>Lorem ipsum</p>
              </div>
              <div className={`${styles.info}`}>
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
}
