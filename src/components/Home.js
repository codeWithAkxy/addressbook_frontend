import React from 'react'
import AddressBook from './Addresses'

export default function Home(props) {

  return (
    <div>
      <AddressBook showAlert = {props.showAlert}/>
    </div>
  )
}
