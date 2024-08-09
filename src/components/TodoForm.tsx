import React, { Dispatch, SetStateAction, useState } from "react";
import TodoService from "../TodoService";
import TodoTypes from "../TodoTypes";
import "../css/TodoForm.css";

interface PropTypes {
  setTodos: Dispatch<SetStateAction<TodoTypes[]>>;
}

const TodoForm: React.FC<PropTypes> = ({ setTodos }) => {
  const [newTodoText, setNewTodoText] = useState<string>("");

  const handleAddTodo = () => {
    if (newTodoText !== "") {
      const newTodo = TodoService.addTodos(newTodoText);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setNewTodoText("");
    }
  };

  return (
    <div className="inputForm">
      <input
        type="text"
        className="inputField"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        autoFocus={true}
        placeholder="Add task here..."
      />
      <button className="addTodoBtn" onClick={handleAddTodo}>
        Add
      </button>
    </div>
  );
};

export default TodoForm;
