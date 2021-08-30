import React from 'react';
import './App.css';
import { hot } from 'react-hot-loader';
import axios from 'axios';

function App() {
  const makeRequest = async () => {
    const res = await axios
      .get('http://localhost:5000')
      .catch((err) => console.log(err));

    console.log(res.data);
  };

  makeRequest();
  return (
    <div className="App">
      <h1> App </h1>
    </div>
  );
}

export default hot(module)(App);
