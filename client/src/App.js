import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import { connect } from 'react-redux';
import * as actions from './actions';

function App(props) {
  useEffect(() => {
    props.isLoggedIn();
    props.updateUser();
  }, [props.auth, props.user]);
  return (
    <Router>
      <div className="container">
        <Header />
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
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
