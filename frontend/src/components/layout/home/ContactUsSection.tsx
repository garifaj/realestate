import { useContext, useEffect, useState } from "react";
import styles from "./ContactUsSection.module.css";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import { Slide, toast, ToastContainer } from "react-toastify";
import API_BASE_URL from "../../common/utils/config";

const ContactUsSection = () => {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setSurname(user.surname);
      setEmail(user.email);
    } else {
      setName("");
      setSurname("");
      setEmail("");
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contactData = { name, surname, email, subject, message };

    axios
      .post(`${API_BASE_URL}/contactus`, contactData)
      .then(() => {
        toast.success("Message sent successfully!");
        setName("");
        setSurname("");
        setEmail("");
        setSubject("");
        setMessage("");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <section className={`${styles.contactUsSection} py-5`} id="contactSection">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        pauseOnHover={false}
        theme="light"
        transition={Slide}
      />
      <div className="container">
        <h1 className={styles.title}>Contact Us</h1>
        <div className="row">
          <div className="col-md-7">
            <div className="p-2">
              <form onSubmit={handleSubmit} className="p-5">
                <div className="row mb-3">
                  <div className="col-md-6 mt-3">
                    <input
                      type="text"
                      className="form-control rounded-4"
                      id="firstName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <input
                      type="text"
                      className="form-control rounded-4"
                      id="lastName"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control rounded-4"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control rounded-4"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject"
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control rounded-4"
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    maxLength={300}
                    placeholder="Write your notes or questions here..."
                    required
                  ></textarea>
                  <small className="text-end d-block mt-1 text-body-tertiary">
                    {message.length}/300 characters
                  </small>
                </div>
                <div className="d-flex justify-content-center py-2">
                  <button
                    type="submit"
                    className={`${styles.button} btn btn-warning rounded-5`}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-5">
            <div className="p-5">
              <p className="text-body-secondary fw-bolder mt-3">Address</p>
              <p className={`${styles.info} mb-4`}>
                123 Main Street, New York, NY 10001
              </p>
              <p className="text-body-secondary fw-bold">Phone</p>
              <p className={`${styles.info} mb-4`}>+1 123 456 7890</p>
              <p className="text-body-secondary fw-bold">Email</p>
              <p className={`${styles.info} mb-0`}>info@stated.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
