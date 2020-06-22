import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import '../css/contact.css';

const AppInvitePage = () => {
  const [duration, setDuration] = useState('');
  const [service, setService] = useState('');

  const [apiData, setApiData] = useState({});
  let pathArray = window.location.pathname.split('/');
  let email = pathArray[2];
  let id = pathArray[3];
  let newId = [];

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
  });

  const customer = apiData.customer;
  const address = apiData.address;
  const phone = apiData.phone;
  const history = useHistory();

  const createAppointment = async (duration, service, e) => {
    e.preventDefault();
    await axios({
      method: 'POST',
      url: `http://localhost:8080/appointments?email=${email}`,
      data: {
        duration,
        service,
        customerName: `${customer}`
      },
      headers: {
        authorization: `${localStorage.getItem('token')}`
      }
    })
      .then(({ data }) => {
        console.log(data);
        localStorage.getItem('token');
        setDuration('');
        setService('');
        newId = data._id;
      })
      .catch((e) => console.log(e.message.toString()));
    history.push(`/invite-successful/${newId}`);
  };

  return (
    <div className="invite">
      <form
        autocomplete="off"
        onSubmit={(e) => createAppointment(duration, service, e)}
      >
        <div className="form-group" style={{ paddingLeft: '90px' }}>
          <input
            className="textbar"
            type="text"
            name="service"
            value={service}
            placeholder="Appointment Title"
            onChange={(e) => setService(e.target.value)}
            required
          />
        </div>
        <div>
          <h6>Select Appointment Duration</h6>
          <ToggleButtonGroup type="radio" name="options">
            <ToggleButton
              className="button"
              value="60"
              onChange={(e) => setDuration(e.target.value)}
              variant="outline-primary"
            >
              60 Mins
            </ToggleButton>
            <ToggleButton
              className="button"
              value="30"
              onClick={(e) => setDuration(e.target.value)}
              variant="outline-primary"
            >
              30 Mins
            </ToggleButton>
            <ToggleButton
              className="button"
              value="15"
              onClick={(e) => setDuration(e.target.value)}
              variant="outline-primary"
            >
              15 Mins
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <br />
        <div>
          <h4 className="heading">Invitee</h4>
          <h2 style={{ color: '#5e8187' }}>{customer}</h2>
        </div>
        <div>
          <h4 className="heading">Email</h4>
          <h2 style={{ color: '#5e8187' }}>{email}</h2>
          <h4 className="heading">Address</h4>
          <h2 style={{ color: '#5e8187' }}>{address}</h2>
          <h4 className="heading">Phone</h4>
          <h2 style={{ color: '#5e8187' }}>{phone}</h2>
        </div>
        <div>
          <Button type="submit" className="button">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AppInvitePage;
