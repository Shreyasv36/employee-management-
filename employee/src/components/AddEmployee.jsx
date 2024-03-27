import React, { useEffect, useState } from "react";
import axios from "axios";

const AddEmployee = () => {
  const [category, setCategory] = useState([]);
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/add_categary")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("password", employee.password);
    formData.append("address", employee.address);
    formData.append("salary", employee.salary);
    formData.append("image", employee.image);   
    formData.append("category", employee.category);

    axios
      .post("http://localhost:3000/auth/add_employee", formData)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className=" mt-3 d-flex justify-content-center align-items-center h-80 ">
        <div className="p-3 rounded w-45 border ">
          <h2>EMPLOYEE PAGE</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name">
                <strong>NAME:</strong>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="off"
                placeholder="Enter name"
                className="form-control rounded-0"
                onChange={(e) =>
                  setEmployee({ ...employee, name: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>email:</strong>
              </label>
              <input
                type="text"
                id="email"
                name="email"
                autoComplete="off"
                placeholder="Enter email"
                className="form-control rounded-0"
                onChange={(e) =>
                  setEmployee({ ...employee, email: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password1">
                <strong>Password:</strong>
              </label>
              <input
                type="password"
                id="password1"
                name="password"
                autoComplete="off"
                placeholder="Enter password"
                className="form-control rounded-0"
                onChange={(e) =>
                  setEmployee({ ...employee, password: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="salary">
                <strong>Salary:</strong>
              </label>
              <input
                type="text"
                id="salary"
                name="salary"
                autoComplete="off"
                placeholder="Enter salary"
                className="form-control rounded-0"
                onChange={(e) =>
                  setEmployee({ ...employee, salary: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address">
                <strong>Address:</strong>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                autoComplete="off"
                placeholder="Enter address"
                className="form-control rounded-0"
                onChange={(e) =>
                  setEmployee({ ...employee, address: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                name="category"
                id="category"
                defaultValue=""
                className="form-select"
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    category: category.find(
                      (c) => c.id === parseInt(e.target.value)
                    ).name,
                  })
                }
              >
                <option value="" disabled>
                  Select Category
                </option>
                {category.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-12 mb-3">
              <label className="form-label" htmlFor="inputGroupFile01">
                Select Image
              </label>
              <input
                type="file"
                className="form-control rounded-0"
                id="inputGroupFile01"
                name="image"
                onChange={(e) =>
                  setEmployee({ ...employee, image: e.target.files[0] })
                }
              />
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
