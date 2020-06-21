import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import '../components/styles.css';

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
    <div>
      <form onSubmit={(e) => createAppointment(duration, service, e)}>
        <div className="form-group">
          <input
            type="text"
            name="service"
            value={service}
            placeholder="Appointment title"
            onChange={(e) => setService(e.target.value)}
            required
          />
        </div>
        <div>
          <p>Select appointment duration</p>
          <ToggleButtonGroup type="radio" name="options">
            <ToggleButton
              value="60"
              onChange={(e) => setDuration(e.target.value)}
              variant="outline-primary"
            >
              60 Mins
            </ToggleButton>
            <ToggleButton
              value="30"
              onClick={(e) => setDuration(e.target.value)}
              variant="outline-primary"
            >
              30 Mins
            </ToggleButton>
            <ToggleButton
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
          <p>Invitee</p>
          <p>{customer}</p>
        </div>
        <div>
          <p>{email}</p>
          <p>{address}</p>
          <p>{phone}</p>
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppInvitePage;
