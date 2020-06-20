import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/styles.css';

const AppInvitePage = () => {
  const [duration, setDuration] = useState('');
  const [service, setService] = useState('');
  const [apiData, setApiData] = useState({});

  useEffect(() => {
    const getData = async () => {
      axios
        .get(`http://localhost:8080/customers/all/`, {
          headers: {
            authorization: localStorage.getItem('token')
          }
        })
        .then((response) => {
          console.log(response.data);
          setApiData(response.data[2]);
        });
    };
    getData();
  }, []);

  const email = apiData.email;
  console.log(email);

  const createAppointment = async (duration, service, e) => {
    e.preventDefault();
    await axios({
      method: 'POST',
      url: `http://localhost:8080/appointments?email=${email}`,
      data: {
        duration,
        service
      }
    })
      .then(({ data }) => {
        console.log(data);
        localStorage.getItem('token');
        setDuration('');
        setService('');
      })
      .catch((e) => console.log(e.message.toString()));
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
        <div className="btn-group" data-toggle="buttons">
          <label className="btn btn-primary">
            <input
              type="radio"
              name="options"
              value="60"
              onChange={(e) => setDuration(e.target.value)}
              required
            />
            60 Mins
          </label>
          <label className="btn btn-primary">
            <input
              type="radio"
              name="options"
              value="30"
              onClick={(e) => setDuration(e.target.value)}
            />
            30 Mins
          </label>
          <label className="btn btn-primary">
            <input
              type="radio"
              name="options"
              value="15"
              onClick={(e) => setDuration(e.target.value)}
            />
            15 Mins
          </label>
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
