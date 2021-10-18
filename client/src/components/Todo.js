import React from 'react';
import {
  col_style,
  card_style,
  card_icon_style,
  status_icon_style,
  card_action_style,
} from './css';

function Todo() {
  return (
    <div className="row">
      <div className="col s12 m6" style={col_style}>
        <div className="card blue-grey lighten-5" style={card_style}>
          <div className="right">
            <i className="material-icons" style={status_icon_style}>
              circle
            </i>
            <i className="material-icons-outlined" style={card_icon_style}>
              more_vert
            </i>
          </div>
          <div className="card-content black-text">
            <span className="card-title">Java assignment</span>
            <div>Created: 10/10/2021</div>
            <div>Last Updated: 13/10/2021 18:00</div>
            <p>Time To Complete: 4 Days</p>
          </div>
          <div class="card-action" style={card_action_style}>
            <i className="material-icons-outlined" style={card_icon_style}>
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

export default Todo;
