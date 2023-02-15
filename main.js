let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let ls = [];

if (window.localStorage.getItem("tasks")) {
    ls = JSON.parse(localStorage.getItem("tasks"));
}

createTask(ls);

submit.onclick = function () {
    if (input.value !== "") {
        addTask(input.value);
        input.value = "";
    }
};


tasksDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        deleteTask(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }
    if (e.target.classList.contains("task")) {
        taskStatus(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done");
    }
});

function addTask(val) {
    let task = {
        id: Date.now(),
        title: val,
        completed: false,
    };
    ls.push(task);
    createTask(ls);
    saveTasks(ls);
}

function createTask(arrayTasks) {
    tasksDiv.innerHTML = "";
    arrayTasks.forEach((task) => {
        let div = document.createElement("div")
        div.className = "task";
        if (task.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        tasksDiv.appendChild(div);
    });
}

function saveTasks(arrayTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayTasks));
}

function deleteTask(taskId) {
    ls = ls.filter((task) => {
        return task.id != taskId;
    });
    saveTasks(ls);
}

function taskStatus(taskId) {
    for (let i = 0; i < ls.length; i++) {
        if (ls[i].id == taskId) {
            ls[i].completed == false ? (ls[i].completed = true) : (ls[i].completed = false);
        }
    }
    saveTasks(ls);
}