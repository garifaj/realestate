import { Link, useNavigate } from "react-router-dom";
import styles from "./UsersTable.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

type User = {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  isAdmin: boolean;
}


const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const usersPerPage = 7;
  const navigate = useNavigate();

  const loadEdit = (id:number) => {
    navigate("/users/edit/" + id);
  };

  const deleteFunction = (id:number) => {
    if(window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`http://localhost:5075/api/users/${id}`)
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
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5075/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  const indexOfLastBooking = currentPage * usersPerPage;
  const indexOfFirstBooking = indexOfLastBooking - usersPerPage;
  const currentUsers =
    filteredUsers &&
    filteredUsers.slice(indexOfFirstBooking, indexOfLastBooking);

  const paginate = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className={styles.container_room}>
      <div className="card" id={styles.card}>
        <div className="card-title">
          <h2 style={{ textAlign: "center" }}>Users table</h2>
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
                  <td>Admin</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={{ textAlign: "center", fontSize: "25px" }}
                    >
                      No users found!
                    </td>
                  </tr>
                ) : (
                  currentUsers.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.surname}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{item.email}</td>
                      <td>{item.isAdmin ? "Admin" : "User"}</td>
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
                  <td colSpan={7}>
                    {Math.ceil(filteredUsers.length / usersPerPage) > 1 && (
                      <ul className="pagination justify-content-center ">
                        {[
                          ...Array(
                            Math.ceil(filteredUsers.length / usersPerPage)
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
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UsersTable
