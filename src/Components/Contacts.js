import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import firebaseDB from '../firebase';

const Contacts = () => {
  const [contactObj, setContactObj] = useState({});

  useEffect(() => {
    firebaseDB.child('contacts').on('value', (snapshot) => {
      if (snapshot.val() != null) {
        setContactObj({
          ...snapshot.val()
        });
      }
    });
  }, []);

  const addOrEdit = (obj) => {
    firebaseDB.child('contacts').push(obj, (err) => {
      if (err) {
        console.log(err);
      }
    });
  };
  return (
    <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4 text-center">Contact Register</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5">
          <ContactForm addOrEdit={addOrEdit} />
        </div>
        <div className="col-md-7">
          <table className="table table-borderless table-stripped">
            <thead className="thead-light">
              <tr>
                <th>Full Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Buttons</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(contactObj).map((id) => {
                return (
                  <tr key={id}>
                    <td>{contactObj[id].fullName}</td>
                    <td>{contactObj[id].mobile}</td>
                    <td>{contactObj[id].email}</td>
                    <td>
                      <a className="btn text-primary">
                        <i className="fas fa-pencil-alt"></i>
                      </a>
                      <a className="btn text-danger">
                        <i className="far fa-trash-alt"></i>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Contacts;
