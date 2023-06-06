import React, { useEffect, useState } from "react";
import "./Home.css";
import { Contract } from "ethers";
import { DAO_CONTRACT_ADDRESS, DAO_ABI } from "../../constants";

const Home = ({ getProviderOrSigner }) => {
  const [requestedContractAddress, setRequestedContractAddress] = useState("");
  const [projectsCount, setProjectsCount] = useState(0);
  const [totalFunds, setTotalFunds] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);

  const onSubmitRequested = async (e) => {
    e.preventDefault();
    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, signer);
      const tx = await contract.requestForMultiSignature(requestedContractAddress);
      await tx.wait();
      alert("Requested successfully. Wait for our approve.");
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  };

  useEffect(() => {
    const getProps = async () => {
      try {
        const provider = await getProviderOrSigner();
        const contract = new Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, provider);
        const fundedAmount = await contract.allStagesFundAmount();
        const projectsCount = await contract.allStagesProjectCount();
        const votesCount = await contract.allStagesVoteCount();
        setProjectsCount(projectsCount.toString());
        setTotalFunds(fundedAmount.toString() / 10 ** 18);
        setTotalVotes(votesCount.toString());
      } catch (err) {
        console.log(err);
      }
    };
    getProps();
  }, [getProviderOrSigner]);

  return (
    <div className="body">
      <div className="home__header header ps-3">
        <h1>JOIN US!</h1>
        <div className="ps-5">
          <h3>Create your community,</h3>
          <h3>get the opportunity to</h3>
          <h3>find funding for your projects!</h3>
          <div className="btn home__btn-light btn-light mt-5" data-bs-toggle="offcanvas" data-bs-target="#myOffcanvas">
            JOIN US
          </div>

          <div className="offcanvas offcanvas-bottom" id="myOffcanvas" data-bs-backdrop="false">
            <div className="offcanvas-header">
              <h2 className="offcanvas-title">CREATE YOUR COMMUNITY</h2>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
            </div>
            <div className="offcanvas-body d-flex">
              <div className="col-6">
                <h5>Create your community, find fund!</h5>
                <form onSubmit={onSubmitRequested}>
                  <div className="form-label">
                    <label>Contract Address:</label>
                    <div className="d-flex">
                      <input
                        value={requestedContractAddress}
                        onChange={(e) => setRequestedContractAddress(e.target.value)}
                        type="text"
                        name="name"
                        id="name"
                        className="form-control w-50 me-3"
                        placeholder="contract address"
                      />
                      <button type="submit" className="btn join-btn">
                        Join Us
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-6 list-scroll">
                <ul>
                  <li>
                    At least 5 members should be in multisignature wallet. We should reach them via getOwners()
                    function.
                  </li>
                  <li>There should not be any owner.</li>
                  <li>All members should do their KYCs.</li>
                  <li>
                    There should be our DAO's contract address in constructor, and we should reach it via
                    getDaoContractAddress() function.
                  </li>
                  <li>There should be isOwner() function for control users. </li>
                  <li>Must have fallback and receive functions.</li>
                  <li>You can directly take the contract from our github.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container text-centers home__header_items">
        <div className="row">
          <div className=" home__header_item col text-center">
            <i className="fa-brands fa-hive fa-2xl"></i>
            <h5 className="mt-5 fw-bold">Blockchain Technology</h5>
            <p>Transparent and secure transactions with blockchain infrastructure</p>
          </div>
          <div className=" home__header_item col text-center">
            <i className="fa-solid fa-magnifying-glass-dollar fa-2xl"></i>
            <h5 className="mt-5 fw-bold">Fund & Raise Funds</h5>
            <p>Create your project and find funds or support the created projects by funding</p>
          </div>
          <div className=" home__header_item col text-center">
            <i className="fa-solid fa-scale-balanced fa-2xl"></i>
            <h5 className="mt-5 fw-bold">Fair Distribution</h5>
            <p>
              The distribution is calculated based on donation amounts, vote counts,and other predetermined factors to
              ensure fair allocation
            </p>
          </div>
        </div>
      </div>
      <div className="container home__card card my-3 ">
        <div className="row row-image">
          <div className="col-6 pe-0">
            <img src="./bitcoinkup.png" alt="" />
          </div>
          <div className="col-6 pe-0">
            <h1 className="home__card_text">WE BRING PROJECTS TOGETHER WITH FUNDERS!</h1>
          </div>
        </div>
        <div className="card-body text-centers">
          <div className="row totals">
            <div className="col text-center">
              <div>
                <i className="fa-solid fa-person-chalkboard fa-2xl"></i>
                <h5 className="mt-5 fw-bold">PROJECTS COUNT</h5>
              </div>
              <div>
                <h1>{projectsCount}</h1>
              </div>
            </div>
            <div className="col text-center">
              <div>
                <div>
                  <i className="fa-solid fa-hand-holding-dollar fa-2xl"></i>
                  <h5 className="mt-5 fw-bold">TOTAL FUNDS</h5>
                </div>
                <div>
                  <h1>{totalFunds} MATIC</h1>
                </div>
              </div>
            </div>
            <div className="col text-center">
              <div>
                <i className="fa-solid fa-hand-holding-heart fa-2xl"></i>
                <h5 className="mt-5 fw-bold">TOTAL VOTES</h5>
              </div>
              <div>
                <h1>{totalVotes}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5 home__about">
        <h1 className="fw-bold text-center">ABOUT FUNDWAVE</h1>
        <div className="home__card card">
          <div className="row">
            <div className="col-6 home__about_text about_text">
              <p>
                Fundwave is a blockchain application created to connect communities and entrepreneurs seeking funding
                for their project with funders. Thanks to Multisign wallets and contracts, the signing authority is
                entirely in the community that will create the project. With the created cryptographic infrastructure,
                digital asset transfers are carried out in a safe and transparent way.
              </p>
            </div>
            <div className="col-6">
              <img src="./7.png" alt="" />
            </div>
          </div>
        </div>
        <div className="home__card card">
          <div className="row">
            <div className="col-6">
              <img src="./8.png" alt="" />
            </div>
            <div className="col-6 about_text">
              <p>
                There are three separate processes: project creation, funding and execution. During the project creation
                process, communities and entrepreneurs create projects with their contract addresses, including the
                wallet addresses of the team members. The projects created are shared with the funders when the funding
                process begins. During this process, fund owners can donate any amount of funds they want to any project
                they want. Each fund donation counts as one vote. When the funding process is completed, it moves to the
                execute phase. Fund donations received during the fund process completed at this stage are distributed
                to the project owners fairly in proportion to the votes received by the projects and shared through the
                application.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5 home__about">
        <h1 className="fw-bold text-center">ROADMAP</h1>
      </div>
      <img src="./2.png" alt="" />
    </div>
  );
};

export default Home;
