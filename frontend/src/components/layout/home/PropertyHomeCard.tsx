import { Link } from "react-router-dom";
import styles from "./PropertyHomeCard.module.css";
import { useEffect, useState } from "react";
import { Property } from "../../../context/types";
import axios from "axios";

type PropertyHomeCardProps = {
  selectedCity?: string;
  selectedType?: string;
  limit?: number;
};

const PropertyHomeCard = ({ selectedCity, selectedType, limit }: PropertyHomeCardProps) => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await axios.get("http://localhost:5075/api/properties");
        setProperties(response.data);
      } catch (error) {
        console.error(error);
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

  const propertiesToDisplay = limit ? filteredProperties.slice(-limit).reverse() : filteredProperties;

  return (
    <>
      <div className="container">
        <div className="row">
          {filteredProperties.length === 0 ? (
            <div className="col-12 py-5 text-center">
            <p className="text-muted">No properties available for the selected city and type.</p>
          </div>
          ) : (
            <>
            {propertiesToDisplay.map((property) => (
              <div className="col-lg-4 col-md-6 pt-5 pb-3" key={property.id}>
                <div className={styles.propertyCard}>
                  <div className={styles.imageContainer}>
                    <div
                      className={`${styles.badge} ${
                        property.type === "Sale" ? styles.badgeSale : property.type === "Rent" ? styles.badgeRent : ""
                      }`}
                    >
                      {property.type}
                    </div>
                    <Link to={`property/details/${property.id}`}>
                      <img
                        src={`http://localhost:5075/Photos/${property.images[0]}`}
                        alt="Property"
                        className={styles.image}
                      />
                    </Link>
                  </div>
                  <div className="info p-3">
                    <p className={styles.price}>{property.price.toFixed(2)} $</p>
                    <h6 className={styles.title}>
                      <Link to={"property/details/" + property.id}>{property.title}</Link>
                    </h6>
                    <p className={`d-flex align-items-center gap-1 ${styles.address}`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#999999">
                        <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                      {property.address}
                    </p>
                    <div className={`d-flex justify-content-start ${styles.propertyList}`}>
  
                      <div className="d-flex me-3 gap-1 align-items-center ">
                        <svg
                          fill="#999999"
                          viewBox="0 0 512 512"
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="19" // Set a specific size for visibility
                        >
                          <path d="m496 288c-38.154 0-437.487 0-448 0v-56h32c8.837 0 16-7.164 16-16v-40c0-8.836-7.163-16-16-16s-16 7.164-16 16v24h-16v-138.745c0-25.903 31.562-39.064 49.941-20.686l16.94 16.94c-13.424 23.401-10.164 53.835 9.805 73.805l8 8c6.247 6.248 16.379 6.249 22.627 0l64-64c6.249-6.248 6.249-16.379 0-22.627l-8-8c-20.35-20.351-50.837-23.06-73.817-9.817l-16.928-16.928c-11.57-11.57-26.952-17.942-43.313-17.942-33.776 0-61.255 27.479-61.255 61.255v226.745c-8.837 0-16 7.164-16 16s7.163 16 16 16v32c0 43.889 19.742 83.247 50.806 109.681l-22.338 23.229c-9.803 10.193-2.445 27.09 11.53 27.09 4.199 0 8.394-1.644 11.534-4.91l26.218-27.263c19.844 10.326 42.376 16.173 66.25 16.173h192c23.874 0 46.406-5.847 66.25-16.173l26.218 27.263c6.106 6.35 16.234 6.585 22.623.442 6.369-6.125 6.566-16.254.441-22.623l-22.338-23.229c31.064-26.433 50.806-65.791 50.806-109.68v-32c8.837 0 16-7.164 16-16s-7.163-16-16-16zm-310.89-223.738-40.845 40.845c-8.246-11.427-7.23-27.515 3.048-37.794 10.378-10.377 26.461-11.259 37.797-3.051zm278.89 287.738c0 61.757-50.243 112-112 112h-192c-61.757 0-112-50.243-112-112v-32h416z"></path>
                        </svg>
                        <span className={styles.propertyText}>{property.bathroom}</span>
                      </div>
                        
                      <div className="d-flex me-3 gap-1 align-items-center">
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="#999999" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 17v2M12 5.5V10m-6 7v2m15-2v-4c0-1.6569-1.3431-3-3-3H6c-1.65685 0-3 1.3431-3 3v4h18Zm-2-7V8c0-1.65685-1.3431-3-3-3H8C6.34315 5 5 6.34315 5 8v2h14Z"/>
                      </svg>
                      <span className={styles.propertyText}>{property.bedroom}</span>
                      </div>
  
                      <div className="d-flex me-3 gap-1 align-items-center">
                      <svg width="19" height="19" viewBox="0 0 48.001 48.001" xmlns="http://www.w3.org/2000/svg" fill="#999999" stroke="#999999"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="area" d="M189,471a5.005,5.005,0,0,1-5-5V428a5.006,5.006,0,0,1,5-5h38a5.006,5.006,0,0,1,5,5v38a5.005,5.005,0,0,1-5,5Zm27-2h11a3,3,0,0,0,3-3V455H216Zm-15,0h14V455H201Zm-15-3a3,3,0,0,0,3,3h11V455H186Zm30-12h14V440H216Zm-4.293,0H215v-3.292Zm-4,0H211l-.353-.353,4-4L215,450v-3.293Zm-4,0H207l-.354-.353,8-8L215,446v-3.293ZM201,454h2l-.353-.353,12-12L215,442v-2h-.29a6.88,6.88,0,0,0,.219-1H215V425H201v14h.071a7.047,7.047,0,0,0,.219,1H201v3.292l1.271-1.27a7.068,7.068,0,0,0,.635.779l-1.552,1.553L201,444v3.293l3.331-3.331a6.88,6.88,0,0,0,.932.482l-3.91,3.91L201,448v3.292l6.073-6.073-.848-2.545a5,5,0,1,1,3.55,0L208,448l-.573-1.72-6.073,6.073L201,452Zm-15,0h14V440H186Zm19-16a3,3,0,1,0,3-3A3,3,0,0,0,205,438Zm11,1h14V428a3,3,0,0,0-3-3H216Zm-30-11v11h14V425H189A3,3,0,0,0,186,428Z" transform="translate(-184 -423)" fill="#999999"></path> </g></svg>
                      <span className={styles.propertyText}>{property.area} m²</span>
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
