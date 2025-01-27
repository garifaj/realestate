import { useEffect, useState } from "react";
import { ContactUs } from "../../../context/types";
import axios from "axios";


const MessagesReportTable = () => {
    const [messages, setMessages] = useState<ContactUs[]>([]);

    useEffect(() => {
        async function fetchMessages() {
            try {
                const response = await axios.get("http://localhost:5075/api/contactus");
                setMessages(response.data.slice(-4)); 
            } catch (error) {
                console.error(error)
            }
        }

        fetchMessages();
    }, [])
  return (
    <>
    <div className="table-responsive pt-3 pb-1">
        <table className="table" style={{ minWidth: "550px" ,maxWidth:"100%"}}>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {messages.length === 0 ? (
                    <tr>
                    <td
                      colSpan={5}
                      style={{ textAlign: "center", fontSize: "25px" }}
                    >
                      No messages found!
                    </td>
                  </tr>
                ) : (
                    messages.map((message) => (
                    <tr key={message.id}>
                        <td>{message.id}</td>
                        <td style={{minWidth: "7rem"}}>
                            {message.name} {message.surname}
                        </td>
                        <td>
                            {message.email}
                        </td>
                        <td style={{maxWidth: "12rem"}}> {message.subject}</td>
                        <td style={{maxWidth: "12rem"}}>
                            <div style={{maxWidth: "100%",
                            wordWrap: "break-word",
                            overflowWrap: "break-word",
                            whiteSpace: "normal",
                            lineHeight: "1.2rem",
                            maxHeight: "3.6rem", // 3 lines * line height
                            overflow: "hidden", 
                            textOverflow: "ellipsis"}}>
                            {message.message}
                            </div>
                            
                        </td>
                        <td>
                            <span className={`badge my-2 py-1 ${message.isAnswered ? "bg-success" : "bg-danger"}`}>
                                {message.isAnswered ? "Answered" : "Not answered"}
                            </span>
                            
                        </td>
                    </tr>
                    ))
                )}
                
            </tbody>
        </table>
    </div>      
    </>
  )
}

export default MessagesReportTable
