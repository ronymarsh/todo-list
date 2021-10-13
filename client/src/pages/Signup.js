import React, { useState } from 'react';
import useRequest from '../services/useRequest';
import storeTokens from '../services/storeTokens';

function Signup(props) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { doRequest, errors } = useRequest({
    method: 'POST',
    url: '/api/users/signup',
    data: {
      userName,
      email,
      password,
    },
    history: props.history,
    onSuccess: (tokens, history) => {
      storeTokens(tokens);
      history.push('/');
      props.updateUser();
      props.loggedIn();
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <div className="container">
      <div className="row">
        <h4>Sign Up</h4>
      </div>
      <form onSubmit={onSubmit} className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input
              id="userName"
              type="text"
              className=""
              onChange={(event) => setUserName(event.target.value)}
            />
            <label htmlFor="userName">User Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="email"
              type="email"
              className=""
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="password"
              type="password"
              className="validate"
              onChange={(event) => setPassword(event.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        {errors}
        <button className="btn light-blue darken-2" type="submit" name="action">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
