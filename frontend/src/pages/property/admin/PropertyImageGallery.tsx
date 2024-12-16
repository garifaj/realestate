import React, { useState } from "react";

interface ImageGalleryTestProps {
  images: string[];
}

const PropertyImageGallery: React.FC<ImageGalleryTestProps> = ({ images }) => {
  const imageBaseUrl = "http://localhost:5075/Photos/";
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  // Selected image for preview
  const closeModal = () => setShowModal(false); // Close modal


  return (
    <>
      {/* Display the first 2 images */}
      <div className="row g-2 justify-content-end">
        {images.slice(0, 2).map((img, index) => (
          <div className="col-3" key={index}>
            <img
              src={`${imageBaseUrl}${img}`}
              alt={`Property Image ${index + 1}`}
              className="img-fluid rounded"
              style={{ width: "150px", height: "150px", margin: "5px", objectFit:"cover"}}
            />
          </div>
        ))}
        
        {/* If there are more than 2 images, show the 'more' icon */}
        {images.length > 2 && (
          <div className="col-3 position-relative">
            <img
              src={`${imageBaseUrl}${images[2]}`}
              alt="More images"
              className="img-fluid rounded"
              style={{ width: "150px", height: "150px", margin:"5px", opacity: 0.5 , objectFit:"cover"}}
            />
            <div
              className="position-absolute top-50 start-50 translate-middle bg-dark text-white rounded-circle"
              style={{ padding: '10px 15px', cursor: 'pointer' }}
              data-bs-toggle="modal"
              data-bs-target="#imageModal" // Open modal on click
            >
              +{images.length - 2}
            </div>
          </div>
        )}
      </div>

      {/* Modal to display all images */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} id="imageModal" tabIndex={-1} aria-labelledby="imageModalLabel" aria-hidden={!showModal} style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="imageModalLabel">Property Images</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <div className="row">
                {images.map((img, index) => (
                  <div className="col-4" key={index}>
                    <img
                      src={`${imageBaseUrl}${img}`}
                      alt={`Property Image ${index + 1}`}
                      className="img-fluid rounded"
                      style={{ width: "250px", height:"250px ", marginBottom: "10px", objectFit:"cover"}}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyImageGallery;
