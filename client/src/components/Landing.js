import React from 'react';
import { divider_style } from './css';

function Landing() {
  return (
    <>
      <div className="section">
        <h2 className="center-align">To-Do List App</h2>
      </div>
      <div className="divider" style={divider_style}></div>
      <div>
        <h5 className="center-align">
          A preview of the app, show examples of todos functionality
        </h5>
      </div>
    </>
  );
}

export default Landing;
