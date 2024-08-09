import TodoList from "./components/TodoList";
import "./css/App.css";

function App() {
  return (
    <div className="app">
      <h1 className="myTodo">
        My <strong className="todo">To-Do</strong> List
      </h1>
      <TodoList />
    </div>
  );
}

export default App;
