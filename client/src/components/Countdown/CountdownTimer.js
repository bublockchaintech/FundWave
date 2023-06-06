import { useCountdown } from "../../hooks/useCountdown";
import "./Countdown.css";
import { Contract } from "ethers";
import { DAO_CONTRACT_ADDRESS, DAO_ABI } from "../../constants";
import { useEffect, useState } from "react";

const CountdownTimer = ({ targetDate, stageState, getProviderOrSigner }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice stageState={stageState} getProviderOrSigner={getProviderOrSigner} />;
  } else {
    return <ShowCounter days={days} hours={hours} minutes={minutes} seconds={seconds} />;
  }
};

const ExpiredNotice = ({ getProviderOrSigner }) => {
  const [_stageState, _setStageState] = useState(0);

  const stageSection = async () => {
    try {
      const provider = await getProviderOrSigner();
      const contract = new Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, provider);
      const _stageCount = await contract.stageCount();
      const stage = await contract.stages(_stageCount);
      _setStageState(stage.stageState);
    } catch (err) {
      console.error(err);
    }
  };

  const initializeStage = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, signer);
      const tx = await contract.initializeStage();
      await tx.wait();
      alert("Stage started..");
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };

  const setStageToCreation = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, signer);
      const tx = await contract.setStageToCreation();
      await tx.wait();
      alert("Creation stage started..");
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };

  const setStageToFunding = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, signer);
      const tx = await contract.setStageToFunding();
      await tx.wait();
      alert("Funding stage started..");
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };

  const setStageToExecution = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, signer);
      const tx = await contract.setStageToExecution();
      await tx.wait();
      alert("Execution stage started..");
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };

  const calculateFormula = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, signer);
      const tx = await contract.calculateFormula();
      await tx.wait();
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };

  const distributeFunds = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, signer);
      const tx = await contract.distributeFunds();
      await tx.wait();
      alert("Funds are distributed");
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };

  const changeStageState = async () => {
    try {
      switch (_stageState) {
        case 0:
          setStageToCreation();
          break;
        case 1:
          setStageToFunding();
          break;
        case 2:
          setStageToExecution();
          break;
        case 3:
          calculateFormula();
          distributeFunds();
          break;
        case 4:
          initializeStage();
          break;
        default:
          break;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    stageSection();
  }, []);

  return (
    <div className="expired_notice">
      <button className="stage-button" onClick={changeStageState}>
        {_stageState === 0 && "Set stage to creation!"}
        {_stageState === 1 && "Set stage to funding!"}
        {_stageState === 2 && "Set stage to execution!"}
        {_stageState === 3 && "Distribute funds!"}
        {_stageState === 4 && "Initialize stage!"}
      </button>
    </div>
  );
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
