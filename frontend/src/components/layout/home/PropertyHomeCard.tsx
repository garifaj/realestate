import { Link } from "react-router-dom";
import styles from "./PropertyHomeCard.module.css";
import { useEffect, useState } from "react";
import { Property, PropertyHomeCardProps } from "../../../context/types";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import {
  PropertyAddressIcon,
  PropertyAreaIcon,
  PropertyBathroomIcon,
  PropertyBedroomIcon,
} from "../../../constants/icons";
import API_BASE_URL from "../../common/utils/config";

const PropertyHomeCard = ({
  selectedCity,
  selectedType,
  limit,
}: PropertyHomeCardProps) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await axios.get(`${API_BASE_URL}/properties`);
        setProperties(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  // Filter properties based on selected city and type
  const filteredProperties = properties.filter((property) => {
    const matchesCity = selectedCity ? property.city === selectedCity : true;
    const matchesType = selectedType ? property.type === selectedType : true;
    return matchesCity && matchesType;
  });

  const propertiesToDisplay = limit
    ? filteredProperties.slice(-limit).reverse()
    : filteredProperties;

  return (
    <>
      <div className="container">
        <div className="row">
          {loading ? (
            <div style={{ textAlign: "center", margin: "20px 0" }}>
              <PulseLoader color="#000000" size={20} />
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="col-12 py-5 text-center">
              <p className="text-muted">
                No properties available for the selected city and type.
              </p>
            </div>
          ) : (
            <>
              {propertiesToDisplay.map((property) => (
                <div className="col-lg-4 col-md-6 pt-5 pb-3" key={property.id}>
                  <div className={styles.propertyCard}>
                    <div className={styles.imageContainer}>
                      <div
                        className={`${styles.badge} ${
                          property.type === "Sale"
                            ? styles.badgeSale
                            : property.type === "Rent"
                            ? styles.badgeRent
                            : ""
                        }`}
                      >
                        {property.type}
                      </div>
                      <Link to={`/property/details/${property.id}`}>
                        <img
                          src={`http://localhost:5075/Photos/${property.images[0]}`}
                          alt="Property"
                          className={styles.image}
                        />
                      </Link>
                    </div>
                    <div className="info p-3">
                      <p className={styles.price}>
                        {property.price.toFixed(2)} $
                      </p>
                      <h6 className={styles.title}>
                        <Link to={"/property/details/" + property.id}>
                          {property.title}
                        </Link>
                      </h6>
                      <p
                        className={`d-flex align-items-center gap-1 ${styles.address}`}
                      >
                        <PropertyAddressIcon />
                        {property.address}
                      </p>
                      <div
                        className={`d-flex justify-content-start ${styles.propertyList}`}
                      >
                        <div className="d-flex me-3 gap-1 align-items-center ">
                          <PropertyBathroomIcon />
                          <span className={styles.propertyText}>
                            {property.bathroom}
                          </span>
                        </div>

                        <div className="d-flex me-3 gap-1 align-items-center">
                          <PropertyBedroomIcon />
                          <span className={styles.propertyText}>
                            {property.bedroom}
                          </span>
                        </div>

                        <div className="d-flex me-3 gap-1 align-items-center">
                          <PropertyAreaIcon />
                          <span className={styles.propertyText}>
                            {property.area} m²
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PropertyHomeCard;
