import Link from "next/link";
import styles from "../styles/Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.social}>
        <Link href="https://www.instagram.com/bublockchaintechclub/">
          <i className="fab fa-instagram fa-2x"></i>
        </Link>
        <Link href="https://twitter.com/BU_blockchain">
          <i className="fab fa-twitter fa-2x"></i>
        </Link>
        <Link href="">
          <i className="fab fa-youtube fa-2x"></i>
        </Link>
        <Link href="https://www.linkedin.com/company/blockchaintechclub/mycompany/">
          <i className="fab fa-linkedin fa-2x"></i>
        </Link>
      </div>
      <div className="container text-center">
        <span>All Rights Reserved. @2025</span>
      </div>
    </footer>
  );
}
