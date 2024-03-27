import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Home = () => {
  const [admincount, setadmincount] = useState(0);
  const [employeecount, setemployeecount] = useState(0);
  const [salarycount, setsalarycount] = useState(0);
  const [category, setcategory] = useState([]);
  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    adminselect();
  });
  const adminselect = () => {
    axios
      .get("http://localhost:3000/auth/admin_select")
      .then((result) => {
        if (result.data.Status) {
          setcategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const adminCount = () => {
    axios
      .get("http://localhost:3000/auth/admin_count")
      .then((result) => {
        if (result.data.Status) {
          setadmincount(result.data.Result[0].admin);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const employeeCount = () => {
    axios
      .get("http://localhost:3000/auth/employee_count")
      .then((result) => {
        if (result.data.Status) {
          setemployeecount(result.data.Result[0].employee);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const salaryCount = () => {
    axios
      .get("http://localhost:3000/auth/salary_count")
      .then((result) => {
        if (result.data.Status) {
          setsalarycount(result.data.Result[0].salary);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1 m-3">
            <h4>Admin</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total</h5>
            <h5>{admincount}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className=" text-center pb-1">
            <h4>Employee</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total</h5>
            <h5>{employeecount}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Salary</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total</h5>
            <h5>{salarycount}</h5>
          </div>
        </div>
      </div>
      <table className="table table-striped ">
        <thead>
          <tr>
            <th>name</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {category.map((e) => (
            <tr key={e.id}>
              <td>{e.email}</td>
              <td>
                <button  className="btn btn-info btn-sm me-3">Edit</button>
                <button className="btn btn-warning btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
