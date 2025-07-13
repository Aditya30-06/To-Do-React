import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./to-do.css";

export default function ToDo() {
  const [todos, setTodos] = useState([
    { task: "Sample Task", id: uuidv4(), isDone: false },
  ]);
  const [newToDo, setNewToDo] = useState("");

  const addNewTask = () => {
    setTodos((prevTodo) => [
      ...prevTodo,
      { task: newToDo, id: uuidv4(), isDone: false },
    ]);
    setNewToDo("");
  };

  const updateToDoValue = (event) => {
    setNewToDo(event.target.value);
  };

  const deleteTodo = (id) => {
    setTodos((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  const markDoneTask = (id) => {
    setTodos((prevTodo) =>
      prevTodo.map((todo) =>
        todo.id === id ? { ...todo, isDone: true } : todo
      )
    );
  };

  const unmarkDoneTask = (id) => {
    setTodos((prevTodo) =>
      prevTodo.map((todo) =>
        todo.id === id ? { ...todo, isDone: false } : todo
      )
    );
  };

  const toggleAllDone = () => {
    const allDone = todos.every((todo) => todo.isDone);
    setTodos((prevTodo) =>
      prevTodo.map((todo) => ({
        ...todo,
        isDone: !allDone,
      }))
    );
  };

  return (
   <div className="todo-container">
  <div style={{ display: "flex", alignItems: "center" }}>
    <input
      type="text"
      placeholder="Enter your Task"
      value={newToDo}
      onChange={updateToDoValue}
    />
    <button className="add-btn" onClick={addNewTask}>
      Add Task
    </button>
  </div>

  <ul>
    {todos.map((todo) => (
      <li key={todo.id}>
        <span className={`task-text ${todo.isDone ? "task-done" : ""}`}>
          {todo.task}
        </span>
        <div className="task-actions">
          <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
            Delete
          </button>
          <button
            className="task-btn"
            onClick={() =>
              todo.isDone
                ? unmarkDoneTask(todo.id)
                : markDoneTask(todo.id)
            }
          >
            {todo.isDone ? "Undo" : "Done"}
          </button>
        </div>
      </li>
    ))}
  </ul>

  <button className="toggle-all-btn" onClick={toggleAllDone}>
    {todos.every((todo) => todo.isDone)
      ? "Mark All as Undone"
      : "Mark All as Done"}
  </button>
</div>

  );
}
