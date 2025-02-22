import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CreateUser.module.css";
import axios from "axios";
import { Slide, toast, ToastContainer } from "react-toastify";
import API_BASE_URL from "../../../components/common/utils/config";

const CreateUser = () => {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = { name, surname, phoneNumber, email, isAdmin, password };

    axios
      .post(`${API_BASE_URL}/users`, userData)
      .then(() => {
        toast.success("User created successfully!", {
          onClose: () => navigate("/admin/users"),
        });
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Failed to create user. Please try again.");
      });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={800}
        hideProgressBar={false}
        pauseOnHover={false}
        theme="light"
        transition={Slide}
      />
      <div className={styles.container_room}>
        <div className="row">
          <div className="offset-lg-3 col-lg-6">
            <form className="container" onSubmit={handleSubmit}>
              <div className="card p-2" style={{ textAlign: "left" }}>
                <div className="card-title">
                  <h2 style={{ textAlign: "center" }}>Create user</h2>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className={styles.form_group}>
                        <label className="mb-2 fw-semibold">Name</label>
                        <input
                          type="text"
                          placeholder="Enter first name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="form-control"
                          required
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className={styles.form_group}>
                        <label className="mb-2 fw-semibold">Surname</label>
                        <input
                          type="text"
                          placeholder="Enter last name"
                          value={surname}
                          onChange={(e) => setSurname(e.target.value)}
                          className="form-control"
                          required
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className={styles.form_group}>
                        <label className="mb-2 fw-semibold">Phone number</label>
                        <input
                          type="tel"
                          pattern="\+?[0-9\s\-\(\)]+"
                          placeholder="+1 234-567-8901"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="form-control"
                          required
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className={styles.form_group}>
                        <label className="mb-2 fw-semibold">Email</label>
                        <input
                          className="form-control"
                          placeholder="name@example.com"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className={styles.form_group}>
                        <label className="mb-2 fw-semibold">Password</label>
                        <input
                          className="form-control"
                          placeholder="Enter password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div
                        className="form-check"
                        style={{ marginTop: "0.5rem" }}
                      >
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={isAdmin}
                          onChange={(e) => setIsAdmin(e.target.checked)}
                        ></input>
                        <label className="form-check-label fw-semibold">
                          Admin
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div
                        className={styles.form_group}
                        style={{ float: "right" }}
                      >
                        <button className="btn btn-success" type="submit">
                          Create
                        </button>
                        &nbsp;
                        <Link to="/admin/users" className="btn btn-danger">
                          Back
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUser;
