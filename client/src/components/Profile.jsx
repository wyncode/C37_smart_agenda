import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Profile.css';
import Menu from './Menu';

const Profile = () => {
  const { setUser, setLoggedIn } = useContext(AppContext);
  const [companyNameInputShow, setCompanyNameInputShow] = useState(false);
  const [avatarInputShow, setAvatarInputShow] = useState(false);
  const [usernameInputShow, setUsernameInputShow] = useState(false);
  const [emailInputShow, setEmailInputShow] = useState(false);
  const [phoneInputShow, setPhoneInputShow] = useState(false);
  const [servicesInputShow, setServicesInputShow] = useState(false);
  const [company, setCompany] = useState('');
  const [avatar, setAvatar] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [services, setServices] = useState('');
  const history = useHistory();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios
      .get('/companies/me', {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        setCompany(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [company]);

  // const profile = async () => {
  //   await axios({
  //     method: 'PATCH',
  //     url: `/companies/${company._id}`,
  //     headers: {
  //       authorization: localStorage.getItem('token')
  //     },
  //     data: formData
  //   })
  //   .then(({ data }) => {
  //     console.log(data, 'response');
  //     setUser(data.user);
  //     localStorage.setItem('token', data.token);
  //     setLoggedIn(true);
  //     setAvatar('');
  //     setCompanyName('');
  //     setEmail('');
  //     setPhone('');
  //     setServices('');
  //    history.push("/companies/me")
  //   })
  //   .catch((e) => console.log(e.message.toString()));
  // }

  const profile = async (e) => {
    const { data } = await axios({
      method: 'PATCH',
      url: `http://localhost:8080/companies/${company._id}`,
      headers: {
        authorization: localStorage.getItem('token')
      },
      data: formData
    });
    console.log(data);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'smartagendapreset');
    axios
      .post(`https://api.cloudinary.com/v1_1/smartagend/image/upload`, data)
      .then((res) => setFormData({ ...formData, avatar: res.data.secure_url }));
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('form submitted');
    profile();
    setFormData({});
  };

  return (
    <>
      <Menu />
      <form onSubmit={handleSubmit}>
        <h1>Your Profile</h1>

        <div className="companyNameInfo">
          <p>Company Name: {company.companyName}</p>
          {companyNameInputShow && (
            <input type="text" name="companyName" onChange={handleChange} />
          )}
          <div
            style={{
              border: '1px solid black',
              borderRadius: 4,
              width: 40,
              textAlign: 'center',
              margin: 'auto',
              backgroundColor: 'white',
              color: '#e88302',
              borderColor: 'orange',
              cursor: 'pointer'
            }}
            onClick={() => setCompanyNameInputShow(!phoneInputShow)}
          >
            edit
          </div>
        </div>

        <br />

        <div className="emailInfo">
          <p>Email: {company.email}</p>
          {emailInputShow && (
            <input type="email" name="email" onChange={handleChange} />
          )}
          <div
            style={{
              border: '1px solid black',
              borderRadius: 4,
              width: 40,
              textAlign: 'center',
              margin: 'auto',
              backgroundColor: 'white',
              color: '#e88302',
              borderColor: 'orange',
              cursor: 'pointer'
            }}
            onClick={() => setEmailInputShow(!phoneInputShow)}
          >
            edit
          </div>

          <br />

          <div className="phoneInfo">
            <p>Phone: {company.phone}</p>
            {phoneInputShow && (
              <input type="text" name="phone" onChange={handleChange} />
            )}
            <div
              style={{
                border: '1px solid black',
                borderRadius: 4,
                width: 40,
                textAlign: 'center',
                margin: 'auto',
                backgroundColor: 'white',
                color: '#e88302',
                borderColor: 'orange',
                cursor: 'pointer'
              }}
              onClick={() => setPhoneInputShow(!phoneInputShow)}
            >
              edit
            </div>
          </div>

          <br />

          <button>Submit Changes</button>
        </div>
      </form>
    </>
  );
};

export default Profile;
