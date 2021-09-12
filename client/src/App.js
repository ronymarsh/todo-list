import React from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const makeRequest = async () => {
    const res = await axios
      .get('/api/users/currentuser')
      .catch((err) => console.log(err));

    console.log(res.data);
  };

  makeRequest();
  return (
    <div className="App">
      <h1> App @@@!!! </h1>
    </div>
  );
}

export default App;
