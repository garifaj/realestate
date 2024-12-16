import { Agent } from "../../../context/types";


type ModalProps = {
  agent: Agent|null;
  show: boolean;
  handleClose: () => void;
};

const AgentsPropertiesModal: React.FC<ModalProps> = ({ agent, show, handleClose }) => {
  return (
    <div
      className={`modal fade ${show ? "show d-block" : "d-none"}`}
      tabIndex={-1}
      role="dialog"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    >
      <div className={`modal-dialog modal-dialog-centered mx-auto `}>
        <div className="modal-content">
          <div className={`modal-header`}>
            <h4 className="modal-title">
              Properties for {agent?.name} {agent?.surname}
            </h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            {agent?.properties.length === 0 ? (
              <p className="text-center">No properties available.</p>
            ) : (
              <ul className="list-group">
                {agent?.properties.map((property) => (
                  <li key={property.id} className="list-group-item">
                    <strong>{property.title}</strong> - ${property.price.toLocaleString()}
                    <br />
                    <small>
                      {property.bedroom} Bedroom(s), {property.bathroom} Bathroom(s), {property.area} m²
                    </small>
                    <br />
                    <small>
                      {property.address}, {property.city}
                    </small>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentsPropertiesModal;
