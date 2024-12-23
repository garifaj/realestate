import { useState } from "react";
import styles from "./PropertyDetails.module.css";
import { Property } from "../../../context/types";

type PropertyImgCardsProps = {
  property: Property | null; 
}

const PropertyImgCards = ({property}: PropertyImgCardsProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openModal = (index:number) => {
    setActiveIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <>
      {/* Image Section */}
      <div className={styles.imagesSection}>
        <div className="row g-2 overflow-hidden" style={{ maxHeight: "450px" }}>
          <div className="col-lg-9 d-flex" style={{ height: "100%" }}>
            {property?.images?.[0] && (
              <img
                src={`http://localhost:5075/Photos/${property?.images?.[0]}`}
                alt="Main property"
                className="img-fluid rounded"
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                onClick={() => openModal(0)}
              />
            )}
          </div>
          <div className="col-lg-3 d-flex flex-column" style={{ height: "100%" }}>
            <div className="flex-grow-1 h-50">
              {property?.images?.[1] && (
                <img
                  src={`http://localhost:5075/Photos/${property?.images?.[1]}`}
                  alt="Property"
                  className="img-fluid rounded"
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                  onClick={() => openModal(1)}
                />
              )}
            </div>
            <div className="flex-grow-1 mt-2 h-50">
              {property?.images?.[2] && (
                <img
                  src={`http://localhost:5075/Photos/${property?.images?.[2]}`}
                  alt="Property"
                  className="img-fluid rounded"
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                  onClick={() => openModal(2)}
                />
              )}
            </div>
          </div>
        </div>

        <button
          className="btn btn-dark position-absolute"
          style={{
            bottom: "20px",
            right: "20px",
            zIndex: "10",
            backgroundColor: "#343a40",
            border: "none",
            padding: "10px 15px",
            fontSize: "14px",
            lineHeight: "1.5",
          }}
          onClick={() => openModal(0)}
        >
          Show all photos
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="modal d-flex align-items-center justify-content-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#000",
            zIndex: 1050,
          }}
          onClick={closeModal}
        >
          <div
            className="carousel"
            style={{
              position: "relative",
              width: "100%",
              height: "85%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`http://localhost:5075/Photos/${property?.images?.[activeIndex]}`}
              alt={`Property ${activeIndex + 1}`}
              className="img-fluid rounded"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
            <button
              className="btn rounded-5 p-2"
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                zIndex: 1051,
              }}
              onClick={() => property?.images && setActiveIndex((prev) => (prev - 1 + property.images.length) % property.images.length)}
            >
              <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z" fill="#ffffff"></path> </g></svg>
            </button>
            <button
              className="btn rounded-5 p-2"
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                zIndex: 1051,
              }}
              onClick={() =>property?.images && setActiveIndex((prev) => (prev + 1) % property.images.length)}
            >
              <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" transform="rotate(180)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z" fill="#ffffff"></path> </g></svg>
            </button>
            
          </div>
          <button
              className="btn"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 1051,
                color:"#fff"
              }}
              onClick={closeModal}
            >
             <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z" fill="#ffffff"></path></g></svg> 
            </button>
        </div>
      )}
    </>
  );
};

export default PropertyImgCards;
