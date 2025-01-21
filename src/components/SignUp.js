import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const SignUp = (props) => {

  const host = "http://localhost:9090";
  const [userData, setUserData] = useState({email: "", password: "", cpassword: "" })
  const history = useHistory()

  const signUp = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.cpassword) {
      alert("Password does not match..")
    } else {
      const url = `${host}/users/register`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("dataaaaa:::",data)
        props.showAlert('success', 'Signup sucessfully..')
        localStorage.setItem("token", data.token)
        history.push('/')
      }
      else {
        props.showAlert('danger', 'Failed to create account...')
      }
    }
  }

  const handleOnChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  return (
    <div className='container my-3'>
      <h2>Create an account to use AddressBook</h2>
      <form className='my-3' onSubmit={signUp}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={handleOnChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="new-password" className="form-control" id="password" name='password' required minLength={5} onChange={handleOnChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="new-password" className="form-control" id="cpassword" name='cpassword' required minLength={5} onChange={handleOnChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default SignUp
