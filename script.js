const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clrBtn = document.querySelector(".clear-task");
const fillter = document.querySelector("#fillter");
const taskInput = document.querySelector("#task");

loadEventListener();

function loadEventListener() {
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);

  taskList.addEventListener("click", removeTask);

  clrBtn.addEventListener("click", clearTask);

  fillter.addEventListener("keyup", fillterTask);
}

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));

    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = "<i class='fa fa-remove'></i>";
    li.appendChild(link);

    taskList.appendChild(li);
  });
}

function fillterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach((task) => {
    const item = task.firstChild.textContent;
    if (item.toLocaleLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

function clearTask() {
  //taskList.innerHTML = "";  //медленный
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("are you sure")) {
      e.target.parentElement.parentElement.remove();
      removeTaskFromLocalStorrage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorrage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(e) {
  if (taskInput.value === "") {
    alert("add Task");
  }

  const li = document.createElement("li");
  li.className = "collection-item";

  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement("a");
  link.className = "delete-item secondary-content";

  link.innerHTML = "<i class='fa fa-remove'></i>";

  li.appendChild(link);

  taskList.appendChild(li);
  storeTaskInLocalStorege(taskInput.value);

  taskInput.value = "";

  e.preventDefault();
}
function storeTaskInLocalStorege(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function fillterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach((task) => {
    const item = task.firstChild.textContent;
    if (item.toLocaleLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
