import {
  BuyPropertyIcon,
  FindPropertyIcon,
  MakeInvestmentIcon,
} from "../../../constants/icons";
import styles from "./HowItWorksSection.module.css";

const HowItWorksSection = () => {
  return (
    <>
      <section className="py-5">
        <div className="container">
          <div className="row mb-5">
            <div className="col md-7 text-center">
              <h2 className={styles.title}>How It Works</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 text-center p-3">
              <FindPropertyIcon />
              <h3 className={styles.cardtitle}>Find Property</h3>
              <p className={styles.cardparagraph}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quisquam, laborum provident, consequatur saepe.
              </p>
            </div>
            <div className="col-md-4 text-center p-3">
              <BuyPropertyIcon />
              <h3 className={styles.cardtitle}>Buy Property</h3>
              <p className={styles.cardparagraph}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quisquam, laborum provident, consequatur saepe.
              </p>
            </div>

            <div className="col-md-4 text-center p-3">
              <MakeInvestmentIcon />
              <h3 className={styles.cardtitle}>Make Investment</h3>
              <p className={styles.cardparagraph}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quisquam, laborum provident, consequatur saepe.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorksSection;
