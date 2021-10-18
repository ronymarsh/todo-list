import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loggedOut } from '../actions';
import { bindActionCreators } from 'redux';
import AuthState from '../enums/AuthState';
import apiRequest from '../services/apiRequest';
import { nav_style } from './css';

function Header({ auth, user, loggedOut }) {
  const links = [
    auth == AuthState.LOGGED_OUT && {
      to: '/signup',
      text: 'Sign Up',
    },
    auth == AuthState.LOGGED_OUT && {
      to: '/signin',
      text: 'Sign In',
    },
    auth === AuthState.LOGGED_IN && {
      to: '/',
      text: 'Log Out',
      onClick: async () => {
        await apiRequest({
          method: 'POST',
          url: '/api/users/signout',
          data: {
            token: localStorage.getItem('refreshToken'),
          },
        });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        loggedOut();
      },
    },
  ]
    .filter(Boolean)
    .map((link) => (
      <li key={link.text}>
        <Link to={link.to} onClick={link.onClick}>
          {link.text}
        </Link>
      </li>
    ));
  return (
    <nav>
      <div className="nav-wrapper light-blue darken-2" style={nav_style}>
        <a href="/" className="brand-logo left">
          Todos
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li key="a">{user ? 'Hello  ' + user.userName : ''} </li>
          {links}
        </ul>
      </div>
    </nav>
  );
}

function mapStateToProps({ auth, user }) {
  return { auth, user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loggedOut }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
