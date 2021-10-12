import React from 'react';
import { connect } from 'react-redux';
import { loggedOut, updateUser } from '../actions';
import { bindActionCreators } from 'redux';
import AuthState from '../enums/AuthState';
import apiRequest from '../services/apiRequest';

function Header({ auth, user, loggedOut, updateUser }) {
  const links = [
    auth == AuthState.LOGGED_OUT && {
      href: '/signup',
      text: 'Sign Up',
    },
    auth == AuthState.LOGGED_OUT && {
      href: '/signin',
      text: 'Sign In',
    },
    auth === AuthState.LOGGED_IN && {
      href: '#',
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
        updateUser();
      },
    },
  ]
    .filter(Boolean)
    .map((link) => (
      <li key={link.text}>
        <a href={link.href} onClick={link.onClick}>
          {link.text}
        </a>
      </li>
    ));
  return (
    <nav>
      <div className="nav-wrapper light-blue darken-2">
        <a href="/" className="brand-logo center">
          Todos
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>{user ? 'Hello  ' + user.userName : ''} </li>
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
  return bindActionCreators({ loggedOut, updateUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
