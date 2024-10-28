import { useContext, useState } from 'react';
import styles from './Header.module.css'; // Import the CSS module
import LoginModal from '../common/LoginModal';
import SignupModal from '../common/SignupModal';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleOpenLogin = () => {
    setShowSignup(false);
    setShowLogin(true);

  }
  const handleCloseLogin = () => setShowLogin(false);

  const handleSignupShow = () => {
    setShowLogin(false); // Close login modal when signup is opened
    setShowSignup(true);
  };
  const handleCloseSignup = () => setShowSignup(false);

  const handleLogout = async () => {
    await axios.post("http://localhost:5075/api/logout", {}, { withCredentials: true });
    navigate('/');
    setUser(null); // Clear user data from context
    // Redirect to homepage after logging out
  };

  return (
    <>
      <header className={styles.header}>
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <a className={`nav-link ${styles.navBrand}`} href="#">STATED.</a>
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
            <div className={`offcanvas offcanvas-end ${styles.offcanvasCustom}`} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
              <div className="offcanvas-header">
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li className="nav-item px-3">
                    <a className={`nav-link px-2 ${styles.navLink}`} href="#">
                      Home
                    </a>
                  </li>
                  <li className="nav-item px-3">
                    <a className={`nav-link px-2 ${styles.navLink}`} href="#">
                      Properties
                    </a>
                  </li>
                  <li className="nav-item px-3 ">
                    <a className={`nav-link px-2 ${styles.navLink}`} href="#" >
                      Agents
                    </a>
                  </li>
                  <li className="nav-item px-3 ">
                    <a className={`nav-link px-2 ${styles.navLink}`} href="#">Blogs</a>
                  </li>
                  {/* Profile Dropdown */}
                  <li className="nav-item dropdown px-3">
                    {!user ? (
                      <a
                        className={`nav-link dropdown-toggle ${styles.navLink}`}
                        href="#"
                        id={`${styles.dropdown}`}
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Join us
                      </a>
                    ) : (
                      <a
                        className={`nav-link dropdown-toggle ${styles.navLink}`}
                        href="#"
                        id={`${styles.dropdown}`}
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Hello, {user?.name}
                      </a>
                    )}

                    <ul className="dropdown-menu" id={`${styles.dropdownmenu}`} aria-labelledby="profileDropdown">
                      <li>
                        <a className={`dropdown-item ${styles.navLink}`} href='#' onClick={handleOpenLogin}>
                          My bookings
                        </a>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      {!user ? (
                        <>
                          <li>
                            <button className={`dropdown-item ${styles.navLink}`} onClick={handleOpenLogin}>
                              Sign in
                            </button>
                          </li>
                          <li>
                            <button className={`dropdown-item ${styles.navLink}`} onClick={handleSignupShow}>
                              Register
                            </button>
                          </li>
                        </>

                      ) : (
                        <li>
                          <button className={`dropdown-item ${styles.navLink}`} onClick={handleLogout}>
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

      <LoginModal show={showLogin} handleClose={handleCloseLogin} handleSignupShow={handleSignupShow} />
      <SignupModal show={showSignup} handleClose={handleCloseSignup} handleLogin={handleOpenLogin} />

      <section className={`hero d-flex align-items-center justify-content-center ${styles.hero}`}>
        <div className={`col-md-5 col-sm-8 mt-lg-5 text-center  ${styles.hero_content}`}>
          <h1>Buy and sell real estate properties</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam assumenda ea quo cupiditate facere deleniti fuga officia.</p>
        </div>
      </section>
    </>
  );
}
