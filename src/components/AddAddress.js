import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/addressContext'

const AddAddress = (props) => {

    const context = useContext(noteContext)
    const {addAddress} = context;

    const [address, setAddress] = useState({firstName:"", lastName:"", email:"",phone:"", address1:"", address2:"",city:"", state:"", country:"", pincode:""})

const handleOnChange = (e)=>{
    setAddress({...address, [e.target.name] : e.target.value})
}

const handleAddAddress = (e)=>{
    e.preventDefault();
    addAddress(address.firstName, address.lastName, address.email, address.phone, address.address1, address.address2, address.city, address.state, address.country, address.pincode)
    props.showAlert("success", "Address Added Successfully")
    setAddress({firstName:"", lastName:"", email:"",phone:"", address1:"", address2:"",city:"", state:"", country:"", pincode:""})
    window.location.reload();
}

  return (
    <div className="container my-3">
    <h2>Add Address</h2>
    <form>
    <div className="row mb-3">
        <div className="col">
          <input type="text" placeholder='First name' className="form-control" id="firstName" name='firstName' value={address.firstName} aria-describedby="emailHelp" onChange={handleOnChange} />
        </div>
        <div className="col">
          <input type="text" placeholder='Last name' className="form-control" id="lastName" name='lastName' value={address.lastName} aria-describedby="emailHelp" onChange={handleOnChange} />
        </div>
        <div className="col">
          <input type="email" placeholder='Email' className="form-control" id="email" name='email' value={address.email} aria-describedby="emailHelp" onChange={handleOnChange} />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <input type="phone" placeholder='Phone No' className="form-control" id="phone" name='phone' value={address.phone} aria-describedby="emailHelp" onChange={handleOnChange} />
        </div>
        <div className="col">
          <input type="text" placeholder='Address line 1' className="form-control" id="address1" name='address1' value={address.address1} aria-describedby="emailHelp" onChange={handleOnChange} />
        </div>
        <div className="col">
          <input type="text" placeholder='Address line 2' className="form-control" id="address2" name='address2' value={address.address2} aria-describedby="emailHelp" onChange={handleOnChange} />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <input type="text" placeholder='City' className="form-control" id="city" name='city' value={address.city} aria-describedby="emailHelp" onChange={handleOnChange} />
        </div>
        <div className="col">
          <input type="text" placeholder='State' className="form-control" id="state" name='state' value={address.state} aria-describedby="emailHelp" onChange={handleOnChange} />
        </div>
        <div className="col">
          <input type="text" placeholder='Country' className="form-control" id="country" name='country' value={address.country} aria-describedby="emailHelp" onChange={handleOnChange} />
        </div>
        <div className="col">
          <input type="text" placeholder='Pin Code' className="form-control" id="pincode" name='pincode' value={address.pincode} aria-describedby="emailHelp" onChange={handleOnChange} />
        </div>
      </div>
      <button disabled={address.email.length<5 || address.phone.length<10 } type="submit" className="btn btn-primary" onClick={handleAddAddress} >Submit</button>
    </form>
    </div>
  )
}

export default AddAddress
