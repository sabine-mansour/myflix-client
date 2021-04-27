import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('')


  const handleRegister = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday)
  }

  return (
    <form>
      <label>
        Username:
       <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        Email:
       <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Birthday:
       <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </label>
    </form>
  );
}

RegisterView.PropTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.date
  }),
  onRegister: PropTypes.func,
};
