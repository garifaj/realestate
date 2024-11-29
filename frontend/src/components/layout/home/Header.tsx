
import styles from './Header.module.css'; // Import the CSS module
import Navbar from './Navbar';


export default function Header() {


  return (
    <>
      <Navbar/>
      <section className={`hero d-flex align-items-center justify-content-center ${styles.hero}`}>
        <div className={`col-md-5 col-sm-8 mt-lg-5 text-center  ${styles.hero_content}`}>
          <h1>Buy and sell real estate properties</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam assumenda ea quo cupiditate facere deleniti fuga officia.</p>
        </div>
      </section>
    </>
  );
}
