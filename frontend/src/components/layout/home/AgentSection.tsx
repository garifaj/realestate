import styles from "./AgentSection.module.css";
import { useEffect, useState } from "react";
import { Agent } from "../../../context/types";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import { EmailIcon, LinkedinInIcon, PhoneIcon } from "../../../constants/icons";
import API_BASE_URL from "../../common/utils/config";

const AgentSection = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchAgents() {
      try {
        const response = await axios.get(`${API_BASE_URL}/agents`);
        setAgents(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchAgents();
  }, []);

  const handleWhatsAppClick = (phoneNumber: string) => {
    setTimeout(() => {
      const formattedPhone = phoneNumber.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      window.open(`https://wa.me/${formattedPhone}`, "_blank");
    }, 500);
  };
  return (
    <>
      <section className="agentSection py-5" id="agentSection">
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-6">
              <h2 className={styles.title}> Our agents</h2>
              <span className={styles.subtitle}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                excepturi voluptatum, voluptate sit ab dolor adipisci!
                Voluptate, consequuntur earum deleniti fugit nam aut
                reprehenderit doloremque molestias recusandae, perferendis modi
                dolorem!
              </span>
            </div>
          </div>

          <div className="row">
            {loading ? (
              <div style={{ textAlign: "center", margin: "20px 0" }}>
                <PulseLoader color="#000000" size={20} />
              </div>
            ) : (
              agents.slice(-6).map((agent) => (
                <div className="col-lg-4 col-md-6 my-5" key={agent.id}>
                  <div className={styles.agentCard}>
                    <img
                      src={`http://localhost:5075/Photos/${agent.profilePicture}`}
                      alt="Agent profile pic"
                      className={styles.profileImage}
                    />
                    <div className={`${styles.agentInfo} p-4`}>
                      <h3 className={styles.agentName}>
                        {agent.name + " " + agent.surname}
                      </h3>
                      <span>Real estate agent</span>
                      <p
                        className={styles.bio}
                        dangerouslySetInnerHTML={{ __html: agent.bio }}
                      />
                      <div className="d-flex justify-content-evenly">
                        <div className={styles.icon_text}>
                          <div className={styles.icon}>
                            <a
                              href={agent.linkedIn}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <LinkedinInIcon />
                            </a>
                          </div>
                        </div>
                        <div className={styles.icon_text}>
                          <div className={styles.icon}>
                            <a
                              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${agent.email}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <EmailIcon />
                            </a>
                          </div>
                        </div>
                        <div className={styles.icon_text}>
                          <div className={styles.icon}>
                            <a
                              onClick={(e) => {
                                e.preventDefault();
                                handleWhatsAppClick(agent.phoneNumber);
                              }}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <PhoneIcon />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AgentSection;
