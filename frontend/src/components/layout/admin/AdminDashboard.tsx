import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"



const AdminDashboard = () => {
  return (
    <>
    <div className="container-fluid">
        <div className="row flex-nowrap">
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-white shadow-sm" style={{ position: 'sticky', top: 0, height: '100vh' }}>
              <Sidebar/>
            </div>
            <div className="col py-3 overflow-auto">
                <Outlet/>
            </div>
        </div>
    </div>     
    </>
  )
}

export default AdminDashboard
