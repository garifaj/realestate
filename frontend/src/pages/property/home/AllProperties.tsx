import Navbar from "../../../components/layout/home/Navbar";
import PropertyHomeCard from "../../../components/layout/home/PropertyHomeCard";
import { useState } from "react";
import { cities, propertyTypes } from "../../../constants/constants";
import styles from "./AllProperties.module.css";
import Footer from "../../../components/layout/home/Footer";

const AllProperties = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");

  // Function to handle filter changes
  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row pt-5">
          <div className="col-md-7">
            <h2 className={styles.title}>All Properties</h2>
          </div>
          <div className="col-md-5">
            <div className="d-flex">
              <select onChange={handleCityChange} className="form-select me-3">
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              <select onChange={handleTypeChange} className="form-select">
                <option value="">Select Type</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="row pb-5">
          <PropertyHomeCard
            selectedCity={selectedCity}
            selectedType={selectedType}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllProperties;
