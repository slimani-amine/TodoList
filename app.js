// DOM Elements
const todoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");

// Add Todo Function
addTodoButton.addEventListener("click", () => {
  const todoText = todoInput.value;
  if (todoText !== "") {
    const li = document.createElement("li");
    li.textContent = todoText;

    // Add Toggle Complete
    li.addEventListener("click", () => {
      li.classList.toggle("completed");
    });

    // Optional: Add Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button"; // Add the delete-button class
    deleteButton.addEventListener("click", () => {
      todoList.removeChild(li);
      saveTodos(); // Save todos after deletion
    });

    li.appendChild(deleteButton);
    todoList.appendChild(li);
    todoInput.value = "";

    saveTodos();
  }
});

// Task 12: Store Todos in Local Storage

// Save todos to localStorage
function saveTodos() {
  const todos = [];
  todoList.querySelectorAll("li").forEach((li) => {
    todos.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Load todos from localStorage
function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;

    // Add Toggle Complete
    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTodos(); // Save todos after toggling
    });

    if (todo.completed) {
      li.classList.add("completed");
    }

    // Optional: Add Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button"; // Add the delete-button class
    deleteButton.addEventListener("click", () => {
      todoList.removeChild(li);
      saveTodos(); // Save todos after deletion
    });

    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });
}

// Load todos when the page loads
document.addEventListener("DOMContentLoaded", loadTodos);
