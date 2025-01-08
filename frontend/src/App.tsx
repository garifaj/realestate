import { Route, Routes } from 'react-router-dom';
import './App.css';
import { UserContextProvider } from './context/UserContext';
import UsersTable from './pages/user/admin/UsersTable';
import CreateUser from './pages/user/admin/CreateUser';
import EditUser from './pages/user/admin/EditUser';
import AgentsTable from './pages/agent/admin/AgentsTable';
import EditAgent from './pages/agent/admin/EditAgent';
import CreateAgent from './pages/agent/admin/CreateAgent';
import PropertiesTable from './pages/property/admin/PropertiesTable';
import EditProperty from './pages/property/admin/EditProperty';
import CreateProperty from './pages/property/admin/CreateProperty';
import HomePage from './components/layout/home/HomePage';
import AllProperties from './pages/property/home/AllProperties';
import BookingForm from './pages/booking/home/BookingForm';
import BookingsTable from './pages/booking/admin/BookingsTable';
import PropertyDetails from './pages/property/home/PropertyDetails';
import ScrollToTop from './components/common/home/ScrollToTop';
import ContactUsTable from './pages/contact/ContactUsTable';
import MyBookings from './pages/booking/home/MyBookings';


function App() {
 

  return (
    <UserContextProvider>
      <ScrollToTop/>
       <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path='/users' element={<UsersTable/>}/>
        <Route path="/users/edit/:userid" element={<EditUser />} />
        <Route path="/users/create" element={<CreateUser />} />

        <Route path='/agents' element={<AgentsTable/>}/>
        <Route path='/agents/edit/:agentid' element={<EditAgent/>}/>
        <Route path='/agents/create' element={<CreateAgent/>}/>

        <Route path='/properties' element={<PropertiesTable/>}/>
        <Route path='/properties/edit/:propertyid' element={<EditProperty/>}/>
        <Route path='/properties/create' element={<CreateProperty/>}/>
        <Route path='/allproperties' element={<AllProperties/>}/>
        <Route path='/property/details/:propertyid' element={<PropertyDetails/>}/>
       

        <Route path='/bookingtest' element={<BookingForm/>}/>
        <Route path='/bookings' element={<BookingsTable/>}/>
        <Route path='/mybookings' element={<MyBookings/>}/>

        <Route path='/contactus' element={<ContactUsTable/>}/>

      </Routes>
    </UserContextProvider>
  )
}

export default App;
