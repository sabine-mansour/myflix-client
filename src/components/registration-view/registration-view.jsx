import React, { useState } from 'react';
import Proptypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('')


  const handleRegister = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday)
    props.onRegister(username);
  }

  const toggleRegister = (e) => {
    e.preventDefault();
    props.toggleRegister();
  };

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
      <Button variant="outline-primary" onClick={toggleRegister}>Already Registered? Log In</Button>
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
  onRegister: Proptypes.func,
  toggleRegister: Proptypes.func
};
