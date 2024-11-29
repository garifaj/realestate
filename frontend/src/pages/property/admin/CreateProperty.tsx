import { useEffect, useState } from "react";
import styles from "./CreateProperty.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { cities, propertyTypes } from "../../../constants/constants";
import { Agent } from "../../../context/types";

const CreateProperty = () => {
    const [title, setTitle] = useState<string>("");
    const [type, setType] = useState<string>(propertyTypes[0]);
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>();
    const [bedroom, setBedroom] = useState<number>();
    const [bathroom, setBathroom] = useState<number>();
    const [area, setArea] = useState<number>();
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState<string>(cities[0]);
    const [images, setImages] = useState<string[]>([]);
    const [agentId, setAgentId] = useState<number>();
    const [agents, setAgents] =useState<Agent[]>([]);
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const fetchAgents = async () => {
        try {
            const response = await axios.get("http://localhost:5075/api/agents");
            const agentsData = response.data;
            setAgents(agentsData); 
            if(agentsData.length >0) {
                setAgentId(agentsData[0].id);
            }
        } catch (error) {
            console.error("Error fetching agents:", error);
        }
    };

    // Fetch agents on component mount
    useEffect(() => {
        fetchAgents();
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const propertyData = {title, type, description, price, bedroom, bathroom, area, address, city, images, agentId};

        if(error) {
            return;
        }

        axios.post("http://localhost:5075/api/properties", propertyData)
        .then(() =>{
            alert("Created property successfully!");
            navigate("/properties");
        })
        .catch((err) =>{
            console.log(err.message)
        });
    }

    const imageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const files = e.target.files;
        if (files && files.length > 0) {
            // Validate all files
            const validTypes = ["image/jpeg", "image/png"];
            const invalidFiles = Array.from(files).filter(file => !validTypes.includes(file.type));

            if (invalidFiles.length > 0) {
                setError("Please upload files with .jpg or .png extensions only.");
                return;
            }

            setError(""); // Clear any previous error messages

            const formData = new FormData();
            Array.from(files).forEach((file) => {
                formData.append("files", file, file.name);
            });

            axios.post("http://localhost:5075/api/properties/savefile", formData)
                .then((response) => {
                    setImages(response.data);
                })
                .catch((error) => {
                    console.error("Error uploading files:", error);
                    setError("An error occurred while uploading the files.");
                });
        }
    };

  return (
    <div className={styles.container}>
        <h2 className="mb-4 text-center">Add New Property</h2>
        <form onSubmit={handleSubmit} >
            <div className="row g-3">
            
                <div className="col-md-6">
                    <label  className="form-label">Title:</label>
                    <input 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control" 
                    placeholder="Enter property title" 
                    required
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Type:</label>
                    <select
                        id="type"
                        name="type"
                        className="form-select"
                        value={type} // Bind to the type state
                        onChange={(e) => setType(e.target.value)} // Update state on change
                        required
                    >
                        {propertyTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-12">
                    <label className="form-label">Description:</label>
                    <textarea  
                    className="form-control" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3} 
                    placeholder="Enter property description" 
                    required>
                    </textarea>
                </div>

                <div className="col-md-4">
                    <label className="form-label">Price (€):</label>
                    <input 
                    type="number"  
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))} 
                    step="0.01" 
                    placeholder="Enter price" 
                    required
                    />
                </div>
                <div className="col-md-4">
                    <label  className="form-label">Bedrooms:</label>
                    <input 
                    type="number"  
                    className="form-control" 
                    value={bedroom}
                    onChange={(e) => setBedroom(Number(e.target.value))}
                    min="1" 
                    placeholder="Number of bedrooms" 
                    required
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Bathrooms:</label>
                    <input 
                    type="number" 
                    className="form-control" 
                    value={bathroom}
                    onChange={(e) => setBathroom(Number(e.target.value))}
                    min="1" 
                    placeholder="Number of bathrooms" 
                    required
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Area (m²):</label>
                    <input 
                    type="number" 
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="form-control" 
                    min="1" 
                    placeholder="Enter area" 
                    required/>
                </div>

                <div className="col-md-4">
                    <label className="form-label">City:</label>
                    <select
                        className="form-select"
                        value={city} // Bind to the city state
                        onChange={(e) => setCity(e.target.value)} // Update state on change
                        required
                    >
                        {cities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-4">
                    <label className="form-label">Agent:</label>
                    <select
                        className="form-select"
                        value={agentId} // Bind to the agentId state
                        onChange={(e) => setAgentId(Number(e.target.value))} // Update state on change
                        required
                    >
                        {agents.map((agent) => (
                            <option key={agent.id} value={agent.id}> {/* Use agent ID as value */}
                                {agent.name} {agent.surname}
                            </option>
                        ))}
                    </select>
                </div>


                <div className="col-md-6">
                    <label className="form-label">Address:</label>
                    <input 
                    type="text" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control" 
                    placeholder="Enter address" 
                    required
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Upload Image:</label>
                    <input 
                    type="file" 
                    className="form-control"  
                    onChange={imageUpload}           
                    multiple
                    required/>
                    {error && <small className="text-danger">{error}</small>}
                </div>
            </div>

            <div className="col-lg-12">
                    <div
                      className={styles.form_group}
                      style={{ float: "right" }}
                    >
                      <button className="btn btn-success" type="submit">
                        Create
                      </button>
                      &nbsp;
                      <Link to="/properties" className="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
        </form>
    </div>
  )
}

export default CreateProperty
