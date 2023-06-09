import { useCountdown } from "../../hooks/useCountdown";
import "./Countdown.css";

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return <ShowCounter days={days} hours={hours} minutes={minutes} seconds={seconds} />;
  }
};

const ExpiredNotice = () => {
  return <div className="expired_notice">Refresh the page!</div>;
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="show_counter">
      <a href="#/" className="countdown_link">
        <DateTimeDisplay value={days} type={"Days"} />
        <p>:</p>
        <DateTimeDisplay value={hours} type={"Hours"} />
        <p>:</p>
        <DateTimeDisplay value={minutes} type={"Mins"} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={"Seconds"} />
      </a>
    </div>
  );
};

const DateTimeDisplay = ({ value, type }) => {
  return (
    <div className="countdown">
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
};

export default CountdownTimer;
