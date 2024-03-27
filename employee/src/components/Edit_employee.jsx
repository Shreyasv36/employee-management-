import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Edit_employee = () => {
    const { id } = useParams();
    const [data, setData] = useState({
		name: '',
		email: '',
		address: '',
		salary: '',
	})
    useEffect(()=> {
		axios.get('http://localhost:3000/auth/edit_employee/' + id)
		.then(result => {
			setData({...data, name: result.data.Result[0].name,
				email: result.data.Result[0].email,
				address: result.data.Result[0].address,
				salary: result.data.Result[0].salary
			})
		})
		.catch(err =>console.log(err));
	}, [])
    const handleSubmit = (event) => {
		event.preventDefault();
		axios.put('http://localhost:3000/auth/update/'+id, data)
		.then(result => {
			if(result.data.Status === "Success") {
				console.log("done");
			}
		})
		.catch(err => console.log(err));
	}
    return (
        <div className='mt-3 d-flex justify-content-center align-items-center h-80'>
            <form className="row g-3 w-50" onSubmit={handleSubmit}>
                <div className="col-12">
                    <label htmlFor="inputName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="inputName" name="name" placeholder='Enter Name' autoComplete='off'
                       onChange={e => setData({...data, name: e.target.value})} value={data.name}/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail4" name="email" placeholder='Enter Email' autoComplete='off'
                      onChange={e => setData({...data, email: e.target.value})}  value={data.email}/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputSalary" className="form-label">Salary</label>
                    <input type="text" className="form-control" id="inputSalary" name="salary" placeholder="Enter Salary" autoComplete='off'
                      onChange={e => setData({...data, salary: e.target.value})}  value={data.salary}/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress" name="address" placeholder="1234 Main St" autoComplete='off'
                       onChange={e => setData({...data, address: e.target.value})}  value={data.address}/>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    );
};

export default Edit_employee;

