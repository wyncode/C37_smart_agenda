import React, { useState } from 'react';
import axios from 'axios';
import Menu from './Menu';

const CreateCustomer = () => {
  const [customer, setCustomer] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const createCustomer = async (customer, phone, email, address, e) => {
    e.preventDefault();
    await axios({
      method: 'POST',
      url: `http://localhost:8080/customers`,
      data: {
        customer,
        phone,
        address,
        email
      },
      headers: {
        authorization: `${localStorage.getItem('token')}`
      }
    })
      .then(() => {
        setCustomer('');
        setPhone('');
        setEmail('');
        setAddress('');
        window.alert('Customer added.');
      })
      .catch((e) => console.log(e.message.toString()));
  };
  return (
    <>
      <Menu />
      <h4 className="clients_title">Adding a new client</h4>
      <form
        className="form-group"
        onSubmit={(e) => createCustomer(customer, phone, email, address, e)}
      >
        <div>
          <p>Customer Name</p>
          <div className="form-group">
            <input
              type="text"
              name="Name"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              required
            />
          </div>
          <p>Phone</p>
          <div className="form-group">
            <input
              type="text"
              name="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <p>Email</p>
          <div className="form-group">
            <input
              type="text"
              name="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <p>Address</p>
          <div className="form-group">
            <input
              type="text"
              name="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-secondary button">
              Send
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateCustomer;
