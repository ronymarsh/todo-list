import React from 'react';
import { icon_style } from './css';

function AddTodoBtn() {
  return (
    <a className="waves-effect waves-light btn blue-grey lighten-5 black-text">
      <i className="material-icons left" style={icon_style}>
        add
      </i>
      Add a todo
    </a>
  );
}

export default AddTodoBtn;
