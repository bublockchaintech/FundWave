import styles from "../styles/Stage.module.css";

export function Stage({ stage }) {
  console.log(stage);
  return (
    <>
      <div className="container mb-2">
        <div className={styles.stage_dot}>
          {stage === "CREATE_PROJECT" && (
            <>
              <h4 className={styles.active_stage}>CREATE PROJECT</h4>
              <h4>
                <i className="fa-solid fa-play"></i>
              </h4>
              <h4>FUND PROJECT</h4>
              <h4>
                <i className="fa-solid fa-play"></i>
              </h4>
              <h4>EXECUTE PROJECT</h4>
            </>
          )}
          {stage === "FUND_PROJECT" && (
            <>
              <h4>CREATE PROJECT</h4>
              <h4>
                <i className="fa-solid fa-play"></i>
              </h4>
              <h4 className={styles.active_stage}>FUND PROJECT</h4>
              <h4>
                <i className="fa-solid fa-play"></i>
              </h4>
              <h4>EXECUTE PROJECT</h4>
            </>
          )}
          {stage === "EXECUTE_PROJECT" && (
            <>
              <h4>CREATE PROJECT</h4>
              <h4>
                <i className="fa-solid fa-play"></i>
              </h4>
              <h4>FUND PROJECT</h4>
              <h4>
                <i className="fa-solid fa-play"></i>
              </h4>
              <h4 className={styles.active_stage}>EXECUTE PROJECT</h4>
            </>
          )}
        </div>
      </div>
      <div className={styles.last_day}>
        <h1>15:21:42:33</h1>
      </div>
    </>
  );
}
