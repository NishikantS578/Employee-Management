import { BrowserRouter, Link, Route, Routes } from 'react-router'
import './App.css'
import CreateEmployee from './pages/CreateEmployee'
import Employee from './pages/Employee'
import EmployeeList from './pages/EmployeeList'
import Login from './pages/Login'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to='/'><img className='h-[100px] w-[100px]' src='/favicon.ico'></img></Link>
        <Link to='/create-employee'>Create Employee</Link>
        <Link to='/employees'>Employee List</Link>
        <Link to='/employee'>Employee</Link>
        <Link to='/login'>Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-employee" element={<CreateEmployee />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
