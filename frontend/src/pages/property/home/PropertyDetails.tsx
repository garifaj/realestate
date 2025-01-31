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
import API_BASE_URL from "../../../components/common/utils/config";

const PropertyDetails = () => {
  const [property, setProperty] = useState<Property | null>(null);
  const { propertyid } = useParams();

  useEffect(() => {
    async function fetchProperty() {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/properties/` + propertyid
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
          <h3 className={styles.title}>{property?.title}</h3>
        </div>

        {/* Images Section */}
        <PropertyImgCards property={property} />

        {/* Property Details */}
        <div className="row py-5">
          <div className="col-lg-8">
            <h3 className="fw-semibold">
              {property?.price !== undefined && property?.price !== null
                ? new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(Number(property.price))
                : "N/A"}
            </h3>
            <h6 className="py-2">
              {property?.address}, {property?.city}
            </h6>
            <div className="d-flex py-2">
              <div className="d-flex align-items-center pe-4 border-end">
                <span className={styles.propertyText}>
                  {property?.bathroom} baths
                </span>
              </div>
              <div className="d-flex align-items-center px-4 border-end">
                <span className={styles.propertyText}>
                  {property?.bedroom} beds
                </span>
              </div>
              <div className="d-flex align-items-center ps-4">
                <span className={styles.propertyText}>{property?.area} m²</span>
              </div>
            </div>
            <div className="description py-4 " style={{ textAlign: "justify" }}>
              <h4 className="fw-semibold">Description:</h4>
              <p
                className="lh-lg"
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
      <Footer />
    </>
  );
};

export default PropertyDetails;
