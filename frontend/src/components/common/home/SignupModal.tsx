import { useState } from "react";
import styles from "./SignupModal.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type SignupModalProps = {
  show: boolean;
  handleClose: () => void;
  handleLogin: () => void;
};

const SignupModal = ({ show, handleClose, handleLogin }: SignupModalProps) => {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showValidation, setShowValidation] = useState<boolean>(false); // State for validation
  const navigate = useNavigate();

  async function handleRegisterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Reset validation state
    setShowValidation(false); 

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      // Prevent submission and show validation styles if the form is invalid
      e.stopPropagation();
      setShowValidation(true);
    } else {
      try {
        await axios.post("http://localhost:5075/api/register", { name, surname, phoneNumber, email, password });
        alert("Registration successful. Now you can login");
        handleClose();
        navigate("/");

        //Clear fields after submit
        setName("");
        setSurname("");
        setPhoneNumber("");
        setEmail("");
        setPassword("");
      } catch (e) {
        alert("Registration failed. Please try again later");
      }
    }
  }

  return (
    <div className={`modal fade ${show ? 'show d-block' : 'd-none'}`} tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
      <div className={`modal-dialog modal-dialog-centered mx-auto ${styles.customModal}`}>
        <div className="modal-content">
          <div className={`modal-header ${styles.customHeader}`}>
            <div className={styles.titleContainer}>
              <h4 className="modal-title">REGISTER</h4>
            </div>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <form className={`needs-validation ${showValidation ? 'was-validated' : ''}`} onSubmit={handleRegisterSubmit} noValidate>
              <div className="form-group mb-3">
                <label htmlFor="name" className="mb-2 fw-semibold">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required // Make this field required
                />
                <div className="invalid-feedback">
                  Please provide a valid name.
                </div>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="surname" className="mb-2 fw-semibold">Surname</label>
                <input
                  type="text"
                  className="form-control"
                  id="surname"
                  placeholder="Enter surname"
                  value={surname}
                  onChange={e => setSurname(e.target.value)}
                  required // Make this field required
                />
                <div className="invalid-feedback">
                  Please provide a valid surname.
                </div>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="phonenumber" className="mb-2 fw-semibold">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="phonenumber"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  required // Make this field required
                />
                <div className="invalid-feedback">
                  Please provide a valid phone number.
                </div>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email" className="mb-2 fw-semibold">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="emailsignup"
                  placeholder="Enter email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required // Make this field required
                />
                <div className="invalid-feedback">
                  Please provide a valid email address.
                </div>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password" className="mb-2 fw-semibold">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordsignup"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required // Make this field required
                />
                <div className="invalid-feedback">
                  Please provide a password.
                </div>
              </div>
              <div className="d-grid mb-2">
                <button type="submit" className={`btn btn-primary ${styles.btn}`}>Sign up</button>
              </div>
              <p className="text-center">Already have an account? <a className={styles.signup} onClick={handleLogin}> Login</a></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
