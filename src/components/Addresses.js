import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/addressContext'
import NoteItems from './AddressItems'
import AddAddress from './AddAddress'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const AddressBook = (props) => {

  const context = useContext(noteContext)
  const { notes, fetchAllNotes, editAddress } = context
  let history = useHistory()
  const [showAddAddress, setShowAddAddress] = useState(false);

  const [previousAddress, setPreviousNote] = useState({firstName:"", lastName:"", email:"",phone:"", address1:"", address2:"",city:"", state:"", country:"", pincode:"",id:"",user_id:""})

  useEffect(() => {
    console.log("fetch naddress", fetchAllNotes())
    if(!localStorage.getItem('token')){
      history.push('/login')
    }else{
      fetchAllNotes();
      console.log("fetch naddress", fetchAllNotes())
      //  eslint-disable-next-line 
    }
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)

  const handleEditAddress = (note) => {
    setPreviousNote(note)
    ref.current.click();
  }

  const handleOnChange = (e) => {
    setPreviousNote( { ...previousAddress,[e.target.name]: e.target.value })
  }

  const toggleAddAddress = () => {
    setShowAddAddress(!showAddAddress);
  };

  const HandleUpdateNote = (e)=>{
    e.preventDefault();
    editAddress(previousAddress.id,previousAddress.user_id, previousAddress.firstName, previousAddress.lastName, previousAddress.email, previousAddress.phone, previousAddress.address1, previousAddress.address2, previousAddress.city, previousAddress.state, previousAddress.country, previousAddress.pincode)
    props.showAlert('success', 'Address Successfully Edited')
    refClose.current.click();
    window.location.reload();
  }


  return (
    <>
      <div className='addressBook'>
        <button onClick={toggleAddAddress} className="btn btn-primary">
          {showAddAddress ? '\u25B2' : 'Add Address \u25BC'}
        </button>
        {showAddAddress && <AddAddress showAlert={props.showAlert} />}
      </div>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content" style={{width:'1000px',placeSelf:"center"}}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Address</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                
              <div className="row mb-3">
                  <div className="col">
                    <input type="text" placeholder='First name' className="form-control" id="firstName" name='firstName' value={previousAddress.firstName} aria-describedby="emailHelp" onChange={handleOnChange} />
                  </div>
                  <div className="col">
                    <input type="text" placeholder='Last name' className="form-control" id="lastName" name='lastName' value={previousAddress.lastName} aria-describedby="emailHelp" onChange={handleOnChange} />
                  </div>
                  <div className="col">
                    <input type="email" placeholder='Email' className="form-control" id="email" name='email' value={previousAddress.email} aria-describedby="emailHelp" onChange={handleOnChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <input type="phone" placeholder='Phone No' className="form-control" id="phone" name='phone' value={previousAddress.phone} aria-describedby="emailHelp" onChange={handleOnChange} />
                  </div>
                  <div className="col">
                    <input type="text" placeholder='Address line 1' className="form-control" id="address1" name='address1' value={previousAddress.address1} aria-describedby="emailHelp" onChange={handleOnChange} />
                  </div>
                  <div className="col">
                    <input type="text" placeholder='Address line 2' className="form-control" id="address2" name='address2' value={previousAddress.address2} aria-describedby="emailHelp" onChange={handleOnChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <input type="text" placeholder='City' className="form-control" id="city" name='city' value={previousAddress.city} aria-describedby="emailHelp" onChange={handleOnChange} />
                  </div>
                  <div className="col">
                    <input type="text" placeholder='State' className="form-control" id="state" name='state' value={previousAddress.state} aria-describedby="emailHelp" onChange={handleOnChange} />
                  </div>
                  <div className="col">
                    <input type="text" placeholder='Country' className="form-control" id="country" name='country' value={previousAddress.country} aria-describedby="emailHelp" onChange={handleOnChange} />
                  </div>
                  <div className="col">
                    <input type="text" placeholder='Pin Code' className="form-control" id="pincode" name='pincode' value={previousAddress.pincode} aria-describedby="emailHelp" onChange={handleOnChange} />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose} >Close</button>
              <button disabled={previousAddress.firstName.length<2 || previousAddress.lastName.length<2 } type="button" className="btn btn-primary" onClick={HandleUpdateNote} >Update Address</button>
            </div>
          </div>
        </div>
      </div>
      <div>
       { notes && notes.length !== 0 && <NoteItems showAlert={props.showAlert} notes={notes} editAddress={handleEditAddress} ></NoteItems> }
      </div>
    </>
  )
}

export default AddressBook