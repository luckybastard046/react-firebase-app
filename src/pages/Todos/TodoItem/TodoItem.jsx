import React from "react";

import { db } from "../../../firebase/config";

import "./TodoItem.scss";

const TodoItem = (props) => {
  const { todoName, important, id } = props.todo;

  const todoDocRef = db.collection("todos").doc(id);

  const changeImportance = () => {
    /*
      Every todo doc contains one variable called
      important which is used to indicate important
      todos.

      Here we are updating that variable.

      If that variable is not present in that doc
      then it will automatically create that and assign 
      false to it. 

    */
    todoDocRef
      .update({
        important: !important,
      })
      .then(() => {
        // console.log("importance updated");
      })
      .catch((err) => console.error(err));
  };

  const deleteTodo = async () => {
    /*
      This is function deletes the todo permanently
      from the firestore.
    */

    await todoDocRef
      .delete()
      .then(() => {
        // console.log("todo deleted");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={`todo-item${important ? " imp" : ""}`}>
      <header>
        <div className="options">
          <div onClick={changeImportance} className="option">
          </div>

          <div onClick={deleteTodo} className="option">
          </div>
        </div>
      </header>
      <section>
        <h1 className="todo-name">{todoName}</h1>
      </section>
    </div>
  );
};

export default TodoItem;
