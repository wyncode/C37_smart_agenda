import React, { useState, useParams, useEffect } from 'react';
import axios from 'axios';

const Contact = () => {
  const [apiData, setApiData] = useState({});
  let { id } = useParams();
  useEffect(() => {
    const getData = async () => {
      axios
        .get(`http://localhost:8080/customers/${id}`, {
          headers: {
            authorization: `${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          setApiData(response.data);
          console.log(response.data);
        });
    };
    getData();
  }, [id]);

  //add dynamic change
  const customer = apiData.customer;
  const email = apiData.email;
  const phone = apiData.phone;
  return (
    <div>
      <h1>Customer: {customer}</h1>
      <h1>Email: {email}</h1>
      <h1>Phone: {phone}</h1>
    </div>
  );
};

export default Contact;
