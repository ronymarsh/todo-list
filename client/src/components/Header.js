import React from 'react';

function Header() {
  return (
    <nav>
      <div className="nav-wrapper light-blue darken-2">
        <a href="/" className="brand-logo center">
          Todos
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a href="/signup">Sign Up</a>
          </li>
          <li>
            <a href="/signin">Sign In</a>
          </li>
          <li>
            <a href="/">Log Out</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
