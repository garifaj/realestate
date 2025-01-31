import { useContext, useState } from "react";
import styles from "./Login.module.css";
import { UserContext } from "../../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import HideShowPasswordBtn from "./HideShowPasswordBtn";
import API_BASE_URL from "../utils/config";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showValidation, setShowValidation] = useState<boolean>(false); // New state for validation
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      // Prevent submission if form is invalid
      e.stopPropagation();
      setShowValidation(true); // Show validation if the form is invalid
    } else {
      try {
        const { data } = await axios.post(
          `${API_BASE_URL}/login`,
          { email, password },
          {
            withCredentials: true, // This sends cookies with the request
          }
        );
        setUser(data.user);

        navigate("/");
        setShowValidation(false);

        //Clear fields after submit
        setEmail("");
        setPassword(""); // Hide validation on successful login
      } catch (error: any) {
        // Extract and display the error message from the server response
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMessage(error.response.data.message); // Set error message to state
        } else {
          setErrorMessage("An unexpected error occurred"); // Fallback error message
        }
        setShowValidation(false); // Hide validation on error
      }
    }
  }

  return (
    <>
      <div className="container">
        <div className="d-flex mx-auto justify-content-center align-items-center vh-100">
          <div
            className="card p-4 mx-auto border-0 rounded-4 shadow"
            id={styles.loginCard}
          >
            <Link to="/" className="text-decoration-none" id={styles.title}>
              <h3 className="text-center my-4 fw-bold">Stated</h3>
            </Link>

            {errorMessage && (
              <div className="text-danger mb-2 text-center ">
                {errorMessage}
              </div>
            )}
            <form
              className={`needs-validation ${
                showValidation ? "was-validated" : ""
              }`}
              onSubmit={handleLoginSubmit}
              noValidate
            >
              <div className="form-group mb-3">
                <label
                  htmlFor="validationCustom02"
                  className="mb-2 fw-semibold"
                >
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="validationCustom02"
                  required
                />
                <div className="invalid-feedback">
                  Please provide a valid email address.
                </div>
              </div>
              <div className="form-group mb-3">
                <label
                  htmlFor="validationCustom03"
                  className="mb-2 fw-semibold"
                >
                  Password
                </label>
                <div className="position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control pe-5"
                    placeholder="Enter your password"
                  />
                  <HideShowPasswordBtn
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                  />
                </div>
                <div className="invalid-feedback">Password is required.</div>
                <div className="text-end mt-2">
                  <Link to="/forgot-password" className="text-decoration-none">
                    <p>Forgot Password?</p>
                  </Link>
                </div>
              </div>
              <div className="d-grid mb-2">
                <button
                  type="submit"
                  className={`btn btn-primary ${styles.btn}`}
                >
                  Login
                </button>
              </div>
              <p className="text-center">
                Don't have an account?{" "}
                <Link to={"/signup"} className={styles.signup}>
                  {" "}
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
