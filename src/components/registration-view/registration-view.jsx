import React, { useState } from 'react';
import Proptypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [emailError, setEmailError] = useState({});


  const handleRegister = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    const isValid = formValidation();
    if (isValid) {
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
  }

  const formValidation = () => {
    const usernameError = {};
    const passwordError = {};
    const emailError = {};
    let isValid = true;

    if (username.trim().length < 5) {
      usernameError.usernameShort = "Username must be at least 5 characters";
      isValid = false;
    }

    if (password.trim().length < 1) {
      passwordError.passwordMissing = "You must enter a password";
      isValid = false;
    }

    if (!email.includes(".") && !email.includes("@")) {
      emailError.emailNotEmail = "A valid email address is required";
      isValid = false;
    }

    setUsernameError(usernameError);
    setPasswordError(passwordError);
    setEmailError(emailError);
    return isValid;
  };

  return (
    <div className="registration-block">
      <h2>Register</h2>
      <Form>
        <Form.Group controlId="registerUsername">
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

        <Form.Group controlId="registerPassword">
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

        <Form.Group controlId="registerEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" onChange={e => setEmail(e.target.value)} />
        </Form.Group>
        {Object.keys(emailError).map((key) => {
          return (
            <div key={key} style={{ color: "red" }}>
              {emailError[key]}
            </div>
          );
        })}

        <Form.Group controlId="registerBirthday">
          <Form.Label>Birthdate</Form.Label>
          <Form.Control type="text" onChange={e => setBirthday(e.target.value)} />
        </Form.Group>

        <ButtonToolbar className="justify-content-between">

          <Button variant="primary" type="submit" onClick={handleRegister}>Register</Button>


          <Link to={`/`}>
            <Button variant="outline-primary">Already Registered? Log In</Button>
          </Link>
        </ButtonToolbar>
      </Form>
    </div>
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
