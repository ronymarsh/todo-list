import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { label_style, card_style, formBtns_style } from './css';
import useRequest from '../services/useRequest';

import * as actions from '../actions';
import { connect } from 'react-redux';

function AddTodoForm(props) {
  const [title, setTitle] = useState('');
  const [dueDateText, setDueDateText] = useState('');
  const [dueDate, setDueDate] = useState('');

  const { doRequest, errors } = useRequest(
    {
      method: 'POST',
      url: '/api/todos/add',
      data: {
        title,
        due_date: dueDate,
      },
      onSuccess: () => {
        props.onDone();
        props.fetchTodos();
      },
    },
    true
  );

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
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
                  date.setHours(23, 59);
                  setDueDateText(format(date, 'dd/MM/yyyy'));
                  setDueDate(format(date, 'yyyy-MM-dd HH:mm'));
                }}
                value={dueDateText}
                autoComplete="off"
                minDate={Date.now()}
              />
            </div>
          </div>
          {errors}
          <div style={formBtns_style}>
            <button
              className="btn light-blue darken-2"
              onClick={() => props.onDone()}
              type="button"
            >
              Close
            </button>
            <button
              className="btn light-blue darken-2"
              type="submit"
              name="action"
            >
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default connect(null, actions)(AddTodoForm);
