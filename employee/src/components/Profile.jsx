import React from 'react'

const Profile = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 login">
      <div className="p-3 rounded w-35 border loginForm">
        <h2>Employee Login page</h2>
        <form>
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
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Submit
          </button>
        </form>
      </div>
    </div>
  );

}

export default Profile
