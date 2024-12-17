import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import EmployeeList from './pages/EmployeeList';
import Login from './pages/Login';

function App() {
  const navItems = [
    { name: 'Home', route: "/", icon: <></> },
    { name: 'Employee List', route: "employee_list", icon: <></> },
  ];

  return (
    <>
      <NavBar appName='EMS' navItems={navItems}></NavBar>

      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/employee_list' element={<EmployeeList></EmployeeList>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='*' element={<>Page Not Exists</>}></Route>
      </Routes>
    </>
  )
}

export default App
