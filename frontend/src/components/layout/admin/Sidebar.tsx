import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import {
  AdminDashboardIcon,
  AgentIcon,
  BookingIcon,
  ContactUsIcon,
  LogoutIcon,
  PropertyIcon,
  UserIcon,
} from "../../../constants/icons";
import API_BASE_URL from "../../common/utils/config";

const Sidebar = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
    navigate("/"); // Redirect to homepage after logging out
    setUser(null); // Clear user data from context
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <a
          href="/"
          className="d-flex align-items-center pt-3 pb-4 mx-auto mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span
            className="fs-4 fw-bold d-none d-sm-inline text-body-emphasis "
            id={styles.title}
          >
            Stated
          </span>
        </a>
        <ul
          className="nav nav-pills flex-column gap-2 mb-sm-auto mb-0 align-items-start align-items-sm-start w-100"
          id="menu"
        >
          <li className="w-100">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `d-flex align-items-center gap-3 nav-link ${
                  isActive ? styles.active : styles.inactive
                }`
              }
            >
              <AdminDashboardIcon />
              <span className={`ms-1 d-none d-sm-inline`} id={styles.link}>
                Dashboard
              </span>
            </NavLink>
          </li>
          <li className="w-100">
            <NavLink
              to="/admin/properties"
              className={({ isActive }) =>
                `d-flex align-items-center gap-3 nav-link ${
                  isActive ? styles.active : styles.inactive
                }`
              }
            >
              <PropertyIcon />
              <span className="s-1 d-none d-sm-inline" id={styles.link}>
                Property
              </span>
            </NavLink>
          </li>
          <li className="w-100">
            <NavLink
              to="/admin/bookings"
              className={({ isActive }) =>
                `d-flex align-items-center gap-3 nav-link ${
                  isActive ? styles.active : styles.inactive
                }`
              }
            >
              <BookingIcon />
              <span className="ms-1 d-none d-sm-inline" id={styles.link}>
                Booking
              </span>
            </NavLink>
          </li>
          <li className="w-100">
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `d-flex align-items-center gap-3 nav-link ${
                  isActive ? styles.active : styles.inactive
                }`
              }
            >
              <UserIcon />
              <span className="ms-1 d-none d-sm-inline" id={styles.link}>
                Users
              </span>
            </NavLink>
          </li>
          <li className="w-100">
            <NavLink
              to="/admin/agents"
              className={({ isActive }) =>
                `d-flex align-items-center gap-3 nav-link ${
                  isActive ? styles.active : styles.inactive
                }`
              }
            >
              <AgentIcon />
              <span className="ms-1 d-none d-sm-inline" id={styles.link}>
                Agents
              </span>
            </NavLink>
          </li>
          <li className="w-100 border-bottom pb-3">
            <NavLink
              to="/admin/contactus"
              className={({ isActive }) =>
                `d-flex align-items-center gap-3 nav-link ${
                  isActive ? styles.active : styles.inactive
                }`
              }
            >
              <ContactUsIcon />
              <span className="ms-1 d-none d-sm-inline" id={styles.link}>
                Contact us
              </span>
            </NavLink>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="d-flex align-items-center gap-3 nav-link py-4"
        >
          <LogoutIcon />
          <span className="ms-1 d-none d-sm-inline" id={styles.link}>
            Sign out
          </span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
