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
  };

  return (
    <>
      <Head></Head>
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
              <div className={`card-body`}>
                <p className={`${styles.info}`}>
                  <b>Team Members:</b>
                </p>
                <div className={styles.scroll}>
                  {community.owners.map((owner) => {
                    return <p key={owner}>{owner}</p>;
                  })}
                </div>
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
