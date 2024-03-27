import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Category = () => {
  const [category, setCategory] = useState([]);
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
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h2>CATEGORY</h2>
      </div>
      <Link to="/dashboard/add_categary" className="btn btn-info">
        ADD CATEGORY
      </Link>
      <div className='mt-3'>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {category.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Category;
