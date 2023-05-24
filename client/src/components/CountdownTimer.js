import { useCountdown } from "@/hooks/useCountdown";
import styles from "../styles/Countdown.module.css";

export function CountdownTimer({ targetDate }) {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return <ShowCounter days={days} hours={hours} minutes={minutes} seconds={seconds} />;
  }
}

function ExpiredNotice() {
  return (
    <div className={styles.expired_notice}>
      <span>Stage will change soon!</span>
    </div>
  );
}

function ShowCounter({ days, hours, minutes, seconds }) {
  return (
    <div className={styles.show_counter}>
      <a className={styles.countdown_link}>
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
}

function DateTimeDisplay({ value, type }) {
  return (
    <div className={styles.countdown}>
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
}
