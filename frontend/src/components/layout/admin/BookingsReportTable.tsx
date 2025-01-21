import { useEffect, useState } from "react";
import { Booking } from "../../../context/types";
import axios from "axios";


const BookingsReportTable = () => {
    const [bookings, setBookings] = useState<Booking[]>([])

    useEffect(() => {
        async function fetchBookings() {
            try {
                const response = await axios.get("http://localhost:5075/api/bookings");
                setBookings(response.data.slice(-4)); 
            } catch (error) {
                console.error(error)
            }
        }

        fetchBookings();
    }, [])
  return (
    <>
    <div className="table-responsive pt-3 pb-1">
        <table className="table" style={{ minWidth: "550px" ,maxWidth:"100%"}}>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Property title</th>
                    <th>User info</th>
                    <th>Agent info</th>
                    <th>Booking date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {bookings.length === 0 ? (
                    <tr>
                    <td
                      colSpan={6}
                      style={{ textAlign: "center", fontSize: "25px" }}
                    >
                      No bookings found!
                    </td>
                  </tr>
                ) : (
                    bookings.map((booking) => (
                    <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td style={{maxWidth: "10rem"}}>
                            <div style={{maxWidth: "100%",
                            wordWrap: "break-word",
                            overflowWrap: "break-word",
                            whiteSpace: "normal",
                            lineHeight: "1.2rem",
                            maxHeight: "3.6rem", // 3 lines * line height
                            overflow: "hidden", 
                            textOverflow: "ellipsis"}}>
                            {booking.property.title}
                            </div>
                        </td>
                        <td>
                        <strong>{`${booking.user.name} ${booking.user.surname}`}</strong>
                        <br />
                        <small >{booking.user.email}</small>
                        <br />
                        <small> {booking.user.phoneNumber}</small></td>
                        <td>
                        {booking.property.agent
                          ? `${booking.property.agent.name} ${booking.property.agent.surname}`
                          : "Unassigned"}
                        </td>
                        <td>{new Date(booking.bookingDate).toLocaleString()}</td>
                        <td><span
                        className={`badge ${
                            booking.status === "Finished"
                            ? "bg-success"
                            : booking.status === "Pending"
                            ? "bg-warning"
                            : "bg-danger"
                        }`}
                        >
                        {booking.status}
                        </span></td>
                    </tr>
                    ))
                )}
                
            </tbody>
        </table>
    </div>
      
    </>
  )
}

export default BookingsReportTable
