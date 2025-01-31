import { NavLink } from "react-router-dom";
import BookingsReportTable from "./BookingsReportTable";
import styles from "./DashboardCards.module.css";
import { useEffect, useState } from "react";
import { Booking } from "../../../context/types";
import axios from "axios";
import { VictoryPie } from "victory";
import API_BASE_URL from "../../common/utils/config";

const BookingsReportSection = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await axios.get(`${API_BASE_URL}/bookings`);
        setBookings(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBookings();
  }, []);

  const canceledBookings = bookings.filter(
    (booking) => booking.status === "Canceled"
  ).length;
  const pendingBookings = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;
  const finishedBookings = bookings.filter(
    (booking) => booking.status === "Finished"
  ).length;

  const data = [
    { x: "Canceled", y: canceledBookings },
    { x: "Pending", y: pendingBookings },
    { x: "Finished", y: finishedBookings },
  ];

  return (
    <>
      <div className="row flex-wrap py-3">
        <div className="col-lg-8 py-2">
          <div
            className="card border-0 p-4 mt-4 bg-white rounded-4 h-100"
            id={styles.cardShadow}
          >
            <h5 className={`pt-2 pb-3 ${styles.title}`}>Recent bookings</h5>
            <BookingsReportTable />
            <NavLink
              to={"/admin/bookings"}
              className="text-center text-decoration-none pb-2"
            >
              View all bookings
            </NavLink>
          </div>
        </div>
        <div className="col-lg-4 py-2">
          <div
            className="card border-0 p-4 mt-4 bg-white rounded-4 h-100"
            id={styles.cardShadow}
          >
            <h5 className={`pt-2 pb-3 ${styles.title}`}>Analytics</h5>
            <h6 className="text-muted text-center">Bookings Status Overview</h6>
            <VictoryPie
              height={350}
              width={470}
              data={data}
              colorScale={["#FF6F61", "#FFD700", "#4CAF50"]} // Original colors
              innerRadius={55}
              padAngle={1}
              labels={({ datum }) => `${datum.x}: ${datum.y}`}
              style={{
                labels: { fontSize: 13, fill: "#343a40" },
                data: {
                  fillOpacity: 0.9, // Default opacity
                  stroke: "#ffffff",
                  strokeWidth: 2,
                  transition: "fill-opacity 0.3s ease", // Smooth transition
                },
              }}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onMouseOver: () => {
                      return [
                        {
                          target: "data",
                          mutation: (props) => ({
                            style: {
                              ...props.style,
                              fillOpacity: 0.5, // Fade effect on hover
                            },
                          }),
                        },
                      ];
                    },
                    onMouseOut: () => {
                      return [
                        {
                          target: "data",
                          mutation: (props) => ({
                            style: {
                              ...props.style,
                              fillOpacity: 0.9, // Reset opacity after hover
                            },
                          }),
                        },
                      ];
                    },
                  },
                },
              ]}
            />
            <div className="legend mt-2">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center justify-content-between mb-2"
                >
                  <div className="d-flex align-items-center">
                    <span
                      style={{
                        display: "inline-block",
                        width: "12px",
                        height: "12px",
                        backgroundColor: ["#FF6F61", "#FFD700", "#4CAF50"][
                          index
                        ],
                        borderRadius: "50%",
                        marginRight: "8px",
                      }}
                    ></span>
                    <span>{item.x}</span>
                  </div>
                  <span>{((item.y / bookings.length) * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingsReportSection;
