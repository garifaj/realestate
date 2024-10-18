import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import { UserContextProvider } from './context/UserContext';

function App() {
 

  return (
    <UserContextProvider>
       <Routes>
        <Route path="/" element={<Layout/>}>

        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App;
