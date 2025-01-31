import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";
import { Slide, toast, ToastContainer } from "react-toastify";
import HideShowPasswordBtn from "./HideShowPasswordBtn";
import API_BASE_URL from "../utils/config";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/reset-password`, {
        token, // Send the decoded token
        newPassword,
      });
      toast.success("Password reset successful", {
        onClose: () => navigate("/login"),
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="container">
      <ToastContainer
        position="top-center"
        autoClose={800}
        hideProgressBar={false}
        pauseOnHover={false}
        theme="light"
        transition={Slide}
      />
      <div className="d-flex mx-auto justify-content-center align-items-center vh-100">
        <div
          className="card p-4 mx-auto border-0 rounded-4 shadow ${styles.loginCard}"
          style={{ width: "500px" }}
        >
          <h3 className="text-center my-4 fw-bold" id={styles.title}>
            Reset Password
          </h3>
          {error && <div className="text-danger mb-2 text-center">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label className="mb-2 fw-semibold">New Password</label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-control pe-5"
                  placeholder="Enter your password"
                />
                <HideShowPasswordBtn
                  showPassword={showPassword}
                  togglePasswordVisibility={togglePasswordVisibility}
                />
              </div>
            </div>
            <div className="d-grid mb-2">
              <button type="submit" className={`btn btn-primary ${styles.btn}`}>
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
