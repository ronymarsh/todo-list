import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTodos } from '../actions';
import Todo from './Todo';

function TodoList(props) {
  useEffect(() => {
    props.fetchTodos();
  }, []);

  const renderTodos = () => {
    return props.todos.map((todo) => {
      return <Todo todo={todo} key={todo._id} />;
    });
  };

  return <>{renderTodos()}</>;
}

function mapStateToProps({ todos }) {
  return { todos };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchTodos }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

// var createdAt = format(new Date(todo.created_at), 'dd/MM/yyyy HH:mm');
// var updatedAt = format(new Date(todo.updated_at), 'dd/MM/yyyy HH:mm');
// var dueDate = format(new Date(todo.due_date), 'dd/MM/yyyy HH:mm');
// var daysToComplete = Math.floor(
//   (new Date(todo.due_date) - Date.now()) / (1000 * 60 * 60 * 24)
// );
// var hoursToComplete = Math.floor(
//   (new Date(todo.due_date) - Date.now()) / (1000 * 60 * 60)
// );
// var isLate = daysToComplete < 0 ? true : false;

// var toComplete = daysToComplete <= 0 ? hoursToComplete : daysToComplete;
// var unit = daysToComplete <= 0 ? 'Hours' : 'Days';

// return (
//   <div className="row" key={todo._id}>
//     <div className="col s12 m6" style={col_style}>
//       <div className="card blue-grey lighten-5" style={card_style}>
//         <div className="right">
//           <i className="material-icons" style={status_icon_style}>
//             circle
//           </i>
//         </div>
//         <div className="card-content black-text">
//           <span className="card-title">{todo.title}</span>
//           <div>Created: {createdAt}</div>
//           <div>Last Updated: {updatedAt}</div>
//           <div>Due Date: {dueDate}</div>
//           <div>
//             Time To Complete:{' '}
//             <span className={isLate ? 'red-text' : ''}>
//               {toComplete} {unit}
//             </span>
//           </div>
//         </div>
//         <div className="card-action" style={card_action_style}>
//           <i
//             className="material-icons-outlined"
//             style={card_icon_style}
//             onClick={() => console.log('click!')}
//           >
//             clear
//           </i>
//           <i className="material-icons-outlined" style={card_icon_style}>
//             edit
//           </i>
//           <i className="material-icons-outlined" style={card_icon_style}>
//             done
//           </i>
//         </div>
//       </div>
//     </div>
//   </div>
// );
