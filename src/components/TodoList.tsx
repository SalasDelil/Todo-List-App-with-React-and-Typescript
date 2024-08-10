import { useState } from "react";
import TodoTypes from "../TodoTypes";
import TodoService from "../TodoService";
import TodoForm from "./TodoForm";
import { FcFullTrash } from "react-icons/fc";
import { MdCancel, MdEditNote } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

import '../css/TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>("");

  const handleEditStart = (id: number, text: string) => {
    setEditingTodoId(id);
    setEditedTodoText(text);
  };

  const handleEditCancel = () => {
    setEditingTodoId(null);
    setEditedTodoText("");
  };

  //Save changes
  const handleEditSave = (id: number) => {
    if (editedTodoText.trim() !== "") {
      const updateTodo = TodoService.updateTodo({
        id,
        text: editedTodoText,
        completed: false,
      });
      setTodos((prevTodo) =>
        prevTodo.map((todo) => (todo.id === id ? updateTodo : todo))
      );

      setEditingTodoId(null);
      setEditedTodoText("");
    }
  };

  //Delete handeling function
  const handleDeleteTodo = (id: number) => {
    TodoService.deleteTodo(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => id !== todo.id));
  };

  return (
    <div className="todoContainer">
      <TodoForm setTodos={setTodos} />
      <div>
        {todos.map((todo) => (
          <div className="item" key={todo.id}>
            {editingTodoId === todo.id ? (
              <div className="editText">
                <input
                  type="text"
                  value={editedTodoText}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                  autoFocus={true}
                />
                <button
                  className="saveEditBtn"
                  title="Save"
                  onClick={() => handleEditSave(todo.id)}
                >
                  <FaCheckCircle size={"1.5rem"} />
                </button>
                <button
                  className="cancelEditBtn"
                  title="Cancel"
                  onClick={() => handleEditCancel()}
                >
                  <MdCancel size={"1.5rem"} />
                </button>
              </div>
            ) : (
              <div className="todoItem">
                <span className="todoText">{todo.text}</span>
                <button
                  className="editBtn"
                  title="Edit"
                  onClick={() => handleEditStart(todo.id, todo.text)}
                >
                  <MdEditNote size={"1.5rem"} />
                </button>
                <button
                  className="deleteBtn"
                  title="Delete"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  <FcFullTrash size={"1.5rem"}/>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
