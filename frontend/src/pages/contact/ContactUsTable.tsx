import { useEffect, useState } from "react";
import { ContactUs } from "../../context/types";
import axios from "axios";
import TablePagination from "../../components/common/admin/TablePagination";
import styles from "./ContactUsTable.module.css";
import API_BASE_URL from "../../components/common/utils/config";

const ContactUsTable = () => {
  const [contacts, setContacts] = useState<ContactUs[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 4;

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await axios.get(`${API_BASE_URL}/contactus`);
        setContacts(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchContacts();
  }, []);

  const sortedContacts = contacts.sort((a, b) => b.id - a.id);

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = sortedContacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleAnswerChange = async (id: number, isAnswered: boolean) => {
    try {
      await axios.put(`${API_BASE_URL}/contactus/${id}`, {
        isAnswered: isAnswered,
      });

      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === id ? { ...contact, isAnswered } : contact
        )
      );
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleEmailClick = async (contact: ContactUs) => {
    const confirmAction = window.confirm(
      "Mark as answered and open email client?"
    );
    if (!confirmAction) return;

    try {
      await handleAnswerChange(contact.id, true);

      const subject = encodeURIComponent(
        `Stated response to your message, ${contact.name} ${contact.surname}`
      );
      const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}&su=${subject}`;
      window.open(mailtoLink, "_blank");
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="container py-5">
      <div className="card" id={styles.card}>
        <div className="card-title">
          <h2 className="mb-0 text-center">Contact Us Table</h2>
        </div>
        <div className="card-body">
          <div className={styles.divbtn}></div>
          <div className="table-responsive">
            <table
              className="table table-bordered table-hover"
              style={{ minWidth: "850px", maxWidth: "100%" }}
            >
              <thead className="bg-dark text-white">
                <tr id={styles.headerRow}>
                  <td>ID</td>
                  <td>Full Name</td>
                  <td>Email</td>
                  <td>Subject</td>
                  <td>Message</td>
                  <td>Answer</td>
                </tr>
              </thead>
              <tbody>
                {currentContacts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      style={{
                        textAlign: "center",
                        fontSize: "25px",
                      }}
                    >
                      No contacts found!
                    </td>
                  </tr>
                ) : (
                  currentContacts.map((contact) => (
                    <tr
                      key={contact.id}
                      className={
                        contact.isAnswered ? "table-success" : "table-danger"
                      }
                    >
                      <td>{contact.id}</td>
                      <td>
                        {contact.name} {contact.surname}
                      </td>
                      <td>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleEmailClick(contact);
                          }}
                          className="text-decoration-none"
                        >
                          {contact.email}
                        </a>
                      </td>
                      <td>{contact.subject}</td>
                      <td style={{ maxWidth: "40rem" }}>{contact.message}</td>
                      <td>
                        <div className="form-check form-switch d-flex justify-content-center">
                          <input
                            type="checkbox"
                            checked={contact.isAnswered}
                            onChange={(e) =>
                              handleAnswerChange(contact.id, e.target.checked)
                            }
                            className="form-check-input"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot>
                <TablePagination
                  totalItems={contacts.length}
                  itemsPerPage={contactsPerPage}
                  currentPage={currentPage}
                  paginate={paginate}
                  colSpan={6}
                />
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsTable;
