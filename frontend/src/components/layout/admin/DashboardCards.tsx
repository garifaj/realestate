import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./DashboardCards.module.css";
import {
  AdminBookingCardIcon,
  AdminMessagesCardIcon,
  AdminPropertyCardIcon,
  AdminUsersCardIcon,
} from "../../../constants/icons";
import API_BASE_URL from "../../common/utils/config";

const DashboardCards = () => {
  const [propertyCount, setPropertyCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [contactUsCount, setContactUsCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsResponse = await axios.get(`${API_BASE_URL}/bookings`);
        const propertiesResponse = await axios.get(
          `${API_BASE_URL}/properties`
        );
        const contactUsResponse = await axios.get(`${API_BASE_URL}/contactus`);
        const usersResponse = await axios.get(`${API_BASE_URL}/users`);

        setPropertyCount(propertiesResponse.data.length);
        setBookingCount(bookingsResponse.data.length);
        setContactUsCount(contactUsResponse.data.length);
        setUserCount(usersResponse.data.length);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  });

  return (
    <>
      <h3 className={`${styles.title} py-2`}>Dashboard</h3>
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-6 py-2">
          <div className="card rounded-4 border-0 py-1" id={styles.cardShadow}>
            <div className="card-body">
              <div className="d-flex flex-wrap align-items-center">
                <div className="col-3">
                  <AdminPropertyCardIcon />
                </div>
                <div className="col-8 ms-3">
                  <span>Property</span>
                  <h5>{propertyCount}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6 py-2">
          <div className="card rounded-4 border-0 py-1" id={styles.cardShadow}>
            <div className="card-body">
              <div className="d-flex flex-wrap align-items-center">
                <div className="col-3">
                  <AdminBookingCardIcon />
                </div>
                <div className="col-8 ms-3">
                  <span>Bookings</span>
                  <h5>{bookingCount}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6 py-2">
          <div className="card rounded-4 border-0  py-1" id={styles.cardShadow}>
            <div className="card-body">
              <div className="d-flex flex-wrap align-items-center">
                <div className="col-3">
                  <AdminMessagesCardIcon />
                </div>
                <div className="col-8 ms-3">
                  <span>Messages</span>
                  <h5>{contactUsCount}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6 py-2">
          <div className="card rounded-4 border-0 py-1" id={styles.cardShadow}>
            <div className="card-body">
              <div className="d-flex flex-wrap align-items-center">
                <div className="col-3">
                  <AdminUsersCardIcon />
                </div>
                <div className="col-8 ms-3">
                  <span>Users</span>
                  <h5>{userCount}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardCards;
