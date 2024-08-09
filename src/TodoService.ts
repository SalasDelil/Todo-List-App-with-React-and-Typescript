import TodoTypes from "./TodoTypes";

const LOCAL_STOREAGE_KEY = "todos";

const TodoService = {
  //Get todos
  getTodos: (): TodoTypes[] => {
    const todoStr = localStorage.getItem(LOCAL_STOREAGE_KEY);
    return todoStr ? JSON.parse(todoStr) : [];
  },
  //Add a todo
  addTodos: (text: string): TodoTypes => {
    const todos = TodoService.getTodos();
    const newTodo: TodoTypes = { id: todos.length + 1, text, completed: false };
    const updateTodos = [...todos, newTodo];
    localStorage.setItem(LOCAL_STOREAGE_KEY, JSON.stringify(updateTodos));
    return newTodo;
  },
  //Update a todo
  updateTodo: (todo: TodoTypes): TodoTypes => {
    const todos = TodoService.getTodos();
    const updateTodos = todos.map((td) => (td.id === todo.id ? todo : td));
    localStorage.setItem(LOCAL_STOREAGE_KEY, JSON.stringify(updateTodos));
    return todo;
  },
  //Delete tod
  deleteTodo: (id: number): void => {
    const todos = TodoService.getTodos();
    const updateTodos = todos.filter((td) => td.id !== id);
    localStorage.setItem(LOCAL_STOREAGE_KEY, JSON.stringify(updateTodos));
  },
};

export default TodoService;