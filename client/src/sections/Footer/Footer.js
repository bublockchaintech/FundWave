import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="social">
        <a href="https://www.instagram.com/bublockchaintechclub/">
          <i className="fab fa-instagram fa-2x" />
        </a>
        <a href="https://twitter.com/BU_blockchain">
          <i className="fab fa-twitter fa-2x" />
        </a>
        <a href="#/">
          <i className="fab fa-youtube fa-2x" />
        </a>
        <a href="https://www.linkedin.com/company/blockchaintechclub/mycompany/">
          <i className="fab fa-linkedin fa-2x" />
        </a>
      </div>
      <div className="container text-center">
        <span>All Rights Reserved. @2025</span>
      </div>
    </footer>
  );
};

export default Footer;
