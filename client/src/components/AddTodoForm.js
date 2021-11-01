import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { label_style, card_style } from './css';

function AddTodoForm({ onDone }) {
  const [title, setTitle] = useState('');
  const [dueDateText, setDueDateText] = useState('');
  const [dueDate, setDueDate] = useState('');

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
            <label style={label_style}>Title</label>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="title"
                type="text"
                className=""
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <label style={label_style}>Due Date</label>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <DatePicker
                id="dueDate"
                onSelect={(date) => {
                  setDueDateText(format(date, 'dd/MM/yyyy'));
                  setDueDate(format(date, 'yyyy-MM-dd'));
                }}
                value={dueDateText}
                autoComplete="off"
                minDate={Date.now()}
              />
            </div>
          </div>
          <button
            className="btn light-blue darken-2"
            type="submit"
            name="action"
          >
            Done
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTodoForm;
