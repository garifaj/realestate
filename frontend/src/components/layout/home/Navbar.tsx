import { useContext } from "react";
import styles from "./Header.module.css"; // Import the CSS module
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import API_BASE_URL from "../../common/utils/config";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
    navigate("/"); // Redirect to homepage after logging out
    setUser(null); // Clear user data from context
  };
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

  const handleLinkClick = () => {
    // Close the offcanvas manually using Bootstrap's method
    const offcanvasElement = document.querySelector("#offcanvasNavbar");
    const backdrop = document.querySelector(".offcanvas-backdrop");

    if (offcanvasElement && backdrop) {
      // Remove 'show' class to hide the offcanvas and the backdrop
      offcanvasElement.classList.remove("show");
      backdrop.classList.remove("show");
      // Reset any overflow styles
      document.body.style.overflow = "";
    }
  };

  return (
    <>
      <header className={styles.header}>
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <Link to={"/"} className={`nav-link ${styles.navBrand}`}>
              Stated
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={`offcanvas offcanvas-end ${styles.offcanvasCustom}`}
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
            >
              <div className="offcanvas-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li className="nav-item px-3">
                    <Link
                      className={`nav-link px-2 ${styles.navLink}`}
                      to="/"
                      onClick={() => handleLinkClick()}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item px-3">
                    <Link
                      className={`nav-link px-2 ${styles.navLink}`}
                      to="/allproperties"
                      onClick={() => handleLinkClick()}
                    >
                      Properties
                    </Link>
                  </li>
                  <li className="nav-item px-3 ">
                    <Link
                      className={`nav-link px-2 ${styles.navLink}`}
                      to="#"
                      onClick={(e) => handleSectionLinkClick(e, "agentSection")}
                      data-bs-dismiss="offcanvas"
                    >
                      Agents
                    </Link>
                  </li>
                  <li className="nav-item px-3 ">
                    <Link
                      className={`nav-link px-2 ${styles.navLink}`}
                      to="#"
                      onClick={(e) =>
                        handleSectionLinkClick(e, "contactSection")
                      }
                      data-bs-dismiss="offcanvas"
                    >
                      Contact
                    </Link>
                  </li>
                  {/* Profile Dropdown */}
                  <li className="nav-item dropdown px-3">
                    {!user ? (
                      <a
                        className={`nav-link border rounded-5 px-2 ${styles.navLink}`}
                        href="#"
                        id={`${styles.dropdown}`}
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <svg
                          width="22px"
                          height="22px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M20.75 7C20.75 7.41421 20.4142 7.75 20 7.75L4 7.75C3.58579 7.75 3.25 7.41421 3.25 7C3.25 6.58579 3.58579 6.25 4 6.25L20 6.25C20.4142 6.25 20.75 6.58579 20.75 7Z"
                              fill="#000000"
                            ></path>{" "}
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M20.75 12C20.75 12.4142 20.4142 12.75 20 12.75L4 12.75C3.58579 12.75 3.25 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25L20 11.25C20.4142 11.25 20.75 11.5858 20.75 12Z"
                              fill="#000000"
                            ></path>{" "}
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M20.75 17C20.75 17.4142 20.4142 17.75 20 17.75L4 17.75C3.58579 17.75 3.25 17.4142 3.25 17C3.25 16.5858 3.58579 16.25 4 16.25L20 16.25C20.4142 16.25 20.75 16.5858 20.75 17Z"
                              fill="#000000"
                            ></path>{" "}
                          </g>
                        </svg>
                        <img
                          src="http://localhost:5075/Photos/default.jpg"
                          alt="Profile Icon"
                          className={styles.profileIcon}
                        />
                      </a>
                    ) : (
                      <a
                        className={`nav-link border rounded-5 px-2 ${styles.navLink}`}
                        href="#"
                        id={`${styles.dropdown}`}
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <svg
                          width="22px"
                          height="22px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M20.75 7C20.75 7.41421 20.4142 7.75 20 7.75L4 7.75C3.58579 7.75 3.25 7.41421 3.25 7C3.25 6.58579 3.58579 6.25 4 6.25L20 6.25C20.4142 6.25 20.75 6.58579 20.75 7Z"
                              fill="#000000"
                            ></path>{" "}
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M20.75 12C20.75 12.4142 20.4142 12.75 20 12.75L4 12.75C3.58579 12.75 3.25 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25L20 11.25C20.4142 11.25 20.75 11.5858 20.75 12Z"
                              fill="#000000"
                            ></path>{" "}
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M20.75 17C20.75 17.4142 20.4142 17.75 20 17.75L4 17.75C3.58579 17.75 3.25 17.4142 3.25 17C3.25 16.5858 3.58579 16.25 4 16.25L20 16.25C20.4142 16.25 20.75 16.5858 20.75 17Z"
                              fill="#000000"
                            ></path>{" "}
                          </g>
                        </svg>
                        <div className={styles.initialsAvatar}>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      </a>
                    )}

                    <ul
                      className="dropdown-menu dropdown-menu-end me-3"
                      id={`${styles.dropdownmenu}`}
                      aria-labelledby="profileDropdown"
                    >
                      {user?.isAdmin && (
                        <li>
                          <Link
                            className={`dropdown-item ${styles.navLink}`}
                            to="/admin/dashboard"
                            onClick={() => handleLinkClick()}
                          >
                            Admin Dashboard
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link
                          className={`dropdown-item ${styles.navLink}`}
                          to="/mybookings"
                          onClick={() => handleLinkClick()}
                        >
                          My bookings
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      {!user ? (
                        <>
                          <li>
                            <Link
                              to={"/login"}
                              className={`dropdown-item ${styles.navLink}`}
                            >
                              Sign in
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={"/signup"}
                              className={`dropdown-item ${styles.navLink}`}
                            >
                              Register
                            </Link>
                          </li>
                        </>
                      ) : (
                        <li>
                          <button
                            className={`dropdown-item ${styles.navLink}`}
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </li>
                      )}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
