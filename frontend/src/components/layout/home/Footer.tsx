import { useNavigate } from "react-router-dom";
import styles from "./Footer.module.css";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinInIcon,
  TwitterIcon,
} from "../../../constants/icons";

const Footer = () => {
  const navigate = useNavigate();
  const handleSectionLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    sectionId: string
  ) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/"); // Redirect to the homepage
    }
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        const offset = section.offsetTop - 100; // Adjust for 10px above
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    }, 50); // Slight delay to ensure DOM rendering
  };
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row d-flex justify-content-between">
          <div className="col-md d-flex flex-column align-items-center py-4">
            <h2>Stated</h2>
            <div className="d-flex gap-3 pt-3 social-media">
              <a className={styles.icons} href="#">
                <InstagramIcon />
              </a>
              <a className={styles.icons} href="#">
                <FacebookIcon />
              </a>
              <a className={styles.icons} href="#">
                <TwitterIcon />
              </a>
              <a className={styles.icons} href="#">
                <LinkedinInIcon />
              </a>
            </div>
          </div>
          <div className="col-md d-flex justify-content-center py-4">
            <nav className={styles.nav}>
              <ul className="list-unstyled d-flex gap-3 flex-column">
                <li>
                  <a className="text-decoration-none" href="/#">
                    Home
                  </a>
                </li>
                <li>
                  <a className="text-decoration-none" href="/allproperties">
                    Properties
                  </a>
                </li>
                <li>
                  <a
                    className="text-decoration-none"
                    href="/#"
                    onClick={(e) => handleSectionLinkClick(e, "agentSection")}
                    data-bs-dismiss="offcanvas"
                  >
                    Agents
                  </a>
                </li>
                <li>
                  <a
                    className="text-decoration-none"
                    href="/#"
                    onClick={(e) => handleSectionLinkClick(e, "contactSection")}
                    data-bs-dismiss="offcanvas"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-md d-flex justify-content-center py-4">
            <address>
              <p>123 Real Estate St.</p>
              <p>Los Angeles, California, 1000</p>
              <p>info@realestate.com</p>
              <p>+1 234 567 890</p>
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
