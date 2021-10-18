import React from 'react';
import { divider_style, icon_style } from './css';

function Dashboard() {
  return (
    <>
      <div className="section">
        <h2 className="center-align center">My List</h2>
      </div>

      <div className="divider" style={divider_style}></div>

      <div className="section center-align">
        <a className="waves-effect waves-light btn blue-grey darken-3">
          <i className="material-icons left" style={icon_style}>
            add
          </i>
          Add a todo
        </a>
      </div>
      <h5 className="center-align">A list of all my todos</h5>
    </>
  );
}

export default Dashboard;
