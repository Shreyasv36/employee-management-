import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Employee_detail = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({}); 
    const navigate=useNavigate();
    useEffect(() => {
        axios.get("http://localhost:3000/employee/employee_deatail/"+id)
            .then(result => {
                if (result.data.Status) {
                   setEmployee(result.data.Result[0]);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]); 
    const handleLogout = () => {
      axios.get('http://localhost:3000/employee/logout')
      .then(result => {
        if(result.data.Status) {
          localStorage.removeItem("valid")
          navigate('/')
        }
      }).catch(err => console.log(err))
    }

    return (
      <div>
      <div className="p-2 d-flex justify-content-center shadow">
          <h4>Emoployee Management System</h4>
      </div>
      <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
          <img src={`http://localhost:3000/Images/`+employee.image} className='emp_det_image'/>
          <div className='d-flex align-items-center flex-column mt-5'>
              <h3>Name: {employee.name}</h3>
              <h3>Email: {employee.email}</h3>
              <h3>Salary: ${employee.salary}</h3>
          </div>
          <div>
              <button className='btn btn-primary me-2'>Edit</button>
              <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
          </div>
      </div>
  </div>
    );
};

export default Employee_detail;
