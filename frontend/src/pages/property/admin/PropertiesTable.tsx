import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./PropertiesTable.module.css";
import { Agent, Property } from "../../../context/types.tsx";
import { cities, propertyTypes } from "../../../constants/constants.tsx"; // Assuming you have these arrays in a constants file.
import PropertyFilters from "./PropertyFilters.tsx";
import TablePagination from "../../../components/common/admin/TablePagination.tsx";
import { Slide, toast, ToastContainer } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { DeleteIcon, EditIcon } from "../../../constants/icons.tsx";
import API_BASE_URL from "../../../components/common/utils/config.tsx";

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
    navigate("edit/" + id);
  };

  const deleteFunction = (id: number) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      axios
        .delete(`${API_BASE_URL}/properties/${id}`)
        .then(() => {
          toast.info("Property deleted successfully!");
          setProperties((prevProperties) =>
            prevProperties.filter((property) => property.id !== id)
          );
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
        const response = await axios.get(`${API_BASE_URL}/properties`);
        setProperties(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchAgents() {
      try {
        const response = await axios.get(`${API_BASE_URL}/agents`);
        setAgents(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProperties();
    fetchAgents();
  }, []);

  const filteredProperties = properties.filter((property) => {
    const fullName = `${property.agent?.name || ""} ${
      property.agent?.surname || ""
    }`.toLowerCase();
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
          <h2 className="mb-0" style={{ textAlign: "center" }}>
            Properties Table
          </h2>
        </div>
        <div className="card-body">
          <div className={styles.divbtn}>
            <Link to="create" id="#createbutton" className="btn btn-success">
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
            search={search}
          />
          <div className="table-responsive">
            {loading ? (
              <div style={{ textAlign: "center", margin: "20px 0" }}>
                <PulseLoader color="#000000" size={20} />
              </div>
            ) : (
              <table
                className="table table-bordered table-hover"
                style={{ minWidth: "850px", maxWidth: "100%" }}
              >
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
                          <div
                            className={styles.customCell2}
                            dangerouslySetInnerHTML={{
                              __html: property.description,
                            }}
                          ></div>
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
                              <EditIcon />
                            </a>
                            <a
                              onClick={() => {
                                deleteFunction(property.id);
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
