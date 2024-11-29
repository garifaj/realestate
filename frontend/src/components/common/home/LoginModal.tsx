import { useContext, useState } from "react";
import styles from "./LoginModal.module.css";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type LoginModalProps = {
  show: boolean;
  handleClose: () => void;
  handleSignupShow: () => void;
};

const LoginModal = ({ show, handleClose, handleSignupShow }: LoginModalProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showValidation, setShowValidation] = useState<boolean>(false); // New state for validation
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

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
          "http://localhost:5075/api/login",
          { email, password },
          {
            withCredentials: true, // This sends cookies with the request
          }
        );
        setUser(data.user);
        handleClose();
        navigate("/");
        setShowValidation(false); 
        
        //Clear fields after submit
        setEmail("");
        setPassword("");// Hide validation on successful login
      } catch (error: any) {
        // Extract and display the error message from the server response
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message); // Set error message to state
        } else {
          setErrorMessage("An unexpected error occurred"); // Fallback error message
        }
        setShowValidation(false); // Hide validation on error
      }
    }
  }

  return (
    <div className={`modal fade ${show ? 'show d-block' : 'd-none'}`} tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
      <div className={`modal-dialog modal-dialog-centered mx-auto ${styles.customModal}`}>
        <div className="modal-content">
          <div className={`modal-header ${styles.customHeader}`}>
            <div className={styles.titleContainer}>
              <h4 className="modal-title">Welcome to STATED</h4>
            </div>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            {errorMessage && <div className="text-danger mb-2 text-center ">{errorMessage}</div>}
            <form className={`needs-validation ${showValidation ? 'was-validated' : ''}`} onSubmit={handleLoginSubmit} noValidate>
              <div className="form-group mb-3">
                <label htmlFor="validationCustom02" className="mb-2 fw-semibold">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  id="validationCustom02"
                  required
                />
                <div className="invalid-feedback">
                  Please provide a valid email address.
                </div>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="validationCustom03" className="mb-2 fw-semibold">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  id="validationCustom03"
                  required
                />
                <div className="invalid-feedback">
                  Password is required.
                </div>
              </div>
              <div className="d-grid mb-2">
                <button type="submit" className={`btn btn-primary ${styles.btn}`}>Login</button>
              </div>
              <p className="text-center">Don't have an account? <a href="#" className={styles.signup} onClick={handleSignupShow}> Sign up</a></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
