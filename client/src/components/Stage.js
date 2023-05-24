import styles from "../styles/Stage.module.css";
import { CountdownTimer } from "./CountdownTimer";

export function Stage({ stage }) {
  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000; // 3 DAYS
  const NOW_IN_MS = new Date().getTime();
  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

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
        <CountdownTimer targetDate={dateTimeAfterThreeDays} />
      </div>
    </>
  );
}
