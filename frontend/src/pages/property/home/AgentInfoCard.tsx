import { EmailIcon, PhoneIcon } from "../../../constants/icons";
import { Property } from "../../../context/types";
import styles from "./AgentInfoCard.module.css";

type AgentInfoCardProps = {
  property: Property | null;
};

const AgentInfoCard = ({ property }: AgentInfoCardProps) => {
  const handleWhatsAppClick = (phoneNumber: string) => {
    setTimeout(() => {
      const formattedPhone = phoneNumber.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      window.open(`https://wa.me/${formattedPhone}`, "_blank");
    }, 500);
  };
  return (
    <>
      <div className="card shadow p-3 rounded-5">
        <div className="d-flex">
          <div className="col-3 d-flex align-items-center justify-content-center">
            <img
              src={`http://localhost:5075/Photos/${property?.agent?.profilePicture}`}
              alt="Agent profile pic"
              className={styles.agentPic}
            />
          </div>
          <div className="col-9">
            <div className={styles.agentInfo}>
              <h6 className="mx-3 my-2">
                {property?.agent?.name} {property?.agent?.surname}
              </h6>
              <a
                className="d-flex align-items-center gap-2 mx-3 my-1"
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${property?.agent?.email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <EmailIcon />
                {property?.agent?.email}
              </a>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  if (property?.agent?.phoneNumber) {
                    handleWhatsAppClick(property.agent.phoneNumber);
                  }
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center gap-2 mx-3 my-1 "
                style={{ cursor: "pointer" }}
              >
                <PhoneIcon />
                {property?.agent?.phoneNumber}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentInfoCard;
