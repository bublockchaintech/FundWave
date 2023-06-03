import React, { useEffect, useState } from "react";
import styles from "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import NavDropdown from "react-bootstrap/NavDropdown";
import { sliceAddress } from "../../utils/sliceAddress";

const Navbar = ({
  walletConnected,
  setWalletConnected,
  getProviderOrSigner,
  address,
  setAddress,
  web3ModalRef,
  setSelectedStage,
}) => {
  const { pathname } = useLocation();
  const [display, setDisplay] = useState(false);
  const [_stage, _setStage] = useState(0);

  const connectWallet = async () => {
    try {
      await web3ModalRef.current.connect();
      const signer = await getProviderOrSigner(true);
      const _address = await signer.getAddress();
      setAddress(_address);
      setWalletConnected(true);
    } catch (error) {
      console.log(error);
    }
  };

  const setStage = async () => {
    setSelectedStage(_stage);
    _setStage("");
  };

  useEffect(() => {
    if (pathname === "/previous-projects") {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  }, [pathname]);

  return (
    <nav className={`${styles.navbar} navbar navbar-expand navbar-light bg-light fixed-top`}>
      <div className="container">
        <h2>FundWave</h2>
        {display && (
          <div className="input-group mx-5 rounded">
            <input
              type="search"
              className="form-control"
              placeholder="Search stage"
              aria-label="Search"
              aria-describedby="search-addon"
              value={_stage}
              onChange={(e) => _setStage(e.target.value)}
            />
            <span onClick={setStage} className="cursor input-group-text border-0" id="search-addon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
          </div>
        )}
        <ul className="navbar-nav ms-auto">
          <li className="nav-item pe-5">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item pe-5">
            <Link to="/communities" className="nav-link">
              Community
            </Link>
          </li>
          <NavDropdown title="Project" to="/projects" className="nav-item pe-5">
            <Dropdown.Item>
              <div className="d-flex">
                <i className="fa-regular fa-hourglass-half pt-2"></i>
                <Link to="/projects" className="dropdown-item">
                  Ongoing Projects
                </Link>
              </div>
            </Dropdown.Item>
            <Dropdown.Item>
              <div className="d-flex">
                <i className="fa-solid fa-hourglass-end pt-2"></i>
                <Link to="/previous-projects" className="dropdown-item">
                  Previous Projects
                </Link>
              </div>
            </Dropdown.Item>
          </NavDropdown>
        </ul>
        <button onClick={connectWallet} className={`${styles.nav_btn} btn`}></button>

        {!walletConnected ? (
          <button onClick={connectWallet} className={`${styles.nav_btn} btn`}>
            Connect
          </button>
        ) : (
          <button className={`${styles.nav_btn} btn`}>{sliceAddress(address)}</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
