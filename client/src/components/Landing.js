import React from 'react';
import { Redirect } from 'react-router-dom';
import { divider_style } from './css';
import * as actions from '../actions';
import AuthState from '../enums/AuthState';
import { connect } from 'react-redux';

function Landing({ auth, user }) {
  const renderRedirect = () => {
    if (auth == AuthState.LOGGED_IN) return <Redirect to="/dashboard" />;
  };
  return (
    <>
      {renderRedirect()}
      <div className="section">
        <h2 className="center-align">To-Do List App</h2>
      </div>
      <div className="divider" style={divider_style}></div>
      <div>
        <h5 className="center-align">
          A preview of the app, show examples of todos functionality
        </h5>
      </div>
    </>
  );
}
function mapStateToProps({ auth, user }) {
  return { auth, user };
}
export default connect(mapStateToProps, actions)(Landing);
