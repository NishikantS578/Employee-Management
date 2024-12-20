import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import EmployeeList from './pages/EmployeeList';
import Login from './pages/Login';
import { Box, Container, Stack, Typography, useTheme } from '@mui/material';

function App() {
  const theme = useTheme();

  const navItems = [
    { name: 'Home', route: "/", icon: <></> },
    { name: 'Employee List', route: "employee_list", icon: <></> },
  ];

  return (
    <Stack minHeight={"100vh"}>
      <NavBar appName='EMS' navItems={navItems}></NavBar>

      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/employee_list' element={<EmployeeList></EmployeeList>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='*' element={<>Page Not Exists</>}></Route>
      </Routes>
      <Box marginTop={"auto"} bgcolor={ theme.palette.secondary.main } padding={1} >
        <Typography variant='body2' color='white' textAlign={"center"} >
          NishikantS578
        </Typography>
      </Box>
    </Stack >
  )
}

export default App
