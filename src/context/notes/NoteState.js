import { useState } from "react";
import NoteContext from "./addressContext";

const NoteState = (props) => {

  const host = "http://localhost:9090"
  const notesInital = []

  const [notes, setNotes] = useState(notesInital)

  const addAddress = async (firstName, lastName, email,phone, address1, address2,city, state, country, pincode) => {
    const newNote = {
      firstName:firstName, lastName:lastName, email:email,phone:phone, address1:address1, address2:address2,city:city, state:state, country:country, pincode:pincode
    }
    const url = `${host}/addresses/add`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify(newNote)
    })
    const json = await response.json()
    let allnotes = JSON.parse(JSON.stringify(notes))
    allnotes.push(json)
    setNotes(allnotes)
  }

  const deleteAddress = async (id) => {
    const url = `${host}/addresses/delete/${id}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    })
    const json = await response.json()
    window.location.reload();
}

  //update the notes
  const editAddress = async (id,user_id,firstName, lastName, email,phone, address1, address2,city, state, country, pincode) => {
    debugger
    const newNote = {
      ID:id,user_id:user_id,firstName:firstName, lastName:lastName, email:email,phone:phone, address1:address1, address2:address2,city:city, state:state, country:country, pincode:pincode
    }
    const url = `${host}/addresses/update`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify(newNote)
    })
    const json = await response.json()
    const changedNote = await json.note;
  }

  const fetchAllNotes = async () => {
    const url = `${host}/addresses/list`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    })
    const json = await response.json()
    setNotes(json)
    console.log("notes::::",notes)
  }


  return (
    <NoteContext.Provider value={{ notes, addAddress, deleteAddress, editAddress, fetchAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState