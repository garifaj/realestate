import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./AgentsTable.module.css";
import { Agent } from "../../../context/types";
import TablePagination from "../../../components/common/admin/TablePagination";
import AgentsPropertiesModal from "./AgentsPropertiesModal";
import { Slide, toast, ToastContainer } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { DeleteIcon, EditIcon } from "../../../constants/icons";
import API_BASE_URL from "../../../components/common/utils/config";

const AgentsTable = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const agentsPerPage = 3;
  const navigate = useNavigate();

  const loadEdit = (id: number) => {
    navigate("edit/" + id);
  };

  const deleteFunction = (id: number) => {
    if (window.confirm("Are you sure you want to delete this agent?")) {
      axios
        .delete(`${API_BASE_URL}/agents/${id}`)
        .then(() => {
          toast.info("Agent deleted successfully!");
          setAgents((prevAgents) =>
            prevAgents.filter((agent) => agent.id !== id)
          );
        })
        .catch((err) => {
          console.log(err.message);
          toast.error("Failed to delete agent. Please try again.");
        });
    }
  };

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/agents`);
        setAgents(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  const filteredAgents = agents.filter((agent) => {
    return (
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  const indexOfLastAgent = currentPage * agentsPerPage;
  const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
  const currentAgents =
    filteredAgents && filteredAgents.slice(indexOfFirstAgent, indexOfLastAgent);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleOpenPropertyModal = (agent: Agent) => {
    setShowPropertyModal(true);
    setSelectedAgent(agent);
  };
  const handleClosePropertyModal = () => {
    setShowPropertyModal(false);
    setSelectedAgent(null);
  };

  return (
    <div className="container py-5">
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        pauseOnHover={false}
        theme="light"
        transition={Slide}
      />
      <div className="card" id={styles.card}>
        <div className="card-title">
          <h2 style={{ textAlign: "center" }}>Agents Table</h2>
        </div>
        <div className="card-body">
          <div className={styles.divbtn}>
            <Link to="create" id="#createbutton" className="btn btn-success">
              Add New +
            </Link>
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="form-control"
            />
          </div>
          <div className="table-responsive">
            {loading ? (
              <div style={{ textAlign: "center", margin: "20px 0" }}>
                <PulseLoader color="#000000" size={20} />
              </div>
            ) : (
              <table
                className="table table-bordered"
                style={{ minWidth: "850px", maxWidth: "100%" }}
              >
                <thead className="bg-dark text-white">
                  <tr id={styles.headerRow}>
                    <td>ID</td>
                    <td>Full Name</td>
                    <td>Phone Number</td>
                    <td>Email</td>
                    <td>Bio</td>
                    <td>LinkedIn</td>
                    <td>Properties</td>
                    <td>Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {currentAgents.length === 0 ? (
                    <tr>
                      <td
                        colSpan={9}
                        style={{ textAlign: "center", fontSize: "25px" }}
                      >
                        No agents found!
                      </td>
                    </tr>
                  ) : (
                    currentAgents.map((agent) => (
                      <tr key={agent.id}>
                        <td>{agent.id}</td>
                        <td>
                          {agent.name} {agent.surname}
                        </td>
                        <td>{agent.phoneNumber}</td>
                        <td>{agent.email}</td>
                        <td>
                          <div
                            className={styles.customCell}
                            dangerouslySetInnerHTML={{ __html: agent.bio }}
                          ></div>
                        </td>
                        <td
                          style={{
                            maxWidth: "20rem",
                            maxHeight: "5rem",
                            overflow: "auto",
                          }}
                        >
                          {agent.linkedIn}
                        </td>
                        <td>
                          {agent.properties && agent.properties.length > 0 ? (
                            <a
                              href="#"
                              className="link-primary"
                              onClick={(e) => {
                                e.preventDefault(); // Prevent page reload
                                handleOpenPropertyModal(agent);
                              }}
                            >
                              View Properties
                            </a>
                          ) : (
                            <span>No properties</span>
                          )}
                        </td>
                        <td>
                          <div
                            className="d-flex justify-content-center align-items-center"
                            style={{ gap: "10px" }} // Adjust spacing between icons as needed
                          >
                            <a
                              onClick={() => {
                                loadEdit(agent.id);
                              }}
                            >
                              <EditIcon />
                            </a>
                            <a
                              onClick={() => {
                                deleteFunction(agent.id);
                              }}
                            >
                              <DeleteIcon />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                <tfoot>
                  <TablePagination
                    totalItems={filteredAgents.length}
                    itemsPerPage={agentsPerPage}
                    currentPage={currentPage}
                    paginate={paginate}
                    colSpan={8} // table column count
                  />
                </tfoot>
              </table>
            )}
          </div>
        </div>
      </div>
      <AgentsPropertiesModal
        show={showPropertyModal}
        handleClose={handleClosePropertyModal}
        agent={selectedAgent}
      />
    </div>
  );
};

export default AgentsTable;
