import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import { useParams } from "react-router-dom";
import LoginModal from "../../../components/common/home/LoginModal";
import SignupModal from "../../../components/common/home/SignupModal";



const BookingForm: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const {user} = useContext(UserContext);
  const {propertyid} = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const handleOpenLogin = () => {
    setShowSignup(false);
    setShowLogin(true);

  }
  const handleCloseLogin = () => setShowLogin(false);

  const handleSignupShow = () => {
    setShowLogin(false); // Close login modal when signup is opened
    setShowSignup(true);
  };
  const handleCloseSignup = () => setShowSignup(false);

  useEffect(() => {
    if (selectedDate) {
      // Format the date to YYYY-MM-DD in the local timezone
      const formattedDate = selectedDate
        .toLocaleDateString("en-CA"); // "en-CA" produces "YYYY-MM-DD" format
  
      axios
        .get(`http://localhost:5075/api/bookings/${propertyid}/available-timeslots`, {
          params: { selectedDate: formattedDate },
        })
        .then((response) => {
          // Convert UTC times to local times
          const localTimes = response.data.map((utcTime: string) => {
            const localTime = new Date(utcTime);
            return localTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
      await axios.post("http://localhost:5075/api/bookings", {
        propertyId: propertyid,
        userId: user?.id,
        bookingDate: bookingDateUTC.toISOString(),
        status: "Pending",
      });
      alert("Booking made successfully!");
      window.location.reload();
    } catch (error) {
      setError("Booking failed. Please try again.");
    }
  };
  

  return (
    <>
    <div className="card shadow py-4 px-4 mt-5 mb-5 rounded-5 ">
      <h4 className="text-center mb-3">Request a tour</h4>
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between mb-3">
          <div className="d-flex flex-column me-2 w-50">
            <label className="form-label">Select Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date || null);
                if(!date) {
                  setSelectedTime(null);
                  setAvailableTimes([]);
                }
              }}
              minDate={new Date()}
              maxDate={new Date(new Date().setDate(new Date().getDate() + 14))}
              dateFormat="yyyy-MM-dd"
              className="form-control"
              placeholderText="Select a date"
              isClearable={true}
              filterDate={(date) => date.getDay() !== 0 && date.getDay() !== 6}
              required
              disabled={!user}
            />
          </div>

          <div className="d-flex flex-column w-50">
            <label htmlFor="time" className="form-label">Select Time</label>
            <select
              id="time"
              className="form-select"
              value={selectedTime || ""}
              onChange={(e) => setSelectedTime(e.target.value)}
              required
              disabled={!user}
            >
              <option value="" disabled>Select a time</option>
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
            <a
              onClick={handleOpenLogin}
              style={{ textDecoration: "none", color: "#009dff" }}
            >
              Login
            </a>
          </div>
          )}
        {error && <div className="text-danger mb-2 text-center">{error}</div>}       
        <button type="submit" className="btn btn-primary w-100 rounded-5 mt-2" 
        disabled={!user} 
        style={{backgroundColor:"#f69314", borderColor:"#f69314",fontWeight:"600"}}>
          Request a tour
        </button>
      </form>
    </div>
     <LoginModal show={showLogin} handleClose={handleCloseLogin} handleSignupShow={handleSignupShow}/>
     <SignupModal show={showSignup} handleClose={handleCloseSignup} handleLogin={handleOpenLogin} />
    </>
    
  );
};

export default BookingForm;
