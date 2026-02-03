import React from "react";

// Styles
import "./Todo.scss";

/*      
    This is the main component.
    Which will perform CRUD operations
*/
const Todo = () => {
  return (
    <div className="todo-container">
      <div className="todo">
        <Navbar />
        <MainRoute />
      </div>
    </div>
  );
};

export default Todo;
