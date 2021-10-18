import React, { useState } from 'react';
import useRequest from '../services/useRequest';
import storeTokens from '../services/storeTokens';

import * as actions from '../actions';
import { connect } from 'react-redux';

function Signin(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { doRequest, errors } = useRequest({
    method: 'POST',
    url: '/api/users/signin',
    data: {
      email,
      password,
    },
    history: props.history,
    onSuccess: (tokens, history) => {
      storeTokens(tokens);
      history.push('/dashboard');
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
        <h4>Welcome Back</h4>
      </div>
      <form onSubmit={onSubmit} className="col s12">
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
          Sign In
        </button>
      </form>
    </div>
  );
}

export default connect(null, actions)(Signin);
