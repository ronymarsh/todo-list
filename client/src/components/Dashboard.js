import React, { useState } from 'react';
import { divider_style, list_style } from './css';
import Todo from './Todo';
import AddTodoBtn from './AddTodoBtn';
import AddTodoForm from './AddTodoForm';

function Dashboard() {
  const [showAddBtn, setShowAddBtn] = useState(true);

  return (
    <>
      <div className="section">
        <h2 className="center-align center">My List</h2>
      </div>

      <div className="divider" style={divider_style}></div>

      <div className="section center-align" style={list_style}>
        {showAddBtn ? (
          <AddTodoBtn onAdd={() => setShowAddBtn(false)} />
        ) : (
          <AddTodoForm onDone={() => setShowAddBtn(true)} />
        )}
      </div>
      <div className="section" style={list_style}>
        <Todo />
      </div>
    </>
  );
}

export default Dashboard;
