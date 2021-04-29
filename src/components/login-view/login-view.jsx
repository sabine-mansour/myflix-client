import React, { useState } from 'react';
import Proptypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
  };

  const toggleRegister = (e) => {
    e.preventDefault();
    props.toggleRegister();
  };

  return (

    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
      <Button variant="outline-primary" onClick={toggleRegister}>Not Registered? Register</Button>
    </Form>

  );
}

LoginView.Proptypes = {
  user: Proptypes.shape({
    Username: Proptypes.string,
    Password: Proptypes.string
  }),
  onLoggedIn: Proptypes.func,
  toggleRegister: Proptypes.func
};