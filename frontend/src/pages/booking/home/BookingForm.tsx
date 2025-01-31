import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";
import API_BASE_URL from "../../../components/common/utils/config";

const BookingForm: React.FC = () => {
  const { user } = useContext(UserContext);
  const { propertyid } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedDate) {
      // Format the date to YYYY-MM-DD in the local timezone
      const formattedDate = selectedDate.toLocaleDateString("en-CA"); // "en-CA" produces "YYYY-MM-DD" format

      axios
        .get(`${API_BASE_URL}/bookings/${propertyid}/available-timeslots`, {
          params: { selectedDate: formattedDate },
        })
        .then((response) => {
          // Convert UTC times to local times
          const localTimes = response.data.map((utcTime: string) => {
            const localTime = new Date(utcTime);
            return localTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
          });

          setAvailableTimes(localTimes);
          setSelectedTime(null); // Reset the time when the date changes
        })
        .catch((error) => {
          console.error("Error fetching available times:", error);
          setAvailableTimes([]); // Set to empty array if there's an error
        });
    }
  }, [selectedDate, propertyid]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedDate || !selectedTime) {
      setError("Please select a date and time.");
      return;
    }

    const bookingDate = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(":").map(Number);
    bookingDate.setHours(hours, minutes);

    // Convert to UTC
    const bookingDateUTC = new Date(
      Date.UTC(
        bookingDate.getFullYear(),
        bookingDate.getMonth(),
        bookingDate.getDate(),
        bookingDate.getHours(),
        bookingDate.getMinutes()
      )
    );

    try {
      await axios.post(`${API_BASE_URL}/bookings`, {
        propertyId: propertyid,
        userId: user?.id,
        bookingDate: bookingDateUTC.toISOString(),
        status: "Pending",
      });
      toast.success("Booking made successfully!", {
        onClose: () => navigate("/mybookings"),
      });
    } catch (error) {
      setError("Booking failed. Please try again.");
      console.error("Error making booking:", error);
      toast.error("Booking failed. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={800}
        hideProgressBar={false}
        pauseOnHover={false}
        theme="light"
        transition={Slide}
      />
      <div className="card shadow py-4 px-4 mt-5 mb-5 rounded-5 ">
        <h4
          className="text-center mb-3"
          style={{
            fontFamily: "thermal-variable, sans-serif",
            fontVariationSettings: '"wght" 700, "opsz" 500',
          }}
        >
          Request a tour
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between mb-3">
            <div className="d-flex flex-column me-2 w-50">
              <label className="form-label">Select Date</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date || null);
                  if (!date) {
                    setSelectedTime(null);
                    setAvailableTimes([]);
                  }
                }}
                minDate={new Date()}
                maxDate={
                  new Date(new Date().setDate(new Date().getDate() + 14))
                }
                dateFormat="yyyy-MM-dd"
                className="form-control"
                placeholderText="Select a date"
                isClearable={true}
                filterDate={(date) =>
                  date.getDay() !== 0 && date.getDay() !== 6
                }
                required
                disabled={!user}
              />
            </div>

            <div className="d-flex flex-column w-50">
              <label htmlFor="time" className="form-label">
                Select Time
              </label>
              <select
                id="time"
                className="form-select"
                value={selectedTime || ""}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
                disabled={!user}
              >
                <option value="" disabled>
                  Select a time
                </option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {!user && (
            <div className="text-start ms-3 fs-6 mb-2">
              Do you want to request a tour?{" "}
              <Link
                to={"/login"}
                style={{ textDecoration: "none", color: "#009dff" }}
              >
                Login
              </Link>
            </div>
          )}
          {error && <div className="text-danger mb-2 text-center">{error}</div>}
          <button
            type="submit"
            className="btn btn-primary w-100 rounded-5 mt-2"
            disabled={!user}
            style={{
              backgroundColor: "#f69314",
              borderColor: "#f69314",
              fontWeight: "600",
            }}
          >
            Request a tour
          </button>
        </form>
      </div>
    </>
  );
};

export default BookingForm;
