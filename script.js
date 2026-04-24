const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

let pending = 0;
let completed = 0;

addBtn.addEventListener("click", addTask);

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    const li = document.createElement("li");

    const leftDiv = document.createElement("div");
    leftDiv.className = "task-left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.textContent = taskText;

    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            span.classList.add("completed");
            completed++;
            pending--;
        } else {
            span.classList.remove("completed");
            completed--;
            pending++;
        }
        updateCounts();
    });

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);

    const buttonDiv = document.createElement("div");
    buttonDiv.className = "task-buttons";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "editBtn";

    editBtn.addEventListener("click", function () {
        const newText = prompt("Edit your task:", span.textContent);
        if (newText !== null && newText.trim() !== "") {
            span.textContent = newText.trim();
        }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "deleteBtn";

    deleteBtn.addEventListener("click", function () {
        if (!checkbox.checked) {
            pending--;
        } else {
            completed--;
        }
        li.remove();
        updateCounts();
    });

    buttonDiv.appendChild(editBtn);
    buttonDiv.appendChild(deleteBtn);

    li.appendChild(leftDiv);
    li.appendChild(buttonDiv);

    taskList.appendChild(li);

    pending++;
    updateCounts();

    taskInput.value = "";
}

function updateCounts() {
    pendingCount.textContent = "Pending: " + pending;
    completedCount.textContent = "Completed: " + completed;
}