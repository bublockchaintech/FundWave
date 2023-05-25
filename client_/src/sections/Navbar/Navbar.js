import React from "react";
import styles from "./Navbar.css";
import { Link } from "react-router-dom/";

const Navbar = () => {
  return (
    <nav className={`${styles.navbar} navbar navbar-expand navbar-light bg-light fixed-top`}>
      <div className="container">
        <h2>FundWave</h2>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item pe-5">
            <Link href="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item pe-5">
            <Link href="/projects" className="nav-link">
              Project
            </Link>
          </li>
          <li className="nav-item pe-5">
            <Link href="/communities" className="nav-link">
              Community
            </Link>
          </li>
        </ul>
        <button className={`${styles.btn} btn`}>Connect</button>
      </div>
    </nav>
  );
};

export default Navbar;
