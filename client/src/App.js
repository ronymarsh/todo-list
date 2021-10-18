import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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

// <Header currentUser={user} authState={auth} />
// <Route exact path="/" component={Landing} />
// <Route exact path="/signup" component={Signup} />
// <Route exact path="/signin" component={Signin} authState={auth} />

// const [user, setUser] = useState(null);
// const [auth, setAuth] = useState(AuthState.UNKOWN);

// useEffect(() => {
//   let cancel = false;
//   const request = async () => {
//     const response = await getCurrentUser();
//     if (!cancel) {
//       setUser(response.currentUser);
//       setAuth(
//         response.currentUser ? AuthState.LOGGED_IN : AuthState.LOGGED_OUT
//       );
//     }
//   };
//   request();
//   // when component unmountes
//   return () => {
//     cancel = true;
//   };
// }, [auth]);
