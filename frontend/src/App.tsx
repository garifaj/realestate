import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { UserContextProvider } from "./context/UserContext";
const HomePage = lazy(() => import("./components/layout/home/HomePage"));
const CreateUser = lazy(() => import("./pages/user/admin/CreateUser"));
const EditUser = lazy(() => import("./pages/user/admin/EditUser"));
const EditAgent = lazy(() => import("./pages/agent/admin/EditAgent"));
const CreateAgent = lazy(() => import("./pages/agent/admin/CreateAgent"));
const EditProperty = lazy(() => import("./pages/property/admin/EditProperty"));
const CreateProperty = lazy(
  () => import("./pages/property/admin/CreateProperty")
);
const AllProperties = lazy(() => import("./pages/property/home/AllProperties"));
const PropertyDetails = lazy(
  () => import("./pages/property/home/PropertyDetails")
);
const MyBookings = lazy(() => import("./pages/booking/home/MyBookings"));
const Login = lazy(() => import("./components/common/home/Login"));
const Signup = lazy(() => import("./components/common/home/Signup"));
const AdminDashboard = lazy(
  () => import("./components/layout/admin/AdminDashboard")
);
const UsersTable = lazy(() => import("./pages/user/admin/UsersTable"));
const AgentsTable = lazy(() => import("./pages/agent/admin/AgentsTable"));
const PropertiesTable = lazy(
  () => import("./pages/property/admin/PropertiesTable")
);
const BookingsTable = lazy(() => import("./pages/booking/admin/BookingsTable"));
const ContactUsTable = lazy(() => import("./pages/contact/ContactUsTable"));
const DashboardLayout = lazy(
  () => import("./components/layout/admin/DashboardLayout")
);

import ScrollToTop from "./components/common/home/ScrollToTop";
import { PulseLoader } from "react-spinners";
import PrivateRoute from "./components/common/utils/PrivateRoute";
import Unauthorized from "./components/common/utils/Unauthorized";
import ForgotPassword from "./components/common/home/ForgotPassword";
import ResetPassword from "./components/common/home/ResetPassword";

function App() {
  return (
    <UserContextProvider>
      <ScrollToTop />
      <Suspense
        fallback={
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <PulseLoader color="#000000" size={20} />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/allproperties" element={<AllProperties />} />
          <Route
            path="/property/details/:propertyid"
            element={<PropertyDetails />}
          />
          <Route path="/mybookings" element={<MyBookings />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route path="/admin" element={<PrivateRoute adminOnly={true} />}>
            <Route path="/admin" element={<AdminDashboard />}>
              <Route path="dashboard" element={<DashboardLayout />} />

              <Route path="users" element={<UsersTable />} />
              <Route path="users/edit/:userid" element={<EditUser />} />
              <Route path="users/create" element={<CreateUser />} />

              <Route path="agents" element={<AgentsTable />} />
              <Route path="agents/edit/:agentid" element={<EditAgent />} />
              <Route path="agents/create" element={<CreateAgent />} />

              <Route path="properties" element={<PropertiesTable />} />
              <Route
                path="properties/edit/:propertyid"
                element={<EditProperty />}
              />
              <Route path="properties/create" element={<CreateProperty />} />

              <Route path="bookings" element={<BookingsTable />} />

              <Route path="contactus" element={<ContactUsTable />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </UserContextProvider>
  );
}

export default App;
