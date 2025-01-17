import axios from "axios";
import { useEffect, useState } from "react"


const DashboardCards = () => {
    const [propertyCount, setPropertyCount] = useState(0);
    const [bookingCount, setBookingCount] = useState(0);
    const [contactUsCount, setContactUsCount] = useState(0);
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookingsResponse = await axios.get("http://localhost:5075/api/bookings");
                const propertiesResponse = await axios.get("http://localhost:5075/api/properties");
                const contactUsResponse = await axios.get("http://localhost:5075/api/contactus");
                const usersResponse = await axios.get("http://localhost:5075/api/users");

                setPropertyCount(propertiesResponse.data.length);
                setBookingCount(bookingsResponse.data.length);
                setContactUsCount(contactUsResponse.data.length);
                setUserCount(usersResponse.data.length);
            } catch (error) {
                console.error(error);   
                
            }
        }
        fetchData();
    })

  return (
    <>
    <div className="container-fluid">
        <h3 className="py-2">Dashboard</h3>
        <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 py-2">
                <div className="card rounded-4 border-0 shadow py-1">
                    <div className="card-body">
                    <div className="d-flex flex-wrap align-items-center">
                        <div className="col-3">
                            <svg width="64px" height="64px" viewBox="-4.8 -4.8 33.60 33.60" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(0,0), scale(1)"><rect x="-4.8" y="-4.8" width="33.60" height="33.60" rx="6.72" fill="#976bff" strokeWidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 21V22C18.5523 22 19 21.5523 19 21H18ZM6 21H5C5 21.5523 5.44772 22 6 22V21ZM17.454 3.10899L17 4L17.454 3.10899ZM17.891 3.54601L17 4L17.891 3.54601ZM6.54601 3.10899L7 4L6.54601 3.10899ZM6.10899 3.54601L7 4L6.10899 3.54601ZM9 6C8.44772 6 8 6.44772 8 7C8 7.55228 8.44772 8 9 8V6ZM10 8C10.5523 8 11 7.55228 11 7C11 6.44772 10.5523 6 10 6V8ZM9 9C8.44772 9 8 9.44772 8 10C8 10.5523 8.44772 11 9 11V9ZM10 11C10.5523 11 11 10.5523 11 10C11 9.44772 10.5523 9 10 9V11ZM14 9C13.4477 9 13 9.44772 13 10C13 10.5523 13.4477 11 14 11V9ZM15 11C15.5523 11 16 10.5523 16 10C16 9.44772 15.5523 9 15 9V11ZM14 12C13.4477 12 13 12.4477 13 13C13 13.5523 13.4477 14 14 14V12ZM15 14C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12V14ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14V12ZM10 14C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12V14ZM14 6C13.4477 6 13 6.44772 13 7C13 7.55228 13.4477 8 14 8V6ZM15 8C15.5523 8 16 7.55228 16 7C16 6.44772 15.5523 6 15 6V8ZM7.6 4H16.4V2H7.6V4ZM17 4.6V21H19V4.6H17ZM18 20H6V22H18V20ZM7 21V4.6H5V21H7ZM16.4 4C16.6965 4 16.8588 4.00078 16.9754 4.0103C17.0803 4.01887 17.0575 4.0293 17 4L17.908 2.21799C17.6366 2.07969 17.3668 2.03562 17.1382 2.01695C16.9213 1.99922 16.6635 2 16.4 2V4ZM19 4.6C19 4.33647 19.0008 4.07869 18.9831 3.86177C18.9644 3.63318 18.9203 3.36344 18.782 3.09202L17 4C16.9707 3.94249 16.9811 3.91972 16.9897 4.02463C16.9992 4.14122 17 4.30347 17 4.6H19ZM17 4L18.782 3.09202C18.5903 2.7157 18.2843 2.40973 17.908 2.21799L17 4ZM7.6 2C7.33647 2 7.07869 1.99922 6.86177 2.01695C6.63318 2.03562 6.36344 2.07969 6.09202 2.21799L7 4C6.94249 4.0293 6.91972 4.01887 7.02463 4.0103C7.14122 4.00078 7.30347 4 7.6 4V2ZM7 4.6C7 4.30347 7.00078 4.14122 7.0103 4.02463C7.01887 3.91972 7.0293 3.94249 7 4L5.21799 3.09202C5.07969 3.36344 5.03562 3.63318 5.01695 3.86177C4.99922 4.07869 5 4.33647 5 4.6H7ZM6.09202 2.21799C5.71569 2.40973 5.40973 2.71569 5.21799 3.09202L7 4L6.09202 2.21799ZM9 8H10V6H9V8ZM9 11H10V9H9V11ZM14 11H15V9H14V11ZM14 14H15V12H14V14ZM9 14H10V12H9V14ZM14 8H15V6H14V8ZM13 18V21H15V18H13ZM11 21V18H9V21H11ZM12 17C12.5523 17 13 17.4477 13 18H15C15 16.3431 13.6569 15 12 15V17ZM12 15C10.3431 15 9 16.3431 9 18H11C11 17.4477 11.4477 17 12 17V15Z" fill="#000000"></path> </g></svg>
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
                <div className="card rounded-4 border-0 shadow  py-1">
                    <div className="card-body">
                    <div className="d-flex flex-wrap align-items-center">
                        <div className="col-3">
                            <svg version="1.1" id="CHECKLIST" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="-540 -540 2880.00 2880.00" enable-background="new 0 0 1800 1800" xmlSpace="preserve" fill="#000000" stroke="#000000" stroke-width="45"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-540" y="-540" width="2880.00" height="2880.00" rx="576" fill="#54e881" strokeWidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="#000000" d="M1506.693,279.092h-150.36v-85.277c0-17.353-14.065-31.418-31.419-31.418h-227.317 C1078.205,70.574,996.5,2.304,900.003,2.304c-96.499,0-178.202,68.27-197.595,160.092H475.091 c-17.353,0-31.419,14.065-31.419,31.418v85.277H293.307c-17.353,0-31.419,14.066-31.419,31.419v1455.764 c0,17.353,14.066,31.419,31.419,31.419h1213.386c17.354,0,31.42-14.066,31.42-31.419V310.511 C1538.113,293.158,1524.047,279.092,1506.693,279.092z M506.511,225.234h223.28c16.617,0,30.354-12.935,31.362-29.517 c4.436-73.219,65.424-130.574,138.85-130.574c73.425,0,134.413,57.355,138.849,130.574c1.009,16.582,14.746,29.517,31.363,29.517 h223.28v53.858v62.838v74.81H506.511v-74.81v-62.838V225.234z M1475.274,1734.855H324.728V341.93h118.944v106.229 c0,17.354,14.066,31.419,31.419,31.419h849.823c17.354,0,31.419-14.066,31.419-31.419V341.93h118.941V1734.855z"></path> <path fill="#000000" d="M663.633,684.019L534.366,813.291l-57.803-57.806c-12.272-12.265-32.164-12.265-44.437,0 c-12.269,12.272-12.269,32.164,0,44.437l80.021,80.022c6.136,6.132,14.176,9.201,22.219,9.201c8.043,0,16.083-3.069,22.219-9.201 l151.486-151.486c12.269-12.273,12.269-32.165,0-44.438C695.799,671.755,675.907,671.755,663.633,684.019z"></path> <path fill="#000000" d="M824.996,750.563c-17.354,0-31.419,14.066-31.419,31.419c0,17.354,14.066,31.419,31.419,31.419h520.665 c17.354,0,31.419-14.066,31.419-31.419c0-17.353-14.065-31.419-31.419-31.419H824.996z"></path> <path fill="#000000" d="M663.633,1039.925l-129.267,129.272l-57.803-57.807c-12.272-12.265-32.164-12.265-44.437,0 c-12.269,12.272-12.269,32.164,0,44.438l80.021,80.021c6.136,6.133,14.176,9.2,22.219,9.2c8.043,0,16.083-3.067,22.219-9.2 l151.486-151.486c12.269-12.272,12.269-32.163,0-44.438C695.799,1027.66,675.907,1027.66,663.633,1039.925z"></path> <path fill="#000000" d="M1345.661,1106.467H824.996c-17.354,0-31.419,14.066-31.419,31.42s14.066,31.42,31.419,31.42h520.665 c17.354,0,31.419-14.066,31.419-31.42S1363.015,1106.467,1345.661,1106.467z"></path> <path fill="#000000" d="M663.633,1395.83l-129.267,129.272l-57.803-57.808c-12.272-12.264-32.164-12.264-44.437,0 c-12.269,12.274-12.269,32.166,0,44.439l80.021,80.021c6.136,6.132,14.176,9.199,22.219,9.199c8.043,0,16.083-3.067,22.219-9.199 l151.486-151.486c12.269-12.274,12.269-32.166,0-44.438C695.799,1383.566,675.907,1383.566,663.633,1395.83z"></path> <path fill="#000000" d="M1345.661,1462.373H824.996c-17.354,0-31.419,14.066-31.419,31.42s14.066,31.418,31.419,31.418h520.665 c17.354,0,31.419-14.064,31.419-31.418S1363.015,1462.373,1345.661,1462.373z"></path> </g> </g></svg>
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
                <div className="card rounded-4 border-0 shadow  py-1">
                    <div className="card-body">
                    <div className="d-flex flex-wrap align-items-center">
                        <div className="col-3">
                        <svg fill="#000000" version="1.1" id="XMLID_276_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink={"http://www.w3.org/1999/xlink"} viewBox="-9.6 -9.6 43.20 43.20" xmlSpace="preserve" width="64px" height="64px"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(0,0), scale(1)"><rect x="-9.6" y="-9.6" width="43.20" height="43.20" rx="8.64" fill="#7ed0ec" strokeWidth={0}></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.048"></g><g id="SVGRepo_iconCarrier"> <g id="contact-us"> <g> <path d="M4,24v-5H0V0h23v19h-9.3L4,24z M2,17h4v3.7l7.3-3.7H21V2H2V17z"></path> </g> <g> <rect x="5" y="8" width="3" height="3"></rect> </g> <g> <rect x="10" y="8" width="3" height="3"></rect> </g> <g> <rect x="15" y="8" width="3" height="3"></rect> </g> </g> </g></svg>
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
                <div className="card rounded-4 border-0 shadow  py-1">
                    <div className="card-body">
                    <div className="d-flex flex-wrap align-items-center">
                        <div className="col-3">
                        <svg width="64px" height="64px" viewBox="-4.8 -4.8 33.60 33.60" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-4.8" y="-4.8" width="33.60" height="33.60" rx="6.72" fill="#3874ff" strokeWidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 20V18C13 15.2386 10.7614 13 8 13C5.23858 13 3 15.2386 3 18V20H13ZM13 20H21V19C21 16.0545 18.7614 14 16 14C14.5867 14 13.3103 14.6255 12.4009 15.6311M11 7C11 8.65685 9.65685 10 8 10C6.34315 10 5 8.65685 5 7C5 5.34315 6.34315 4 8 4C9.65685 4 11 5.34315 11 7ZM18 9C18 10.1046 17.1046 11 16 11C14.8954 11 14 10.1046 14 9C14 7.89543 14.8954 7 16 7C17.1046 7 18 7.89543 18 9Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
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
    </div>
      
    </>
  )
}

export default DashboardCards
