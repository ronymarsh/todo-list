import React, { useMemo } from 'react';
import AuthState from '../enums/AuthState';

function Header({ currentUser, authState }) {
  const links = useMemo(
    () =>
      [
        authState == AuthState.LOGGED_OUT && {
          href: '/signup',
          text: 'Sign Up',
        },
        authState == AuthState.LOGGED_OUT && {
          href: '/signin',
          text: 'Sign In',
        },
        authState == AuthState.LOGGED_IN && { href: '/', text: 'Log Out' },
      ]
        .filter(Boolean)
        .map((link) => (
          <li key={link.text}>
            <a href={link.href}>{link.text}</a>
          </li>
        )),
    [authState]
  );
  return (
    <nav>
      <div className="nav-wrapper light-blue darken-2">
        <a href="/" className="brand-logo center">
          Todos
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {currentUser ? <li>Hi {currentUser.userName}!</li> : ''}
          {links}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
