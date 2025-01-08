import { useEffect, useState } from "react"
import { Booking } from "../../../context/types";

import axios from "axios";
import styles from "./BookingsTable.module.css";
import BookingDetailsModal from "./BookingDetailsModal";
import TablePagination from "../../../components/common/admin/TablePagination";

const BookingsTable = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [selectedBooking, setSelectedBooking] = useState<Booking|null>(null);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const bookingsPerPage = 4;

    useEffect(() =>{
        async function fetchBookings() {
            try {
                const response = await axios.get("http://localhost:5075/api/bookings");
                setBookings(response.data); 
            } catch (error) {
                console.error(error)
            }
        }

        fetchBookings();
    },[])

    const cancelBooking = (bookingId: number) => {
      if(window.confirm("Are you sure you want to cancel this booking?")) {
          axios.put(`http://localhost:5075/api/bookings/cancel/${bookingId}`)
          .then(() => {
              alert("Booking has been canceled successfully.");
              window.location.reload();
          })
          .catch((error) => {
              console.log(error);
          });
      }
  }

    const handleOpenBookingModal = (booking: Booking) =>{
      setShowBookingModal(true);
      setSelectedBooking(booking)
    }

    const handleCloseBookingModal = () =>{
      setShowBookingModal(false);
      setSelectedBooking(null);
    }

    const sortedBookings = bookings.sort((a, b) => b.id - a.id);

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = sortedBookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const paginate = (pageNumber: number) => {
      setCurrentPage(pageNumber);
    };

  return (
    <div className="container py-5">
      <div className="card" id={styles.card}>
        <div className="card-title">
          <h2 className="mb-0 text-center">Bookings Table</h2>
        </div>
        <div className="card-body">
          <div className={styles.divbtn}>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered table-hover" style={{ minWidth: "850px" ,maxWidth:"100%"}}>
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
                      <td>
                        <div className={styles.customCell1}>
                         {booking.property.title}
                         </div>
                      </td>
                      <td>
                        <div className={styles.customCell2}>
                          {`${booking.property.address}, ${booking.property.city}`}
                        </div>
                        
                      </td>
                      <td>
                        <div className={styles.customCell3}>
                        <strong>{`${booking.user.name} ${booking.user.surname}`}</strong>
                        <br />
                        <small >{booking.user.email}</small>
                        <br />
                        <small> {booking.user.phoneNumber}</small>
                        </div>
                      </td>
                      {/* <td>{new Date(booking.bookingDate).toLocaleString()}</td> */}
                      <td>
                        {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
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
                        <div
                          className="d-flex justify-content-center align-content-center gap-1"
                        >
                          <a id={styles.link} onClick={(e) => {
                          e.preventDefault();
                          handleOpenBookingModal(booking);
                          }}>
                          <svg width="24px" height="24px" viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                          <title>View Details</title>
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                          <g id="SVGRepo_iconCarrier"><path d="M149.333333 85.333333h725.333334v853.333334H149.333333z" fill="#efefef"></path>
                          <path d="M277.333333 554.666667h85.333334v85.333333h-85.333334zM277.333333 384h85.333334v85.333333h-85.333334zM277.333333 725.333333h85.333334v85.333334h-85.333334zM277.333333 213.333333h85.333334v85.333334h-85.333334zM448 554.666667h298.666667v85.333333H448zM448 384h298.666667v85.333333H448zM448 725.333333h298.666667v85.333334H448zM448 213.333333h298.666667v85.333334H448z" fill="#efefef2196F3"></path>
                          </g>
                          </svg>
                          </a>

                          {booking.status === "Pending" && (
                          <a id={styles.link} onClick={(e) => {
                            e.preventDefault();
                            cancelBooking(booking.id);
                          }}>
                            <svg width="24px" height="24px" viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                            <title>Cancel</title>
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                            <path d="M512 128C300.8 128 128 300.8 128 512s172.8 384 384 384 384-172.8 384-384S723.2 128 512 128z m0 85.333333c66.133333 0 128 23.466667 179.2 59.733334L273.066667 691.2C236.8 640 213.333333 578.133333 213.333333 512c0-164.266667 134.4-298.666667 298.666667-298.666667z m0 597.333334c-66.133333 0-128-23.466667-179.2-59.733334l418.133333-418.133333C787.2 384 810.666667 445.866667 810.666667 512c0 164.266667-134.4 298.666667-298.666667 298.666667z" fill="#D50000"></path>
                            </g>
                            </svg>
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
          </div>
        </div>
      </div>
      <BookingDetailsModal show = {showBookingModal} handleClose={handleCloseBookingModal} booking={selectedBooking}/>
    </div>
  )
}

export default BookingsTable
