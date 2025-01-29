// Reuse your existing Login component's styling and structure
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { Slide, toast, ToastContainer } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5075/api/forgot-password", { email });
      toast.success("Reset link sent to your email", {
        onClose: () => navigate("/login"),
      });

      setError("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error sending reset email");
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
          className="card p-4 mx-auto border-0 rounded-4 shadow"
          style={{ width: "500px" }}
        >
          <h3 className="text-center my-4 fw-bold" id={styles.title}>
            Forgot Password?
          </h3>
          {error && (
            <div className="text-danger mb-2 text-center ">{error}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label className="mb-2 fw-semibold">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="d-grid mb-2">
              <button type="submit" className={`btn btn-primary ${styles.btn}`}>
                Send Reset Link
              </button>
            </div>
            <p className="text-center">
              Remember your password?{" "}
              <Link to="/login" className={styles.signup}>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
