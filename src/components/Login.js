import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Login = (props) => {
  const host = "http://localhost:9090";

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  let history = useHistory();

  const login = async (e) => {
    e.preventDefault();
    const url = `${host}/users/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const json = await response.json();
    console.log("json data::",json)
    if (response.ok) {
      props.showAlert('success', 'Logged in sucessfully..')
      localStorage.setItem("token", json.token);
      history.push("/");
    } else {
      props.showAlert('danger', 'Invalid Credentials..')
    }
  };

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h2>Login to AddressBook</h2>
      <form className="my-3" onSubmit={login}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={credentials.email}
            name="email"
            aria-describedby="emailHelp"
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="current-password"
            className="form-control"
            value={credentials.password}
            name="password"
            id="password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
