import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./PropertiesTable.module.css";
import { Agent, Property } from "../../../context/types.tsx";
import { cities, propertyTypes } from "../../../constants/constants.tsx" // Assuming you have these arrays in a constants file.
import PropertyFilters from "./PropertyFilters.tsx";
import TablePagination from "../../../components/common/admin/TablePagination.tsx";
import { Slide, toast, ToastContainer } from "react-toastify";
import { PulseLoader } from "react-spinners";


const PropertiesTable = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedAgent, setSelectedAgent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const propertiesPerPage = 4;
  const navigate = useNavigate();

  const loadEdit = (id: number) => {
    navigate("/properties/edit/" + id);
  };

  const deleteFunction = (id: number) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      axios
        .delete(`http://localhost:5075/api/properties/${id}`)
        .then(() => {
          toast.info("Property deleted successfully!");
          setProperties((prevProperties) => prevProperties.filter((property) => property.id !== id));
        })
        .catch((err) => {
          console.log(err.message);
          toast.error("Failed to delete property. Please try again.");
        });
    }
  };

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await axios.get("http://localhost:5075/api/properties");
        setProperties(response.data);
      } catch (error) {
        console.error(error);
      }finally{
        setLoading(false);
      }
    }

    async function fetchAgents() {
      try {
        const response = await axios.get("http://localhost:5075/api/agents");
        setAgents(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProperties();
    fetchAgents();
  }, []);

  const filteredProperties = properties.filter((property) => {
    const fullName = `${property.agent?.name || ""} ${property.agent?.surname || ""}`.toLowerCase();
    return (
      (search === "" ||
        property.title.toLowerCase().includes(search.toLowerCase()) ||
        property.description.toLowerCase().includes(search.toLowerCase()) ||
        property.city.toLowerCase().includes(search.toLowerCase()) ||
        fullName.includes(search.toLowerCase()) ||
        property.type.toLowerCase().includes(search.toLowerCase())) &&
      (selectedCity === "" || property.city === selectedCity) &&
      (selectedType === "" || property.type === selectedType) &&
      (selectedAgent === "" ||
        (property.agent && property.agent.id === parseInt(selectedAgent)))
    );
  });

  const indexOfLastBooking = currentPage * propertiesPerPage;
  const indexOfFirstBooking = indexOfLastBooking - propertiesPerPage;
  const currentProperties =
    filteredProperties &&
    filteredProperties.slice(indexOfFirstBooking, indexOfLastBooking);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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
          <h2 className="mb-0" style={{ textAlign: "center" }}>Properties Table</h2>
        </div>
        <div className="card-body">
          <div className={styles.divbtn}>
            <Link to="/properties/create" id="#createbutton" className="btn btn-success">
              Add New +
            </Link>
          </div>
          <PropertyFilters 
          cities={cities}
          propertyTypes={propertyTypes}
          agents={agents}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedAgent={selectedAgent}
          setSelectedAgent={setSelectedAgent}
          setSearch={setSearch}
          search = {search}
          />
          <div className="table-responsive">
            {loading ? (
              <div style={{ textAlign: "center", margin: "20px 0" }}>
              <PulseLoader color="#000000" size={20}  />
              </div>
            ) : (
<table className="table table-bordered table-hover" style={{ minWidth: "850px" ,maxWidth:"100%"}}>
              <thead className="bg-dark text-white  ">
                <tr id={styles.headerRow}>
                  <td>ID</td>
                  <td>Title</td>
                  <td>Description</td>
                  <td>Price (€)</td>
                  <td>Bedroom</td>
                  <td>Bathroom</td>
                  <td>Area m²</td>
                  <td>Type</td>
                  <td>Address</td>
                  <td>City</td>
                  <td>Agent</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {currentProperties.length === 0 ? (
                  <tr>
                    <td
                      colSpan={12}
                      style={{ textAlign: "center", fontSize: "25px" }}
                    >
                      No properties found!
                    </td>
                  </tr>
                ) : (
                  currentProperties.map((property) => (
                    <tr key={property.id}>
                      <td>{property.id}</td>
                      <td>
                        <div className={styles.customCell1}>
                         {property.title}
                         </div>
                      </td>
                      <td>
                        <div className={styles.customCell2} dangerouslySetInnerHTML={{__html:property.description}}>
                          
                        </div>
                        
                      </td>
                      <td>
                        <div className={styles.customCell3}>
                          {property.price.toFixed(2)}
                        </div>
                      </td>
                      <td>{property.bedroom}</td>
                      <td>{property.bathroom}</td>
                      <td>{property.area}</td>
                      <td>{property.type}</td>
                      <td>{property.address}</td>
                      <td>{property.city}</td>
                      <td>
                        {property.agent
                          ? `${property.agent.name} ${property.agent.surname}`
                          : "Unassigned"}
                      </td>
                      <td>
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{ gap: "10px" }} // Add spacing between icons
                        >
                          <a
                            onClick={() => {
                              loadEdit(property.id);
                            }}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              style={{ width: "18px", height: "20px" }}
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                              <g id="SVGRepo_iconCarrier">
                                <path
                                  d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                                  stroke="#008000"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                                  stroke="#008000"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </g>
                            </svg>
                          </a>
                          <a
                            onClick={() => {
                              deleteFunction(property.id);
                            }}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              style={{ width: "20px", height: "20px" }}
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                              <g id="SVGRepo_iconCarrier">
                                <path
                                  d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                                  stroke="#FF0000"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </g>
                            </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot>
                <TablePagination
                  totalItems={filteredProperties.length}
                  itemsPerPage={propertiesPerPage}
                  currentPage={currentPage}
                  paginate={paginate}
                  colSpan={12} // Set this dynamically based on your table's column count
                />
              </tfoot>
            </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesTable;
