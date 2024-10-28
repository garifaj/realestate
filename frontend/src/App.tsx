import { Route, Routes } from 'react-router-dom';
import './App.css';
import  HomePage from './components/layout/HomePage';
import { UserContextProvider } from './context/UserContext';
import UsersTable from './pages/user/UsersTable';
import CreateUser from './pages/user/CreateUser';
import EditUser from './pages/user/EditUser';

function App() {
 

  return (
    <UserContextProvider>
       <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path='/users' element={<UsersTable/>}/>
        <Route path="/users/edit/:userid" element={<EditUser />} />
        <Route path="/users/create" element={<CreateUser />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App;
