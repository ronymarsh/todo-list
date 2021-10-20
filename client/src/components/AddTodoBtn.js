import React from 'react';
import { icon_style } from './css';

function AddTodoBtn({ onAdd }) {
  return (
    <button
      className="waves-effect waves-light btn blue-grey lighten-5 black-text"
      onClick={onAdd}
    >
      <i className="material-icons left" style={icon_style}>
        add
      </i>
      Add a todo
    </button>
  );
}

export default AddTodoBtn;
