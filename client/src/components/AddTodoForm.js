import React, { useState, useEffect } from 'react';

import {
  col_style,
  card_style,
  card_icon_style,
  status_icon_style,
  card_action_style,
} from './css';

function AddTodoForm({ onDone }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    document
      .querySelector('.datepicker')
      .addEventListener('change', dateChangeHandler);
  }, []);

  const dateChangeHandler = (event) => setDueDate(event.target.value);

  const onSubmit = (event) => {
    event.preventDefault();
    onDone();
    console.log('TITLE:', title);
    console.log('DUE DATE:', dueDate);
  };
  return (
    <div className="card blue-grey lighten-5" style={card_style}>
      <div className="card-content black-text">
        <form onSubmit={onSubmit} className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input
                id="title"
                type="text"
                className=""
                onChange={(event) => setTitle(event.target.value)}
              />
              <label htmlFor="title">Title</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="dueDate" type="text" className="datepicker" />
              <label htmlFor="dueDate">Due Date</label>
            </div>
          </div>
          <button
            className="btn light-blue darken-2"
            type="submit"
            name="action"
          >
            Ok
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTodoForm;
