import React, { useState } from 'react';
import Proptypes from 'prop-types';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import { Link } from 'react-router-dom';


import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    const isValid = formValidation();
    if (isValid) {
      axios.post('https://flixinfo.herokuapp.com/login', {
        Username: username,
        Password: password
      }).then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      }).catch(e => {
        console.log('no such user')
      });
    }
  };

  const formValidation = () => {
    const usernameError = {};
    const passwordError = {};
    let isValid = true;

    if (username.trim().length < 5) {
      usernameError.usernameShort = "Username must be at least 5 characters";
      isValid = false;
    }

    if (password.trim().length < 1) {
      passwordError.passwordMissing = "You must enter a password";
      isValid = false;
    }

    setUsernameError(usernameError);
    setPasswordError(passwordError);
    return isValid;
  };
  return (
    <div className="registration-block">
      <h2>Sign In</h2>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        {Object.keys(usernameError).map((key) => {
          return (
            <div key={key} style={{ color: "red" }}>
              {usernameError[key]}
            </div>
          );
        })}

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        {Object.keys(passwordError).map((key) => {
          return (
            <div key={key} style={{ color: "red" }}>
              {usernameError[key]}
            </div>
          );
        })}

        <ButtonToolbar className="justify-content-between">

          <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
          <Link to={`/register`}>
            <Button variant="outline-primary" >Not Registered? Register</Button>
          </Link>
        </ButtonToolbar>
      </Form>

    </div>

  );
}

LoginView.Proptypes = {
  user: Proptypes.shape({
    Username: Proptypes.string,
    Password: Proptypes.string
  }),
  onLoggedIn: Proptypes.func
};