import React from 'react';
import {
  col_style,
  card_style,
  card_icon_style,
  status_icon_style,
  card_action_style,
  card_content_style,
  status_div_style,
  status_text,
} from './css';
import { format } from 'date-fns';
import authApiRequest from '../services/authApiRequest';
import { connect } from 'react-redux';
import * as actions from '../actions';

function Todo(props) {
  var createdAt = format(new Date(props.todo.created_at), 'dd/MM/yyyy HH:mm');
  var updatedAt = format(new Date(props.todo.updated_at), 'dd/MM/yyyy HH:mm');
  var dueDate = format(new Date(props.todo.due_date), 'dd/MM/yyyy HH:mm');
  var daysToComplete =
    (new Date(props.todo.due_date) - Date.now()) / (1000 * 60 * 60 * 24);
  var hoursToComplete =
    (new Date(props.todo.due_date) - Date.now()) / (1000 * 60 * 60);
  daysToComplete < 0
    ? (daysToComplete = Math.ceil(daysToComplete))
    : (daysToComplete = Math.floor(daysToComplete));

  hoursToComplete < 0
    ? (hoursToComplete = Math.ceil(hoursToComplete))
    : (hoursToComplete = Math.floor(hoursToComplete));

  var isLate = daysToComplete <= 0 && hoursToComplete < 0 ? true : false;

  var toComplete = daysToComplete == 0 ? hoursToComplete : daysToComplete;
  var unit = Math.abs(daysToComplete) == 0 ? 'Hours' : 'Days';

  console.log(props.todo.title);
  console.log(daysToComplete);
  console.log(hoursToComplete);

  const onDelete = async () => {
    await authApiRequest({
      method: 'DELETE',
      url: `/api/todos/${props.todo._id}`,
      extraHeaders: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    });

    props.fetchTodos();
  };

  return (
    <div className="row" key={props.todo._id} draggable>
      <div className="col s12 m6" style={col_style}>
        <div className="card blue-grey lighten-5" style={card_style}>
          <div style={status_div_style}>
            <i className="material-icons" style={status_icon_style}>
              circle
            </i>
            <p style={status_text}>In Progress</p>
          </div>
          <div style={card_content_style}>
            <span className="card-title">{props.todo.title}</span>
            <div>Created: {createdAt}</div>
            <div>Last Updated: {updatedAt}</div>
            <div>Due Date: {dueDate}</div>
            <div>
              Time To Complete:{' '}
              <span className={isLate ? 'red-text' : ''}>
                {toComplete} {unit}
              </span>
            </div>
          </div>
          <div className="card-action" style={card_action_style}>
            <i
              className="material-icons-outlined"
              style={card_icon_style}
              onClick={onDelete}
            >
              clear
            </i>
            <i className="material-icons-outlined" style={card_icon_style}>
              edit
            </i>
            <i className="material-icons-outlined" style={card_icon_style}>
              done
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps({ todos }) {
  return { todos };
}

export default connect(mapStateToProps, actions)(Todo);
