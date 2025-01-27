import { NavLink, useNavigate } from "react-router-dom"
import styles from "./Sidebar.module.css"
import { useContext } from "react"
import { UserContext } from "../../../context/UserContext";
import axios from "axios";


const Sidebar = () => {
    const { setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await axios.post("http://localhost:5075/api/logout", {}, { withCredentials: true });
        navigate('/');// Redirect to homepage after logging out
        setUser(null); // Clear user data from context
      };
      
  return (
    <>
     <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" className="d-flex align-items-center pt-3 pb-4 mx-auto mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-4 fw-bold d-none d-sm-inline text-body-emphasis " id={styles.title}>Stated</span>
                </a>
                <ul className="nav nav-pills flex-column gap-2 mb-sm-auto mb-0 align-items-start align-items-sm-start w-100" id="menu">
                    <li className="w-100">
                        <NavLink to="/admin/dashboard" className={({ isActive }) => 
                            `d-flex align-items-center gap-3 nav-link ${isActive ? styles.active : styles.inactive}`
                        }>
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 12C13 11.4477 13.4477 11 14 11H19C19.5523 11 20 11.4477 20 12V19C20 19.5523 19.5523 20 19 20H14C13.4477 20 13 19.5523 13 19V12Z" stroke="#f69314" strokeWidth="2" strokeLinecap="round"></path> <path d="M4 5C4 4.44772 4.44772 4 5 4H9C9.55228 4 10 4.44772 10 5V12C10 12.5523 9.55228 13 9 13H5C4.44772 13 4 12.5523 4 12V5Z" stroke="#f69314" strokeWidth="2" strokeLinecap="round"></path> <path d="M4 17C4 16.4477 4.44772 16 5 16H9C9.55228 16 10 16.4477 10 17V19C10 19.5523 9.55228 20 9 20H5C4.44772 20 4 19.5523 4 19V17Z" stroke="#f69314" strokeWidth="2" strokeLinecap="round"></path> <path d="M13 5C13 4.44772 13.4477 4 14 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H14C13.4477 8 13 7.55228 13 7V5Z" stroke="#f69314" strokeWidth="2" strokeLinecap="round"></path> </g></svg>
                            <span className={`ms-1 d-none d-sm-inline`} id={styles.link}>Dashboard</span>
                        </NavLink>
                    </li>
                    <li className="w-100">
                        <NavLink to="/admin/properties" className={({ isActive }) =>
                            `d-flex align-items-center gap-3 nav-link ${isActive ? styles.active : styles.inactive}`
                        }>
                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 21V22C18.5523 22 19 21.5523 19 21H18ZM6 21H5C5 21.5523 5.44772 22 6 22V21ZM17.454 3.10899L17 4L17.454 3.10899ZM17.891 3.54601L17 4L17.891 3.54601ZM6.54601 3.10899L7 4L6.54601 3.10899ZM6.10899 3.54601L7 4L6.10899 3.54601ZM9 6C8.44772 6 8 6.44772 8 7C8 7.55228 8.44772 8 9 8V6ZM10 8C10.5523 8 11 7.55228 11 7C11 6.44772 10.5523 6 10 6V8ZM9 9C8.44772 9 8 9.44772 8 10C8 10.5523 8.44772 11 9 11V9ZM10 11C10.5523 11 11 10.5523 11 10C11 9.44772 10.5523 9 10 9V11ZM14 9C13.4477 9 13 9.44772 13 10C13 10.5523 13.4477 11 14 11V9ZM15 11C15.5523 11 16 10.5523 16 10C16 9.44772 15.5523 9 15 9V11ZM14 12C13.4477 12 13 12.4477 13 13C13 13.5523 13.4477 14 14 14V12ZM15 14C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12V14ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14V12ZM10 14C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12V14ZM14 6C13.4477 6 13 6.44772 13 7C13 7.55228 13.4477 8 14 8V6ZM15 8C15.5523 8 16 7.55228 16 7C16 6.44772 15.5523 6 15 6V8ZM7.6 4H16.4V2H7.6V4ZM17 4.6V21H19V4.6H17ZM18 20H6V22H18V20ZM7 21V4.6H5V21H7ZM16.4 4C16.6965 4 16.8588 4.00078 16.9754 4.0103C17.0803 4.01887 17.0575 4.0293 17 4L17.908 2.21799C17.6366 2.07969 17.3668 2.03562 17.1382 2.01695C16.9213 1.99922 16.6635 2 16.4 2V4ZM19 4.6C19 4.33647 19.0008 4.07869 18.9831 3.86177C18.9644 3.63318 18.9203 3.36344 18.782 3.09202L17 4C16.9707 3.94249 16.9811 3.91972 16.9897 4.02463C16.9992 4.14122 17 4.30347 17 4.6H19ZM17 4L18.782 3.09202C18.5903 2.7157 18.2843 2.40973 17.908 2.21799L17 4ZM7.6 2C7.33647 2 7.07869 1.99922 6.86177 2.01695C6.63318 2.03562 6.36344 2.07969 6.09202 2.21799L7 4C6.94249 4.0293 6.91972 4.01887 7.02463 4.0103C7.14122 4.00078 7.30347 4 7.6 4V2ZM7 4.6C7 4.30347 7.00078 4.14122 7.0103 4.02463C7.01887 3.91972 7.0293 3.94249 7 4L5.21799 3.09202C5.07969 3.36344 5.03562 3.63318 5.01695 3.86177C4.99922 4.07869 5 4.33647 5 4.6H7ZM6.09202 2.21799C5.71569 2.40973 5.40973 2.71569 5.21799 3.09202L7 4L6.09202 2.21799ZM9 8H10V6H9V8ZM9 11H10V9H9V11ZM14 11H15V9H14V11ZM14 14H15V12H14V14ZM9 14H10V12H9V14ZM14 8H15V6H14V8ZM13 18V21H15V18H13ZM11 21V18H9V21H11ZM12 17C12.5523 17 13 17.4477 13 18H15C15 16.3431 13.6569 15 12 15V17ZM12 15C10.3431 15 9 16.3431 9 18H11C11 17.4477 11.4477 17 12 17V15Z" fill="#f69314"></path> </g></svg>
                            <span className="s-1 d-none d-sm-inline" id={styles.link}>Property</span> 
                        </NavLink>
                    </li>
                    <li className="w-100">
                        <NavLink to="/admin/bookings" className={({ isActive }) =>
                            `d-flex align-items-center gap-3 nav-link ${isActive ? styles.active : styles.inactive}`
                        }>
                        <svg width="22px" height="22px" viewBox="0 0 1024.00 1024.00" fill="#f69314" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#f69314" strokeWidth="25"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M959.018 208.158c0.23-2.721 0.34-5.45 0.34-8.172 0-74.93-60.96-135.89-135.89-135.89-1.54 0-3.036 0.06-6.522 0.213l-611.757-0.043c-1.768-0.085-3.563-0.17-5.424-0.17-74.812 0-135.67 60.84-135.67 135.712l0.188 10.952h-0.306l0.391 594.972-0.162 20.382c0 74.03 60.22 134.25 134.24 134.25 1.668 0 7.007-0.239 7.1-0.239l608.934 0.085c2.985 0.357 6.216 0.468 9.55 0.468 35.815 0 69.514-13.954 94.879-39.302 25.373-25.34 39.344-58.987 39.344-94.794l-0.145-12.015h0.918l-0.008-606.41z m-757.655 693.82l-2.585-0.203c-42.524 0-76.146-34.863-76.537-79.309V332.671H900.79l0.46 485.186-0.885 2.865c-0.535 1.837-0.8 3.58-0.8 5.17 0 40.382-31.555 73.766-71.852 76.002l-10.816 0.621v-0.527l-615.533-0.01zM900.78 274.424H122.3l-0.375-65.934 0.85-2.924c0.52-1.82 0.782-3.63 0.782-5.247 0-42.236 34.727-76.665 78.179-76.809l0.45-0.068 618.177 0.018 2.662 0.203c42.329 0 76.767 34.439 76.767 76.768 0 1.326 0.196 2.687 0.655 4.532l0.332 0.884v68.577z" fill=""></path><path d="M697.67 471.435c-7.882 0-15.314 3.078-20.918 8.682l-223.43 223.439L346.599 596.84c-5.544-5.603-12.95-8.69-20.842-8.69s-15.323 3.078-20.918 8.665c-5.578 5.518-8.674 12.9-8.7 20.79-0.017 7.908 3.07 15.357 8.69 20.994l127.55 127.558c5.57 5.56 13.01 8.622 20.943 8.622 7.925 0 15.364-3.06 20.934-8.63l244.247-244.247c5.578-5.511 8.674-12.883 8.7-20.783 0.017-7.942-3.079-15.408-8.682-20.986-5.552-5.612-12.958-8.698-20.85-8.698z" fill=""></path></g></svg>                            
                            <span className="ms-1 d-none d-sm-inline" id={styles.link}>Booking</span>
                        </NavLink>
                    </li>
                    <li className="w-100">
                        <NavLink to="/admin/users" className={({ isActive }) =>
                            `d-flex align-items-center gap-3 nav-link ${isActive ? styles.active : styles.inactive}`
                        }>
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 20V18C13 15.2386 10.7614 13 8 13C5.23858 13 3 15.2386 3 18V20H13ZM13 20H21V19C21 16.0545 18.7614 14 16 14C14.5867 14 13.3103 14.6255 12.4009 15.6311M11 7C11 8.65685 9.65685 10 8 10C6.34315 10 5 8.65685 5 7C5 5.34315 6.34315 4 8 4C9.65685 4 11 5.34315 11 7ZM18 9C18 10.1046 17.1046 11 16 11C14.8954 11 14 10.1046 14 9C14 7.89543 14.8954 7 16 7C17.1046 7 18 7.89543 18 9Z" stroke="#f69314" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg> 
                            <span className="ms-1 d-none d-sm-inline" id={styles.link}>Users</span>
                        </NavLink>
                    </li>
                    <li className="w-100">
                        <NavLink to="/admin/agents" className={({ isActive }) =>
                            `d-flex align-items-center gap-3 nav-link ${isActive ? styles.active : styles.inactive}`
                        }>
                            <svg width="24px" height="24px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#f69314"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#f69314" d="M512,512l-512,0c0,-108.606 2.909,-138.303 8.727,-153.819c2.909,-4.121 7.091,-8.181 12.546,-12.181c5.454,-4 12.606,-7.94 21.454,-11.819c8.849,-3.878 16.909,-7.212 24.182,-10c7.273,-2.787 17.212,-6.484 29.818,-11.09c12.606,-4.607 22.546,-8.243 29.818,-10.91c6.303,-2.424 12.425,-5.212 18.364,-8.363c5.939,-3.152 9.758,-5.091 11.455,-5.818c1.697,2.181 3.272,13.515 4.727,34c1.454,20.484 3.515,43.818 6.182,70c2.666,26.181 5.939,45.818 9.818,58.909c1.697,5.818 5.273,10.363 10.727,13.636c5.455,3.273 10.606,5.515 15.455,6.727c4.848,1.212 7.394,2.182 7.636,2.909c0.243,-0.969 2.727,-12.969 7.455,-36c4.727,-23.03 9.151,-43.393 13.272,-61.09c1.775,-7.621 3.37,-15.905 4.785,-23.255c1.421,-7.379 2.66,-13.817 3.718,-17.697l-32.139,-32.139l48,-32l48,32l-31.955,31.955c6.302,16.342 16.024,63.881 29.165,128.142c0.679,3.318 1.366,6.68 2.063,10.084c0.242,-0.727 2.788,-1.697 7.636,-2.909c4.849,-1.212 10,-3.454 15.455,-6.727c5.454,-3.273 9.03,-7.818 10.727,-13.636c3.879,-13.091 6.97,-32.728 9.273,-58.909c2.303,-26.182 4,-49.516 5.091,-70c1.09,-20.485 2.484,-31.819 4.181,-34c1.697,0.727 5.516,2.666 11.455,5.818c5.939,3.151 12.061,5.939 18.364,8.363c7.272,2.667 17.212,6.303 29.818,10.91c12.606,4.606 22.545,8.303 29.818,11.09c7.273,2.788 15.333,6.122 24.182,10c8.848,3.879 16,7.819 21.454,11.819c5.455,4 9.637,8.06 12.546,12.181c3.151,9.697 5.394,36.364 6.727,80c0.47,15.374 0.857,25.707 1.161,33.831l0,0.002c0.558,14.906 0.838,22.373 0.839,39.986Zm-256,-256c-70.692,0 -128,-57.308 -128,-128c0,-70.692 57.308,-128 128,-128c70.692,0 128,57.308 128,128c0,70.692 -57.308,128 -128,128Zm108.8,-127.2c-10.4,2.133 -25.267,1.133 -44.6,-3c-19.333,-4.134 -35.667,-9 -49,-14.6c-9.067,-4 -17.733,-8.6 -26,-13.8c-8.267,-5.2 -17.733,-11.734 -28.4,-19.6c-10.667,-7.867 -18.933,-13.667 -24.8,-17.4c4.267,31.733 -10.667,54.4 -44.8,68c0.267,30.133 11,55.733 32.2,76.8c21.2,21.066 46.733,31.6 76.6,31.6c29.867,0 55.4,-10.534 76.6,-31.6c21.2,-21.067 31.933,-46.533 32.2,-76.4Z"></path></g></svg> 
                            <span className="ms-1 d-none d-sm-inline" id={styles.link}>Agents</span> 
                        </NavLink>
                    </li>
                    <li className="w-100 border-bottom pb-3">
                        <NavLink to="/admin/contactus" className={({ isActive }) =>
                            `d-flex align-items-center gap-3 nav-link ${isActive ? styles.active : styles.inactive}`
                        }>
                        <svg fill="#f69314" version="1.1" id="XMLID_276_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink={"http://www.w3.org/1999/xlink"} viewBox="0 0 24 24" xmlSpace="preserve" width="24px" height="24px"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="contact-us"> <g> <path d="M4,24v-5H0V0h23v19h-9.3L4,24z M2,17h4v3.7l7.3-3.7H21V2H2V17z"></path> </g> <g> <rect x="5" y="8" width="3" height="3"></rect> </g> <g> <rect x="10" y="8" width="3" height="3"></rect> </g> <g> <rect x="15" y="8" width="3" height="3"></rect> </g> </g> </g></svg>
                            <span className="ms-1 d-none d-sm-inline" id={styles.link}>Contact us</span> 
                        </NavLink>
                    </li>
                </ul>
                <button onClick={handleLogout} className="d-flex align-items-center gap-3 nav-link py-4" >
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 12H19M19 12L16 15M19 12L16 9" stroke="#f69314" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M19 6V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V18" stroke="#f69314" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            <span className="ms-1 d-none d-sm-inline" id={styles.link}>Sign out</span> 
                        </button>
            </div>
    </>
  )
}

export default Sidebar
