import React, { useContext } from 'react';
import noteContext from '../context/notes/addressContext';

const NoteItems = (props) => {
  const context = useContext(noteContext);
  const { deleteAddress } = context;
  const { notes, editAddress } = props;

  return (
    <div className="container mt-4">
      <h2>Your AddressBook</h2>
      {notes.length === 0 && (
        <div className="alert alert-info text-center">Looks Empty... Please add a new Address...</div>
      )}
      {notes.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address Line 1</th>
                <th>Address Line 2</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>Pincode</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note, index) => (
                <tr key={index}>
                  <td>{note.firstName}</td>
                  <td>{note.lastName}</td>
                  <td>{note.email}</td>
                  <td>{note.phone}</td>
                  <td>{note.address1}</td>
                  <td>{note.address2}</td>
                  <td>{note.city}</td>
                  <td>{note.state}</td>
                  <td>{note.country}</td>
                  <td>{note.pincode}</td>
                  <td>
                    <i
                      className="far fa-trash-alt mx-2 text-danger"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        deleteAddress(note.id);
                        props.showAlert('success', 'Address Deleted Successfully.');
                      }}
                    ></i>
                    <i
                      className="far fa-edit mx-2 text-primary"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        editAddress(note);
                      }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NoteItems;
