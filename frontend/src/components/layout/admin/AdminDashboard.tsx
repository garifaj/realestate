import { Route, Routes } from "react-router-dom"
import Sidebar from "./Sidebar"
import UsersTable from "../../../pages/user/admin/UsersTable"
import AgentsTable from "../../../pages/agent/admin/AgentsTable"
import PropertiesTable from "../../../pages/property/admin/PropertiesTable"
import BookingsTable from "../../../pages/booking/admin/BookingsTable"
import ContactUsTable from "../../../pages/contact/ContactUsTable"
import DashboardLayout from "./DashboardLayout"


const AdminDashboard = () => {
  return (
    <>
    <div className="container-fluid">
        <div className="row flex-nowrap">
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-white border-end">
                <Sidebar/>
            </div>
            <div className="col py-3 overflow-auto">
                <Routes>
                <Route path='dashboard' element={<DashboardLayout/>}/>
                <Route path='users' element={<UsersTable/>}/>
                <Route path='agents' element={<AgentsTable/>}/>
                <Route path='properties' element={<PropertiesTable/>}/>
                <Route path='bookings' element={<BookingsTable/>}/>
                <Route path='contactus' element={<ContactUsTable/>}/>
                </Routes>
            </div>
        </div>
    </div>     
    </>
  )
}

export default AdminDashboard
