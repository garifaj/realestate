import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AgentsTable.module.css";


type Agent = {
    id: number;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    bio: string;
    linkedIn: string;
    profilePicture: string;
}

const AgentsTable = () => {
    const [agents, setAgents] = useState<Agent[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const agentsPerPage = 7;
    const navigate = useNavigate();

    const loadEdit = (id:number) =>{
        navigate("/agents/edit/" + id);
    }

    const deleteFunction = (id:number) => {
        if(window.confirm("Are you sure you want to delete this agent?")) {
          axios.delete(`http://localhost:5075/api/agents/${id}`)
          .then(() =>{
            alert("Deleted successfully!");
            window.location.reload();
          })
          .catch((err) => {
            console.log(err.message);
          })
        }
      }

      useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await axios.get("http://localhost:5075/api/agents");
                setAgents(response.data);
            } catch (error) {
                console.error(error);
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
    
      const indexOfLastBooking = currentPage * agentsPerPage;
      const indexOfFirstBooking = indexOfLastBooking - agentsPerPage;
      const currentAgents =
        filteredAgents &&
        filteredAgents.slice(indexOfFirstBooking, indexOfLastBooking);
    
      const paginate = (pageNumber:number) => {
        setCurrentPage(pageNumber);
      };
  return (
    <div className={styles.container_room}>
      <div className="card" id={styles.card}>
        <div className="card-title">
          <h2 style={{ textAlign: "center" }}>Agents table</h2>
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
            <table className="table table-bordered" style={{ minWidth: "850px" }}>
              <thead className="bg-dark text-white">
                <tr>
                  <td>ID</td>
                  <td>Name</td>
                  <td>Surname</td>
                  <td>Phone number</td>
                  <td>Email</td>
                  <td>Bio</td>
                  <td>Linked in</td>
                  {/* <td>Profile Picture</td> */}
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
                      No users found!
                    </td>
                  </tr>
                ) : (
                  currentAgents.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.surname}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{item.email}</td>
                      <td 
                      style={{
                            maxWidth: "20rem",
                            maxHeight: "10rem",
                            overflow: "auto",
                        }}>
                        {item.bio}
                     </td>
                      <td style={{
                            maxWidth: "15rem",
                            maxHeight: "10rem",
                            overflow: "auto",
                        }}>{item.linkedIn}</td>
                      {/* <td>{item.profilePicture}</td> */}
                      <td>
                        <div className="row gx-2">
                          <div className="col">
                          <a
                          onClick={() => {
                            loadEdit(item.id);
                          }}
                          className="btn btn-sm btn-success w-100"
                        >
                          Edit
                        </a>
                        </div>
                          <div className="col">
                          <a
                          onClick={() => {
                            deleteFunction(item.id);
                          }}
                          className="btn btn-sm btn-danger w-100"
                        >
                          Delete
                        </a>
                        </div>
                        
                    
                        </div>
                        
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot>
                <tr>
                    {filteredAgents.length > agentsPerPage && (
                        <td colSpan={7}>
                    {Math.ceil(filteredAgents.length / agentsPerPage) > 1 && (
                      <ul className="pagination justify-content-center ">
                        {[
                          ...Array(
                            Math.ceil(filteredAgents.length / agentsPerPage)
                          ).keys(),
                        ].map((number) => (
                          <li key={number + 1} className="page-item">
                            <a
                              onClick={() => paginate(number + 1)}
                              className="page-link"
                            >
                              {number + 1}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                    )}
                  
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentsTable
