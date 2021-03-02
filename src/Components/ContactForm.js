import React, { useState, useEffect } from 'react';

const ContactForm = () => {
  const initialFIeldValues = {
    fullName: '',
    mobile: '',
    email: '',
    address: ''
  };

  const [values, setValues] = useState(initialFIeldValues);

  return (
    <form autoComplete="off">
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fas fa-user"></i>
          </div>
        </div>
        <input
          className="form-control"
          placeholder="Full Name"
          name="fullName"
          value={values.fullName}
        />
      </div>

      <div className="form-row">
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-mobile"></i>
            </div>
          </div>
          <input
            className="form-control"
            placeholder="Mobile"
            name="mobile"
            value={values.mobile}
          />
        </div>

        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-envelope"></i>
            </div>
          </div>
          <input
            className="form-control"
            placeholder="Email"
            name="email"
            value={values.email}
          />
        </div>

      </div>
    </form>
  );
};

export default ContactForm;
