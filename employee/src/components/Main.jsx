import React from 'react'
import { useNavigate } from 'react-router-dom';
import  axios  from 'axios';
import { useEffect } from 'react';
const Main = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(() => {
      axios.get('http://localhost:3000/verify')
      .then(result => {
        if(result.data.Status) {
          if(result.data.role === "admin") {
            navigate('/dashboard')
          } else {
            navigate('/employee_detail/'+result.data.id)
          }
        }
      }).catch(err =>console.log(err))
    }, [])
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 loginPage1">
        <div className="p-4 rounded w-25 border loginForm">
          <h2 className='text-center'>Login As</h2>
          <div className='d-flex justify-content-between mt-4 mb-3'>
            <button className='btn btn-info btn-sm' onClick={() => navigate("/adminlogin")}>ADMIN</button>
            <button className='btn btn-info btn-sm' onClick={() => navigate("/employeelogin")}>EMPLOYEE</button>
          </div>
        </div>
      </div>
    );
}

export default Main
