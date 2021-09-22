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

import Header from './components/Header';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Signin from './pages/Signin';

function App() {
  const makeRequest = async () => {
    const res = await axios
      .get('/api/users/currentuser')
      .catch((err) => console.log(err));

    console.log(res);
  };

  makeRequest();
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
      </div>
    </BrowserRouter>
  );
}

export default App;
