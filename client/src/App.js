import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Landing from './components/Landing';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard';
import { connect } from 'react-redux';
import * as actions from './actions';

function App(props) {
  useEffect(() => {
    props.isLoggedIn();
  }, [props.auth, props.user]);

  return (
    <Router>
      <div className="container">
        <Header />
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/dashboard" component={Dashboard} />
      </div>
    </Router>
  );
}

export default connect(null, actions)(App);
