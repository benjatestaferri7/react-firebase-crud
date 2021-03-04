import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import firebaseDB from '../firebase';

const Contacts = () => {
  const [contactObj, setContactObj] = useState({});
  const [currentId, setCurrentId] = useState('');

  useEffect(() => {
    firebaseDB.child('contacts').on('value', (snapshot) => {
      if (snapshot.val() != null) {
        setContactObj({
          ...snapshot.val()
        });
      } else {
        setContactObj({});
      }
    });
  }, []);

  const addOrEdit = (obj) => {
    if (currentId === '') {
      firebaseDB.child('contacts').push(obj, (err) => {
        if (err) {
          console.log(err);
        }
      });
    } else {
      firebaseDB.child(`contacts/${currentId}`).set(obj, (err) => {
        if (err) {
          console.log(err);
        } else {
          setCurrentId('');
        }
      });
    }
  };

  const onDelete = (key) => {
    if (window.confirm('Are you sure to delete=')) {
      firebaseDB.child(`contacts/${key}`).remove((err) => {
        if (err) {
          console.log(err);
        } else {
          setCurrentId('');
        }
      });
    }
  };

  return (
    <div className="bg-info">
      <div className="jumbotron jumbotron-fluid bg-dark text-light">
        <div className="container">
          <h1 className="display-4 text-center">Contact Register</h1>
        </div>
      </div>
      <div className="row m-2">
        <div className="col-md-5">
          <ContactForm {...{ addOrEdit, currentId, contactObj }} />
        </div>
        <div className="col-md-7">
          <table className="table table-borderless table-stripped">
            <thead className="thead-light">
              <tr>
                <th className="border border-dark bg-warning">Full Name</th>
                <th  className="border border-dark bg-warning">Mobile</th>
                <th  className="border border-dark bg-warning">Email</th>
                <th className="border border-dark bg-light">Buttons</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(contactObj).map((id) => {
                return (
                  <tr key={id}>
                    <td className="border border-dark ">{contactObj[id].fullName}</td>
                    <td className="border border-dark ">{contactObj[id].mobile}</td>
                    <td className="border border-dark ">{contactObj[id].email}</td>
                    <td>
                      <a
                        className="btn text-primary"
                        onClick={() => {
                          setCurrentId(id);
                        }}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </a>
                      <a
                        className="btn text-danger"
                        onClick={() => {
                          onDelete(id);
                        }}
                      >
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
    </div>
  );
};

export default Contacts;
