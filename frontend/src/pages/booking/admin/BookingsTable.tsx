import { useEffect, useState } from "react";
import { Booking } from "../../../context/types";

import axios from "axios";
import styles from "./BookingsTable.module.css";
import BookingDetailsModal from "./BookingDetailsModal";
import TablePagination from "../../../components/common/admin/TablePagination";
import { Slide, toast, ToastContainer } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { CancelIcon, ViewDetailsIcon } from "../../../constants/icons";
import API_BASE_URL from "../../../components/common/utils/config";

const BookingsTable = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 4;

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await axios.get(`${API_BASE_URL}/bookings`);
        setBookings(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  const cancelBooking = (bookingId: number) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      axios
        .put(`${API_BASE_URL}/bookings/cancel/${bookingId}`)
        .then(() => {
          // Update the bookings list in state
          setBookings((prevBookings) =>
            prevBookings.map((booking) =>
              booking.id === bookingId
                ? { ...booking, status: "Canceled" }
                : booking
            )
          );
          toast.success("Booking has been canceled successfully.");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to cancel booking. Please try again.");
        });
    }
  };

  const handleOpenBookingModal = (booking: Booking) => {
    setShowBookingModal(true);
    setSelectedBooking(booking);
  };

  const handleCloseBookingModal = () => {
    setShowBookingModal(false);
    setSelectedBooking(null);
  };

  const sortedBookings = bookings.sort((a, b) => b.id - a.id);

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = sortedBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container py-5">
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        pauseOnHover={false}
        theme="light"
        transition={Slide}
      />
      <div className="card" id={styles.card}>
        <div className="card-title">
          <h2 className="mb-0 text-center">Bookings Table</h2>
        </div>
        <div className="card-body">
          <div className={styles.divbtn}></div>
          <div className="table-responsive">
            {loading ? (
              <div style={{ textAlign: "center", margin: "20px 0" }}>
                <PulseLoader color="#000000" size={20} />
              </div>
            ) : (
              <table
                className="table table-bordered table-hover"
                style={{ minWidth: "850px", maxWidth: "100%" }}
              >
                <thead className="bg-dark text-white  ">
                  <tr id={styles.headerRow}>
                    <td>ID</td>
                    <td>Property title</td>
                    <td>Property address</td>
                    <td>User info</td>
                    <td>Booking date</td>
                    <td>Status</td>
                    <td>Agent</td>
                    <td>Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {currentBookings.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        style={{ textAlign: "center", fontSize: "25px" }}
                      >
                        No bookings found!
                      </td>
                    </tr>
                  ) : (
                    currentBookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td style={{ maxWidth: "10rem" }}>
                          <div className={styles.customCell1}>
                            {booking.property.title}
                          </div>
                        </td>
                        <td style={{ maxWidth: "9rem" }}>
                          <div className={styles.customCell2}>
                            {`${booking.property.address}, ${booking.property.city}`}
                          </div>
                        </td>
                        <td style={{ maxWidth: "9rem" }}>
                          <div className={styles.customCell3}>
                            <strong>{`${booking.user.name} ${booking.user.surname}`}</strong>
                            <br />
                            <small>{booking.user.email}</small>
                            <br />
                            <small> {booking.user.phoneNumber}</small>
                          </div>
                        </td>
                        <td>
                          {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }).format(new Date(booking.bookingDate))}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              booking.status === "Finished"
                                ? "bg-success"
                                : booking.status === "Pending"
                                ? "bg-warning"
                                : "bg-danger"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td>
                          {booking.property.agent
                            ? `${booking.property.agent.name} ${booking.property.agent.surname}`
                            : "Unassigned"}
                        </td>
                        <td>
                          <div className="d-flex justify-content-center align-content-center gap-1">
                            <a
                              id={styles.link}
                              onClick={(e) => {
                                e.preventDefault();
                                handleOpenBookingModal(booking);
                              }}
                            >
                              <ViewDetailsIcon />
                            </a>

                            {booking.status === "Pending" && (
                              <a
                                id={styles.link}
                                onClick={(e) => {
                                  e.preventDefault();
                                  cancelBooking(booking.id);
                                }}
                              >
                                <CancelIcon />
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                <tfoot>
                  <TablePagination
                    totalItems={bookings.length}
                    itemsPerPage={bookingsPerPage}
                    currentPage={currentPage}
                    paginate={paginate}
                    colSpan={8} // Set this dynamically based on your table's column count
                  />
                </tfoot>
              </table>
            )}
          </div>
        </div>
      </div>
      <BookingDetailsModal
        show={showBookingModal}
        handleClose={handleCloseBookingModal}
        booking={selectedBooking}
      />
    </div>
  );
};

export default BookingsTable;
