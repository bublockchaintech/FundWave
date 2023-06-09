import CountdownTimer from "../Countdown/CountdownTimer";
import "./Stage.css";

const Stage = ({ stage, lastUpdate }) => {
  let dayNeedTime = 2 * 60 * 60 * 1000; // instead of 3 it will change 15
  if (stage === "CREATE_PROJECT" || stage === "FUND_PROJECT" || stage === "EXECUTE_PROJECT") {
    dayNeedTime = dayNeedTime * 2;
  }

  const updateDate = new Date(lastUpdate).getTime() * 1000;
  const dateTimeAfterThreeDays = updateDate + dayNeedTime;

  return (
    <>
      <div className="container mb-2">
        <div className="stage_dot">
          {stage === "INITIALIZE_PROJECT" && (
            <>
              <h4 className="active_stage">INITIALIZE</h4>
              <h4>
                <i className="fa-solid fa-play"></i>
              </h4>
              <h4>CREATE PROJECT</h4>
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
