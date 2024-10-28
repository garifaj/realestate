
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../user/CreateUser.module.css";
import axios from "axios";

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
    const userData = {name, surname, phoneNumber, email, isAdmin, password };

    axios.post("http://localhost:5075/api/users", userData)
      .then(() => {
        alert("Created user successfully.");
        navigate("/users");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <div className={styles.container_room}>
        <div className="row">
          <div className="offset-lg-3 col-lg-6">
            <form className="container" onSubmit={handleSubmit}>
              <div className="card" style={{ textAlign: "left" }}>
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
                          placeholder="Enter name"
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
                          placeholder="Enter surname"
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
                          type="text"
                          placeholder="Enter phone number"
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
                          placeholder="Enter email"
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
                        <label className="form-check-label fw-semibold">Admin</label>
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
                        <Link to="/users" className="btn btn-danger">
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