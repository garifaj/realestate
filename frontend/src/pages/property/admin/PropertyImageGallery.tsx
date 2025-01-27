import React, { useState } from "react";

interface ImageGalleryTestProps {
  images: string[];
  handleSetMainImage: (index: number) => void;
}

const PropertyImageGallery: React.FC<ImageGalleryTestProps> = ({
  images,
  handleSetMainImage,
}) => {
  const imageBaseUrl = "http://localhost:5075/Photos/";
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  // Selected image for preview
  const closeModal = () => setShowModal(false); // Close modal

  return (
    <>
      {/* Display the first 2 images */}
      <div className="row g-2 justify-content-end">
        {images.slice(0, 2).map((img, index) => (
          <div className="col-3 position-relative" key={index}>
            <img
              src={`${imageBaseUrl}${img}`}
              alt={`Property Image ${index + 1}`}
              className="img-fluid rounded"
              style={{
                width: "250px",
                height: "150px",
                margin: "5px",
                objectFit: "cover",
              }}
            />
            <button
              type="button"
              className="btn btn-sm  position-absolute bottom-0 end-0 mb-2 "
              onClick={() => handleSetMainImage(index)} // Use the prop function here
            >
              {index === 0 ? (
                <svg
                  fill="#FFD700"
                  width="35px"
                  height="35px"
                  viewBox="-14 -14 84.00 84.00"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    id="SVGRepo_bgCarrier"
                    strokeWidth="0"
                    transform="translate(0,0), scale(1)"
                  >
                    <rect
                      x="-14"
                      y="-14"
                      width="84.00"
                      height="84.00"
                      rx="25.2"
                      fill="#1f1f1f"
                      fillOpacity={0.8}
                      strokeWidth="0"
                    ></rect>
                  </g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M 11.9688 52.2930 C 12.9298 53.0195 14.1485 52.7617 15.6016 51.7071 L 28.0001 42.6133 L 40.4220 51.7071 C 41.8751 52.7617 43.0704 53.0195 44.0548 52.2930 C 45.0157 51.5664 45.2267 50.3711 44.6407 48.6602 L 39.7422 34.0820 L 52.2578 25.0820 C 53.7112 24.0508 54.2968 22.9727 53.9219 21.8008 C 53.5470 20.6758 52.4454 20.1133 50.6406 20.1367 L 35.2891 20.2305 L 30.6251 5.5820 C 30.0626 3.8476 29.2188 2.9805 28.0001 2.9805 C 26.8048 2.9805 25.9610 3.8476 25.3985 5.5820 L 20.7344 20.2305 L 5.3829 20.1367 C 3.5782 20.1133 2.4766 20.6758 2.1016 21.8008 C 1.7032 22.9727 2.3126 24.0508 3.7657 25.0820 L 16.2813 34.0820 L 11.3829 48.6602 C 10.7969 50.3711 11.0079 51.5664 11.9688 52.2930 Z"></path>
                  </g>
                </svg>
              ) : (
                <svg
                  width="35px"
                  height="35px"
                  viewBox="-6 -6 36.00 36.00"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  transform="matrix(1, 0, 0, 1, 0, 0)"
                >
                  <g
                    id="SVGRepo_bgCarrier"
                    strokeWidth="0"
                    transform="translate(0,0), scale(1)"
                  >
                    <rect
                      x="-6"
                      y="-6"
                      width="36.00"
                      height="36.00"
                      rx="10.8"
                      fill="#1f1f1f"
                      fillOpacity={0.8}
                      strokeWidth={0}
                    ></rect>
                  </g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#CCCCCC"
                    strokeWidth="0.336"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M11.245 4.174C11.4765 3.50808 11.5922 3.17513 11.7634 3.08285C11.9115 3.00298 12.0898 3.00298 12.238 3.08285C12.4091 3.17513 12.5248 3.50808 12.7563 4.174L14.2866 8.57639C14.3525 8.76592 14.3854 8.86068 14.4448 8.93125C14.4972 8.99359 14.5641 9.04218 14.6396 9.07278C14.725 9.10743 14.8253 9.10947 15.0259 9.11356L19.6857 9.20852C20.3906 9.22288 20.743 9.23007 20.8837 9.36432C21.0054 9.48051 21.0605 9.65014 21.0303 9.81569C20.9955 10.007 20.7146 10.2199 20.1528 10.6459L16.4387 13.4616C16.2788 13.5829 16.1989 13.6435 16.1501 13.7217C16.107 13.7909 16.0815 13.8695 16.0757 13.9507C16.0692 14.0427 16.0982 14.1387 16.1563 14.3308L17.506 18.7919C17.7101 19.4667 17.8122 19.8041 17.728 19.9793C17.6551 20.131 17.5108 20.2358 17.344 20.2583C17.1513 20.2842 16.862 20.0829 16.2833 19.6802L12.4576 17.0181C12.2929 16.9035 12.2106 16.8462 12.1211 16.8239C12.042 16.8043 11.9593 16.8043 11.8803 16.8239C11.7908 16.8462 11.7084 16.9035 11.5437 17.0181L7.71805 19.6802C7.13937 20.0829 6.85003 20.2842 6.65733 20.2583C6.49056 20.2358 6.34626 20.131 6.27337 19.9793C6.18915 19.8041 6.29123 19.4667 6.49538 18.7919L7.84503 14.3308C7.90313 14.1387 7.93218 14.0427 7.92564 13.9507C7.91986 13.8695 7.89432 13.7909 7.85123 13.7217C7.80246 13.6435 7.72251 13.5829 7.56262 13.4616L3.84858 10.6459C3.28678 10.2199 3.00588 10.007 2.97101 9.81569C2.94082 9.65014 2.99594 9.48051 3.11767 9.36432C3.25831 9.23007 3.61074 9.22289 4.31559 9.20852L8.9754 9.11356C9.176 9.10947 9.27631 9.10743 9.36177 9.07278C9.43726 9.04218 9.50414 8.99359 9.55657 8.93125C9.61593 8.86068 9.64887 8.76592 9.71475 8.57639L11.245 4.174Z"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              )}
            </button>
          </div>
        ))}

        {/* If there are more than 2 images, show the 'more' icon */}
        {images.length > 2 && (
          <div className="col-3 position-relative">
            <img
              src={`${imageBaseUrl}${images[2]}`}
              alt="More images"
              className="img-fluid rounded"
              style={{
                width: "250px",
                height: "150px",
                margin: "5px",
                opacity: 0.5,
                objectFit: "cover",
              }}
            />
            <div
              className="position-absolute top-50 start-50 translate-middle bg-dark text-white rounded-circle"
              style={{ padding: "10px 15px", cursor: "pointer" }}
              data-bs-toggle="modal"
              data-bs-target="#imageModal" // Open modal on click
            >
              +{images.length - 2}
            </div>
          </div>
        )}
      </div>

      {/* Modal to display all images */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        id="imageModal"
        tabIndex={-1}
        aria-labelledby="imageModalLabel"
        aria-hidden={!showModal}
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="imageModalLabel">
                Property Images
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                {images.map((img, index) => (
                  <div className="col-4 position-relative" key={index}>
                    <img
                      src={`${imageBaseUrl}${img}`}
                      alt={`Property Image ${index + 1}`}
                      className="img-fluid rounded"
                      style={{
                        width: "450px",
                        height: "150px ",
                        marginBottom: "10px",
                        objectFit: "cover",
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-sm  position-absolute bottom-0 end-0 mb-3 me-2"
                      onClick={() => handleSetMainImage(index)} // Use the prop function here
                    >
                      {index === 0 ? (
                        <svg
                          fill="#FFD700"
                          width="35px"
                          height="35px"
                          viewBox="-14 -14 84.00 84.00"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g
                            id="SVGRepo_bgCarrier"
                            strokeWidth="0"
                            transform="translate(0,0), scale(1)"
                          >
                            <rect
                              x="-14"
                              y="-14"
                              width="84.00"
                              height="84.00"
                              rx="25.2"
                              fill="#1f1f1f"
                              fillOpacity={0.8}
                              strokeWidth="0"
                            ></rect>
                          </g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path d="M 11.9688 52.2930 C 12.9298 53.0195 14.1485 52.7617 15.6016 51.7071 L 28.0001 42.6133 L 40.4220 51.7071 C 41.8751 52.7617 43.0704 53.0195 44.0548 52.2930 C 45.0157 51.5664 45.2267 50.3711 44.6407 48.6602 L 39.7422 34.0820 L 52.2578 25.0820 C 53.7112 24.0508 54.2968 22.9727 53.9219 21.8008 C 53.5470 20.6758 52.4454 20.1133 50.6406 20.1367 L 35.2891 20.2305 L 30.6251 5.5820 C 30.0626 3.8476 29.2188 2.9805 28.0001 2.9805 C 26.8048 2.9805 25.9610 3.8476 25.3985 5.5820 L 20.7344 20.2305 L 5.3829 20.1367 C 3.5782 20.1133 2.4766 20.6758 2.1016 21.8008 C 1.7032 22.9727 2.3126 24.0508 3.7657 25.0820 L 16.2813 34.0820 L 11.3829 48.6602 C 10.7969 50.3711 11.0079 51.5664 11.9688 52.2930 Z"></path>
                          </g>
                        </svg>
                      ) : (
                        <svg
                          width="35px"
                          height="35px"
                          viewBox="-6 -6 36.00 36.00"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          transform="matrix(1, 0, 0, 1, 0, 0)"
                        >
                          <g
                            id="SVGRepo_bgCarrier"
                            strokeWidth="0"
                            transform="translate(0,0), scale(1)"
                          >
                            <rect
                              x="-6"
                              y="-6"
                              width="36.00"
                              height="36.00"
                              rx="10.8"
                              fill="#1f1f1f"
                              fillOpacity={0.8}
                              strokeWidth={0}
                            ></rect>
                          </g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            stroke="#CCCCCC"
                            strokeWidth="0.336"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M11.245 4.174C11.4765 3.50808 11.5922 3.17513 11.7634 3.08285C11.9115 3.00298 12.0898 3.00298 12.238 3.08285C12.4091 3.17513 12.5248 3.50808 12.7563 4.174L14.2866 8.57639C14.3525 8.76592 14.3854 8.86068 14.4448 8.93125C14.4972 8.99359 14.5641 9.04218 14.6396 9.07278C14.725 9.10743 14.8253 9.10947 15.0259 9.11356L19.6857 9.20852C20.3906 9.22288 20.743 9.23007 20.8837 9.36432C21.0054 9.48051 21.0605 9.65014 21.0303 9.81569C20.9955 10.007 20.7146 10.2199 20.1528 10.6459L16.4387 13.4616C16.2788 13.5829 16.1989 13.6435 16.1501 13.7217C16.107 13.7909 16.0815 13.8695 16.0757 13.9507C16.0692 14.0427 16.0982 14.1387 16.1563 14.3308L17.506 18.7919C17.7101 19.4667 17.8122 19.8041 17.728 19.9793C17.6551 20.131 17.5108 20.2358 17.344 20.2583C17.1513 20.2842 16.862 20.0829 16.2833 19.6802L12.4576 17.0181C12.2929 16.9035 12.2106 16.8462 12.1211 16.8239C12.042 16.8043 11.9593 16.8043 11.8803 16.8239C11.7908 16.8462 11.7084 16.9035 11.5437 17.0181L7.71805 19.6802C7.13937 20.0829 6.85003 20.2842 6.65733 20.2583C6.49056 20.2358 6.34626 20.131 6.27337 19.9793C6.18915 19.8041 6.29123 19.4667 6.49538 18.7919L7.84503 14.3308C7.90313 14.1387 7.93218 14.0427 7.92564 13.9507C7.91986 13.8695 7.89432 13.7909 7.85123 13.7217C7.80246 13.6435 7.72251 13.5829 7.56262 13.4616L3.84858 10.6459C3.28678 10.2199 3.00588 10.007 2.97101 9.81569C2.94082 9.65014 2.99594 9.48051 3.11767 9.36432C3.25831 9.23007 3.61074 9.22289 4.31559 9.20852L8.9754 9.11356C9.176 9.10947 9.27631 9.10743 9.36177 9.07278C9.43726 9.04218 9.50414 8.99359 9.55657 8.93125C9.61593 8.86068 9.64887 8.76592 9.71475 8.57639L11.245 4.174Z"
                              stroke="#ffffff"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>{" "}
                          </g>
                        </svg>
                      )}
                    </button>
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
