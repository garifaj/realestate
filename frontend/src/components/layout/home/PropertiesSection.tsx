import { Link } from "react-router-dom";
import styles from "./PropertiesSection.module.css";
import PropertyHomeCard from "./PropertyHomeCard";
// import { useState } from "react";
// import { cities, propertyTypes } from "../../../constants/constants";
 // Assuming you have a separate file for these constants

const PropertiesSection = () => {

  return (
    <>
      <section className={`${styles.properties} py-5`}>
        <div className="container">
          <h1 className={styles.title}>Properties</h1>
          <PropertyHomeCard 
            limit={6} 
          />
          <div className="row justify-content-center">
            <div className="col-auto">
              <Link to="/allproperties" className={`btn btn-primary ${styles.viewPropertiesButton}`}>
                View all properties
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertiesSection;
