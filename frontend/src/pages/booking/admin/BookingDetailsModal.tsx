import { Booking } from "../../../context/types";
import styles from "./BookingDetailsModal.module.css"

type ModalProps = {
    show: boolean;
    handleClose: () => void;
    booking: Booking|null;
}

const BookingDetailsModal: React.FC<ModalProps> = ({show, handleClose, booking}) => {
  return (
    <div
    className={`modal fade ${show ? "show d-block" : "d-none"}`}
    tabIndex={-1}
    role="dialog"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    >
    <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
        {/* Modal Header */}
        <div className="modal-header">
            <div className={styles.title}>
                <h5 className="modal-title">Booking Details</h5>
            </div>
            <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={handleClose}
            ></button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
            {/* Booking Summary */}
            <h6 className="mb-2 text-center">Booking Summary</h6>
            <div className="d-flex justify-content-around">
            <span>
                <strong id={styles.label}>Status:</strong>{" "}
                <span
                className={`badge ${
                    booking?.status === "Finished"
                    ? "bg-success"
                    : booking?.status === "Pending"
                    ? "bg-warning"
                    : "bg-danger"
                }`}
                >
                {booking?.status}
                </span>
            </span>
            <span id={styles.data}>
                <strong id={styles.label}>Booking Date:</strong> {" "}
                {booking?.bookingDate
                ? new Date(booking.bookingDate).toLocaleString()
                : "N/A"}
            </span>
            </div>

            <hr />

            {/* Property Details */}
            <h6 className="mb-2 text-center">Property Details</h6>
            <div className="d-flex justify-content-around px-4 text-center ">
            <div className="col-2">
                <p id={styles.data}>
                <strong id={styles.label}>Title:</strong> <br />
                {booking?.property.title}
                </p>
                <p id={styles.data}>
                <strong id={styles.label}>Type:</strong> <br />
                {booking?.property.type}
                </p>
            </div>
            <div className="col-3">
                <p id={styles.data}>
                <strong id={styles.label}>Address:</strong> <br />
                {`${booking?.property.address}, ${booking?.property.city}`}
                </p>
                <p id={styles.data}>
                <strong id={styles.label}>Area:</strong> <br />
                {booking?.property.area} m²
                </p>
            </div>
            <div className="col-3">
                <p id={styles.data}>
                <strong id={styles.label}>Price:</strong> <br />
                {booking?.property.price.toLocaleString('en-IE', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                })}
                </p>
                <p id={styles.data}>
                <strong id={styles.label}>Bedrooms/Bathrooms:</strong> <br />
                {`${booking?.property.bedroom} / ${booking?.property.bathroom}`}
                </p>
            </div>
            </div>

            <hr />

            {/* Agent Details */}
            <h6 className="mb-2 text-center">Agent Details</h6>
            <div className="d-flex justify-content-around px-5 text-center">
                <span id={styles.data}>
                <strong id={styles.label}>Name:</strong> <br />
                {`${booking?.property.agent?.name} ${booking?.property.agent?.surname}`}
                </span>
                <span id={styles.data}>
                <strong id={styles.label}>Email:</strong> <br />
                {booking?.property.agent?.email}
                </span>
                <span id={styles.data}>
                <strong id={styles.label}>Phone:</strong> <br />
                {booking?.property.agent?.phoneNumber}
                </span>
                <span>
                <strong id={styles.label}>LinkedIn:</strong> <br />
                <a id={styles.link} href={booking?.property.agent?.linkedIn} target="_blank" rel="noopener noreferrer" >
                    Profile
                </a>
                </span>
            </div>
            <hr />

            {/* User Details */}
            <h6 className="mb-2 text-center">User Details</h6>
            <div className="d-flex justify-content-around text-center">
            <span id={styles.data}>
                <strong id={styles.label}>Name:</strong> <br />
                {`${booking?.user.name} ${booking?.user.surname}`}
            </span>
            <span id={styles.data}>
                <strong id={styles.label}>Phone:</strong> <br />
                {booking?.user.phoneNumber}
            </span>
            <span id={styles.data}>
                <strong id={styles.label}>Email:</strong> <br />
                {booking?.user.email}
            </span>
            </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleClose}>
            Close
            </button>
        </div>
        </div>
    </div>
    </div>

  )
}

export default BookingDetailsModal
