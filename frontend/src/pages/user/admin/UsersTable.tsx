import { Link, useNavigate } from "react-router-dom";
import styles from "./UsersTable.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../../../context/types";
import TablePagination from "../../../components/common/admin/TablePagination";
import { Slide, toast, ToastContainer } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { DeleteIcon, EditIcon } from "../../../constants/icons";
import API_BASE_URL from "../../../components/common/utils/config";

const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const usersPerPage = 7;
  const navigate = useNavigate();

  const loadEdit = (id: number) => {
    navigate("edit/" + id);
  };

  const deleteFunction = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`${API_BASE_URL}/users/${id}`)
        .then(() => {
          toast.info("User deleted successfully!");
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        })
        .catch((err) => {
          console.log(err.message);
          toast.error("Failed to delete user. Please try again.");
        });
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
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
            {loading ? (
              <div style={{ textAlign: "center", margin: "20px 0" }}>
                <PulseLoader color="#000000" size={20} />
              </div>
            ) : (
              <table
                className="table table-bordered"
                style={{ minWidth: "850px" }}
              >
                <thead className="bg-dark text-white">
                  <tr id={styles.headerRow}>
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
                    currentUsers.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.email}</td>
                        <td>{user.isAdmin ? "Admin" : "User"}</td>
                        <td>
                          <div
                            className="d-flex justify-content-center align-items-center"
                            style={{ gap: "10px" }} // Add spacing between icons
                          >
                            <a
                              onClick={() => {
                                loadEdit(user.id);
                              }}
                            >
                              <EditIcon />
                            </a>
                            <a
                              onClick={() => {
                                deleteFunction(user.id);
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
                  <tr>
                    <TablePagination
                      totalItems={filteredUsers.length}
                      itemsPerPage={usersPerPage}
                      currentPage={currentPage}
                      paginate={paginate}
                      colSpan={7} // table column count
                    />
                  </tr>
                </tfoot>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UsersTable;
