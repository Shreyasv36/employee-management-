import './App.css';
import Login from './components/login';
import Dashboard from './components/Dashboard'; 
import Home from './components/Home';
import Profile from './components/Profile';
import Categary from './components/Categary';
import Employee from './components/Employee';
import AddCategary from './components/AddCategary';
import AddEmployee from './components/AddEmployee';
import Edit_employee from './components/Edit_employee';
import Employeelogin from './components/Employeelogin';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Employee_detail from './components/Employee_detail';
import Main from './components/Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/adminlogin' element={<Login />} />
        <Route path='/employeelogin' element={<Employeelogin />} />
        <Route path='/employee_detail/:id' element={<Employee_detail/>} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='/dashboard' element={<Home />} />
          <Route path='/dashboard/employee' element={<Employee />} />
          <Route path='/dashboard/categary' element={<Categary />} />
          <Route path='/dashboard/profile' element={<Profile />} />
          <Route path='/dashboard/add_categary' element={<AddCategary/>} />
          <Route path='/dashboard/add_employee' element={<AddEmployee/>} />
          <Route path='/dashboard/edit_employee/:id' element={<Edit_employee/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

