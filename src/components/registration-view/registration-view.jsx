import React, { useState } from 'react';
import Proptypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { Link } from 'react-router-dom';

import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('')


  const handleRegister = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    axios.post('https://flixinfo.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }).then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self');
    }).catch(e => {
      console.log('error registering the user')
    });
  }

  return (
    <Form>
      <Form.Group controlId="registerUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="registerPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="registerEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" onChange={e => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="registerBirthday">
        <Form.Label>Birthdate</Form.Label>
        <Form.Control type="text" onChange={e => setBirthday(e.target.value)} />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleRegister}>Register</Button>

      <Link to={`/`}>
        <Button variant="outline-primary">Already Registered? Log In</Button>
      </Link>
    </Form>
  );
}

RegistrationView.Proptypes = {
  register: Proptypes.shape({
    Username: Proptypes.string,
    Password: Proptypes.string,
    Email: Proptypes.string,
    Birthday: Proptypes.string
  }),
  onRegister: Proptypes.func
};
