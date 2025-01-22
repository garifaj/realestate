import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./EditAgent.module.css";
import axios from "axios";
import TextEditor from "../../../components/common/admin/TextEditor";
import { Slide, toast, ToastContainer } from "react-toastify";

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
    toast.success("Agent updated successfully!", {
      onClose: () => navigate("/admin/agents"),
    });
    
  })
  .catch((err) =>{
    console.log(err.message);
    toast.error("Failed to update agent. Please try again.");
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
  <div className={styles.container}>
    <ToastContainer
      position="top-center"
      autoClose={800}
      hideProgressBar={false}
      pauseOnHover={false}
      theme="light"
      transition={Slide}
      />
  <h2 className="mb-4 text-center">Edit Agent</h2>
  <form onSubmit={handleSubmit} style={{ overflow:"auto"}}>
      <div className="row g-3 mx-0">

      <div className="col-lg-12">
            <label className="mb-2 fw-semibold" htmlFor="id">ID</label>
            <input
              id="id"
              value={id}
              disabled
              className="form-control"
            />
        </div>
      <div className="col-lg-6">
            <label className="mb-2 fw-semibold" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Agent's first name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              required
            />
        </div>
        <div className="col-lg-6">
            <label className="mb-2 fw-semibold" htmlFor="surname">Surname</label>
            <input
              id="surname"
              type="text"
              placeholder="Agent's last name"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="form-control"
              required
            />
        </div>

        {/* Bio */}
        <div className="col-lg-12">
            <label className="mb-2 fw-semibold" htmlFor="bio">Bio</label>
            {/* <textarea
              id="bio"
              className="form-control"
              rows={3}
              placeholder="Brief bio of the agent"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
            ></textarea> */}
            <TextEditor value={bio} onChange={setBio}/>

        </div>

        {/* Email and Phone Number */}
        <div className="col-lg-6">
            <label className="mb-2 fw-semibold" htmlFor="email">Email</label>
            <input
              id="email"
              className="form-control"
              placeholder="Agent's email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        </div>
        <div className="col-lg-6">
            <label className="mb-2 fw-semibold" htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              type="tel"
              pattern="\+?[0-9\s\-\(\)]+"
              placeholder="+1 234-567-8901"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="form-control"
              required
            />
        </div>

        {/* LinkedIn */}
        <div className="col-lg-12">
            <label className="mb-2 fw-semibold" htmlFor="linkedIn">LinkedIn</label>
            <input
              id="linkedIn"
              className="form-control"
              placeholder="Agent's LinkedIn profile URL"
              type="text"
              value={linkedIn}
              onChange={(e) => setLinkedIn(e.target.value)}
              required
            />
          
        </div>

        {/* Image Upload and Preview */}
        <div className="col-lg-6">
            <label className="mb-2 fw-semibold" htmlFor="profilePicture">Image</label>
            <input
              id="profilePicture"
              type="file"
              placeholder="Upload agent's profile picture"
              onChange={imageUpload}
              className="form-control form-control-md mt-2"
            />
            {/* {error && <small className="text-danger">{error}</small>} */}
        </div>
        <div className="col-lg-6 mt-4">
          {profilePicture && (
            <img
              src={`http://localhost:5075/Photos/${profilePicture}`}
              alt="Agent's Profile"
              style={{
                maxWidth: "150px",
                maxHeight: "150px",
                borderRadius: "1rem",
              }}
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="col-lg-12">
          <div className={styles.form_group} style={{ textAlign: "right" }}>
            <button className="btn btn-success" type="submit">
              Edit
            </button>
            &nbsp;
            <Link to="/admin/agents" className="btn btn-danger">
              Back
            </Link>
          </div>
        </div>
      </div>
  </form>
</div>
  )
}

export default EditAgent;
