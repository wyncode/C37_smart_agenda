import React, { useState } from 'react';
import axios from 'axios';

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
      .then(({ data }) => {
        localStorage.getItem('token');
        setCustomer('');
        setPhone('');
        setEmail('');
        setAddress('');
      })
      .catch((e) => console.log(e.message.toString()));
  };
  return (
    <form onSubmit={(e) => createCustomer(customer, phone, email, address, e)}>
      <div>
        <p>Name</p>
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
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateCustomer;
