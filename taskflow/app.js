// ===== Part A: state and element references =====
let tasks = [];
let currentFilter = "all";

const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const formError = document.querySelector("#form-error");
const filters = document.querySelector(".filters");
const statusMessage = document.querySelector("#status");
const list = document.querySelector("#task-list");
const counter = document.querySelector("#counter");

// ===== Part B: building one task element =====
function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = "task" + (task.completed ? " completed" : "");
  li.dataset.id = task.id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `task-${task.id}`;
  checkbox.checked = task.completed;

  const label = document.createElement("label");
  label.htmlFor = checkbox.id;
  label.textContent = task.title;

  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.className = "edit-btn";
  editBtn.textContent = "Edit";
  editBtn.setAttribute("aria-label", `Edit task: ${task.title}`);

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";
  deleteBtn.setAttribute("aria-label", `Delete task: ${task.title}`);

  li.append(checkbox, label, editBtn, deleteBtn);
  return li;
}

// ===== Part C: rendering =====
function getVisibleTasks() {
  if (currentFilter === "active") return tasks.filter((t) => !t.completed);
  if (currentFilter === "completed") return tasks.filter((t) => t.completed);
  return tasks;
}

function renderCounter() {
  const left = tasks.filter((t) => !t.completed).length;
  counter.textContent = `${left} ${left === 1 ? "task" : "tasks"} left`;
}

function renderFilters() {
  filters.querySelectorAll("button").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.filter === currentFilter));
  });
}

function renderTasks() {
  list.replaceChildren();
  const visible = getVisibleTasks();
  visible.forEach((task) => list.append(createTaskElement(task)));
  statusMessage.textContent = visible.length === 0 ? "No tasks to show." : "";
  renderCounter();
  renderFilters();
}

// ===== Part D: the actions =====
function addTask(title) {
  tasks.unshift({
    id: String(Date.now()),
    title,
    completed: false,
  });
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) task.completed = !task.completed;
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
}

// ===== Part E: events =====
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = input.value.trim();

  if (!title) {
    formError.textContent = "Please enter a task.";
    return;
  }

  formError.textContent = "";
  addTask(title);
  input.value = "";
  renderTasks();
});

filters.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  currentFilter = button.dataset.filter;
  renderTasks();
});

list.addEventListener("click", (event) => {
  const li = event.target.closest(".task");
  if (!li) return;
  const id = li.dataset.id;

  if (event.target.matches("input[type='checkbox']")) {
    toggleTask(id);
    renderTasks();
  } else if (event.target.matches(".delete-btn")) {
    if (confirm("Delete this task?")) {
      deleteTask(id);
      renderTasks();
    }
  }
});

renderTasks();