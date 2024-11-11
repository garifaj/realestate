import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../agent/CreateAgent.module.css";
import axios from "axios";

const EditAgent = () => {

const {agentid} = useParams();
const [id, setId] = useState<number>();
const [name, setName] = useState<string>("");
const [surname, setSurname] = useState<string>("");
const [email, setEmail] = useState<string>("");
const [phoneNumber, setPhoneNumber] = useState<string>("");
const [bio, setBio] = useState<string>("");
const [linkedIn, setLinkedIn] = useState<string>("");
const [profilePicture, setProfilePicture] = useState<string>("");

const navigate = useNavigate();

const fetchData = async() => {
  try {
    const response = await axios.get(`http://localhost:5075/api/agents/${agentid}`);
    const data = await response.data;
    setId(data.id);
    setName(data.name);
    setSurname(data.surname);
    setEmail(data.email);
    setPhoneNumber(data.phoneNumber);
    setBio(data.bio);
    setLinkedIn(data.linkedIn);
    setProfilePicture(data.profilePicture);
  } catch (error) {
    console.error(error);
  }
}

useEffect(() => {
  fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[]);

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const agentData = {id ,name, surname, email, phoneNumber, bio, linkedIn, profilePicture};
  axios.put(`http://localhost:5075/api/agents/${agentid}`, agentData)
  .then(() =>{
    alert("Edited agent successfully!");
    navigate("/agents");
  })
  .catch((err) =>{
    console.log(err.message)
  });
};

const imageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  e.preventDefault();

  const formData = new FormData();
  if (e.target.files && e.target.files[0]) {
      formData.append("file", e.target.files[0], e.target.files[0].name);

      axios.post("http://localhost:5075/api/agents/savefile", formData)
      .then((response) => {
          setProfilePicture(response.data);
      })
      .catch((error) => {
          console.error("Error uploading file:", error);
      });
  }
};
return (
  <>
  <div className={styles.container_room}>
    <div className="row">
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handleSubmit}>
          <div className="card" style={{ textAlign: "left" }}>
            <div className="card-title">
              <h2 style={{ textAlign: "center" }}>Edit agent</h2>
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
                      placeholder="Agent's first name"
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
                      placeholder="Agent's last name"
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
                      placeholder="Agent's email address"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    ></input>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className={styles.form_group}>
                    <label className="mb-2 fw-semibold">Bio</label>
                    <input
                      className="form-control"
                      placeholder="Brief bio of the agent"
                      type="text"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      required
                    ></input>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className={styles.form_group}>
                    <label className="mb-2 fw-semibold">Linked In</label>
                    <input
                      className="form-control"
                      placeholder="Agent's LinkedIn profile URL"
                      type="text"
                      value={linkedIn}
                      onChange={(e) => setLinkedIn(e.target.value)}
                      required
                    ></input>
                  </div>
                </div>

                

                <div className="col-lg-12">
                    <div className={styles.form_group}>
                      <label>Image</label>
                      <input
                        type="file"
                        placeholder="Upload agent's profile picture"
                        onChange={imageUpload}
                        className="form-control form-control-md"
                        
                      ></input>
                    </div>
                    <div
                      className="col-lg-12"
                      style={{ marginTop: "0.5rem" }}
                    >
                      {profilePicture && (
                        <img
                          src={`http://localhost:5075/Photos/${profilePicture}`}
                          alt="Room Image" 
                          style={{ maxWidth: "250px", maxHeight: "250px" }}
                        />
                      )}
                    </div>
                  </div>
                
                <div className="col-lg-12">
                  <div
                    className={styles.form_group}
                    style={{ float: "right" }}
                  >
                    <button className="btn btn-success" type="submit">
                      Edit
                    </button>
                    &nbsp;
                    <Link to="/agents" className="btn btn-danger">
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
  )
}

export default EditAgent;
