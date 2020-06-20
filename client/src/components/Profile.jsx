import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Profile = () => {
    const [company, setCompany] = useState('')

    useEffect(() => {
        axios.get('/companies/me', {
          headers: {
            authorization: localStorage.getItem('token')
          }
        }).then(({data}) => {
          setCompany(data)
        }).catch(console.log)
      }, [])


    return (
        <>
        <h1>Your Profile</h1>

        <p>{ company.avatar }</p>
        <p>{ company.companyName }</p>
        <p>{ company.phone }</p>
        <p>placement of services offered ?</p>

        </>
    );
}

export default Profile;