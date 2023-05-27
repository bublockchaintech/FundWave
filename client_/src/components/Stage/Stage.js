import CountdownTimer from "../Countdown/CountdownTimer";
import "./Stage.css";

const Stage = ({ stage, lastUpdate }) => {
  if (stage === "CREATE_PROJECT") {
    const FIVE_DAYS_IN_MS = 5 * 24 * 60 * 60 * 1000; // 3 DAYS
    const updateInMS = lastUpdate * 1000;
  } else if (stage === "FUND_PROJECT") {
  } else if (stage === "EXECUTE_PROJECT") {
  }

  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000; // 3 DAYS
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = lastUpdate + NOW_IN_MS;

  return (
    <>
      <div className="container mb-2">
        <div className="stage_dot">
          {stage === "CREATE_PROJECT" && (
            <>
              <h4 className="active_stage">CREATE PROJECT</h4>
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
              <h4 className="active_stage">FUND PROJECT</h4>
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
              <h4 className="active_stage">EXECUTE PROJECT</h4>
            </>
          )}
        </div>
      </div>
      <div className="last_day">
        <CountdownTimer targetDate={dateTimeAfterThreeDays} />
      </div>
    </>
  );
};

export default Stage;
