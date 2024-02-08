import { useState, useEffect } from "react";
import Header from "./Header";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import WavingHandIcon from "@mui/icons-material/WavingHand";

const API_BASE = "http://localhost:3001";

function App() {
  let userIsRegistered = true;
  const [todos, setTodos] = useState([]);
  //Popup for the Add button
  const [popupActive, setPopupActive] = useState(false);

  //When Popup opens the Input field
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    //Code to Run after Each Render ,[] is a dependency array which makes it Run once only
    GetTodos();
    console.log(todos);
  }, []);

  const GetTodos = () => {
    fetch(API_BASE + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error:", err));
  };

  const completeTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/complete/" + id).then((res) =>
      res.json()
    );

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }
        return todo;
      })
    );
  };

  const deleteTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setTodos((todos) => todos.filter((todo) => todo._id !== data._id));
  };

  const addTodo = async () => {
    const data = await fetch(API_BASE + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
      }),
    }).then((res) => res.json());

    //If we dont update the State using SetTodos it wont appear unless we refresh
    setTodos([...todos, data]);
    setPopupActive(false);
    setNewTodo("");
  };

  return (
    <div className="App">
      <Header />
      <h1>
        {" "}
        Welcome Back <WavingHandIcon />{" "}
      </h1>
      <h4>
        {" "}
        Your To Do Tasks <TaskAltIcon />{" "}
      </h4>

      <div className="todos">
        {todos.map((todo) => (
          <div
            className={"todo " + (todo.complete ? "is-complete" : "")}
            key={todo._id}
            onClick={() => {
              completeTodo(todo._id);
            }}
          >
            <div className="checkbox"></div>
            <div className="text"> {todo.text}</div>
            <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
              <DeleteIcon />
            </div>
          </div>
        ))}
      </div>

      <div className="addPopup" onClick={() => setPopupActive(true)}>
        <AddCircleIcon />
      </div>
      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>
            X
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <div className="button" onClick={addTodo}>
              Create Task
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
