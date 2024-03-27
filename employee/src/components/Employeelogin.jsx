import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

const Employeelogin = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:3000/employee/employee_login", data)
      .then((result) => {
        if (result.data.loginStatus) {
          localStorage.setItem("valid", true)
          navigate("/employee_detail/"+result.data.id)
          
        } else {
          setError(result.data.error); 
        }
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-35 border loginForm">
        <h2>Employee Login page</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              placeholder="Enter email"
              className="form-control rounded-0"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              className="form-control rounded-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-danger mb-3">{error}</div>} 
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Employeelogin;

