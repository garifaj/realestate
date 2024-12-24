import { useEffect, useState } from "react";
import { Property } from "../../../context/types";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../components/layout/home/Navbar";
import styles from "./PropertyDetails.module.css";
import BookingForm from "../../booking/home/BookingForm";
import AgentInfoCard from "./AgentInfoCard";
import PropertyImgCards from "./PropertyImgCards";
import Footer from "../../../components/layout/home/Footer";

const PropertyDetails = () => {
  const [property, setProperty] = useState<Property | null>(null);
  const { propertyid } = useParams();

  useEffect(() => {
    async function fetchProperty() {
      try {
        const response = await axios.get(
          "http://localhost:5075/api/properties/" + propertyid
        );
        setProperty(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProperty();
  }, [propertyid]);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="title py-4">
          <h3>{property?.title}</h3>
        </div>

        {/* Images Section */}
       <PropertyImgCards property={property}/>

        {/* Property Details */}
        <div className="row py-5">
          <div className="col-lg-8">
            <h3>${property?.price}</h3>
            <h5 className="py-2">
              {property?.address}, {property?.city}
            </h5>
            <div className="d-flex py-2">
              <div className="d-flex align-items-center pe-3 border-end">
                <span className={styles.propertyText}>
                  {property?.bathroom} baths
                </span>
              </div>
              <div className="d-flex align-items-center px-3 border-end">
                <span className={styles.propertyText}>
                  {property?.bedroom} beds
                </span>
              </div>
              <div className="d-flex align-items-center ps-3">
                <span className={styles.propertyText}>
                  {property?.area} m²
                </span>
              </div>
            </div>
            <div className="description py-5">
              <h4>Description:</h4>
              <p
                dangerouslySetInnerHTML={{
                  __html: property?.description ?? "",
                }}
              ></p>
            </div>
          </div>
          <div className="col-lg-4">
            <AgentInfoCard property={property} />
            <BookingForm />
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default PropertyDetails;
