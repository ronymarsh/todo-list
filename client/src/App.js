import React from 'react';
import './App.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
} from 'react-router-dom';

import AuthState from './enums/AuthState';

import Header from './components/Header';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import getCurrentUser from './services/getCurrentUser';

import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(AuthState.UNKOWN);

  useEffect(() => {
    let cancel = false;

    const request = async () => {
      const response = await getCurrentUser();
      if (!cancel) {
        setAuth(AuthState.LOGGED_IN);
        setUser(response);
      }
    };

    request();

    // when component unmountes
    return () => {
      cancel = true;
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header currentUser={user} authState={auth} />
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
      </div>
    </BrowserRouter>
  );
}

export default App;
