import Link from "next/link";
import styles from "../styles/Navbar.module.css";

export function Navbar() {
  return (
    <nav className={`${styles.navbar} navbar navbar-expand navbar-light bg-light fixed-top`}>
      <div className="container">
        <h2>FundWave</h2>
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
          <li className="nav-item pe-5 dropdown">
            <Link to="/projects" className="nav-link dropdown-toggle">
              Project
            </Link>
            <ul className="dropdown-menu">
              <li>
                <div className="d-flex">
                  <i className="fa-regular fa-hourglass-half pt-2"></i>
                  <Link to="/projects" className="dropdown-item">
                    Ongoing Projects
                  </Link>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <i className="fa-solid fa-hourglass-end pt-2"></i>
                  <Link to="/projects" className="dropdown-item">
                    Previous Projects
                  </Link>
                </div>
              </li>
            </ul>
          </li>
        </ul>
        <button className={`${styles.btn} btn`}>Connect</button>
      </div>
    </nav>
  );
}
