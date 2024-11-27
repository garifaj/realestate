import { Route, Routes } from 'react-router-dom';
import './App.css';
import  HomePage from './components/layout/HomePage';
import { UserContextProvider } from './context/UserContext';
import UsersTable from './pages/user/UsersTable';
import CreateUser from './pages/user/CreateUser';
import EditUser from './pages/user/EditUser';
import AgentsTable from './pages/agent/AgentsTable';
import EditAgent from './pages/agent/EditAgent';
import CreateAgent from './pages/agent/CreateAgent';
import PropertiesTable from './pages/property/PropertiesTable';
import EditProperty from './pages/property/EditProperty';
import CreateProperty from './pages/property/CreateProperty';

function App() {
 

  return (
    <UserContextProvider>
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

      </Routes>
    </UserContextProvider>
  )
}

export default App;
