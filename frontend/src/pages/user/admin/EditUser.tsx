import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./EditUser.module.css";
import axios from "axios";
import { Slide, toast, ToastContainer } from "react-toastify";

const EditUser = () => {
  const { userid } = useParams<{ userid: string }>();
  const navigate = useNavigate();
  const [id, setId] = useState<number>();
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5075/api/users/${userid}` );
      const data = await response.data;
      setId(data.id);
      setName(data.name);
      setSurname(data.surname);
      setPhoneNumber(data.phoneNumber);
      setEmail(data.email);
      setIsAdmin(data.isAdmin);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = { id, name,surname, phoneNumber, email, isAdmin };

    axios.put(`http://localhost:5075/api/users/${userid}`, userData)
      .then(() => {
        toast.success("User updated successfully!", {
          onClose: () => navigate("/admin/users"),
        });
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Failed to update user. Please try again.");
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
              <div className="card" style={{ textAlign: "left" }}>
                <div className="card-title">
                  <h2 style={{ textAlign: "center" }}>Edit user</h2>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className={styles.form_group}>
                        <label className="mb-2 fw-semibold">ID</label>
                        <input
                          value={id}
                          disabled
                          className="form-control"
                        ></input>
                      </div>
                    </div>
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
                          type="text"
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
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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
                          Update
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

export default EditUser;