import styles from './Header.module.css'; // Import the CSS module

export default function Header() {
  return (
    <>
      <header  className={styles.header}> 
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
                  {/* <li className="nav-item px-2">
                    <a className={`nav-link px-4 ${styles.signup}`} href="#" role="button">
                      Register
                    </a>
                  </li> */}
                  <li className="nav-item " style={{paddingLeft: "1rem"}}>
                    <a className={`nav-link px-4 ${styles.signin}`} href="#" role="button">
                      Sign in
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <section className={`hero d-flex align-items-center justify-content-center ${styles.hero}`}>
      <div className={`col-md-5 col-sm-8 mt-lg-5 text-center  ${styles.hero_content}`}>
        <h1>Buy and sell real estate properties</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam assumenda ea quo cupiditate facere deleniti fuga officia.</p>
      </div>
      </section>

     
    </>
  );
}
