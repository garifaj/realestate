import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { PulseLoader } from "react-spinners";

type PrivateRouteProps = {
  adminOnly?: boolean;
};

const PrivateRoute = ({ adminOnly }: PrivateRouteProps) => {
  const { user, ready } = useContext(UserContext);

  // Wait until the user data is ready
  if (!ready) {
    // Show a loading placeholder while fetching user data
    return (
    <div className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
      <PulseLoader color="#000000" size={20}  />
    </div>
    );
  }

  // Redirect to login if user is not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Redirect to unauthorized if admin access is required and the user is not an admin
  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/unauthorized" />;
  }

  // Allow access if all conditions are met
  return <Outlet />;
};

export default PrivateRoute;
