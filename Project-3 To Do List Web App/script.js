document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let zipFileInput = document.getElementById("zipFileInput");
    let dueDateInput = document.getElementById("dueDateInput");

    let taskText = taskInput.value.trim();
    let dueDate = dueDateInput.value.trim();
    let zipFile = zipFileInput.files[0];

    if (taskText === "" || dueDate === "") {
        alert("Please enter a task and due date.");
        return;
    }

    let tasks = getTasks();
    let task = { text: taskText, zipFile: null, dueDate: dueDate, completed: false };

    if (zipFile) {
        let reader = new FileReader();
        reader.onload = function (event) {
            let zipBlob = new Blob([event.target.result], { type: "application/zip" });
            task.zipFile = URL.createObjectURL(zipBlob);

            tasks.push(task);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            loadTasks();
            resetInputs();
        };
        reader.readAsArrayBuffer(zipFile);
    } else {
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
        resetInputs();
    }
}

function renderTask(task, index) {
    let table = document.getElementById("taskList");
    let row = table.insertRow();
    row.id = `task-${index}`;
    row.dataset.status = task.completed ? "completed" : "pending"; // Set dataset for filtering

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);

    cell1.textContent = task.text;

    if (task.zipFile) {
        cell2.innerHTML = `<a href="${task.zipFile}" download="task.zip">Download ZIP</a>`;
    } else {
        cell2.textContent = "No File";
    }

    cell3.textContent = task.dueDate;
    cell4.textContent = task.completed ? "Completed" : "Pending";
    cell4.className = task.completed ? "status-completed" : "status-pending";

    let completeBtn = document.createElement("button");
    completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    completeBtn.className = "complete-btn";
    completeBtn.onclick = function () {
        let tasks = getTasks();
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function () {
        let tasks = getTasks();
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    };

    let editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    editBtn.className = "edit-btn";
    editBtn.onclick = function () {
        editTask(index, row);
    };

    cell5.appendChild(completeBtn);
    cell5.appendChild(deleteBtn);
    cell5.appendChild(editBtn);
}

function editTask(index, row) {
    let tasks = getTasks();
    let task = tasks[index];

    row.innerHTML = "";

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);

    let textInput = document.createElement("input");
    textInput.type = "text";
    textInput.value = task.text;
    cell1.appendChild(textInput);

    let dueDateInput = document.createElement("input");
    dueDateInput.type = "date";
    dueDateInput.value = task.dueDate;
    cell3.appendChild(dueDateInput);

    let saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.className = "save-btn";
    saveBtn.onclick = function () {
        task.text = textInput.value.trim();
        task.dueDate = dueDateInput.value.trim();

        if (task.text === "" || task.dueDate === "") {
            alert("Task text and due date cannot be empty!");
            return;
        }

        tasks[index] = task;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    };

    let cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.className = "cancel-btn";
    cancelBtn.onclick = function () {
        loadTasks();
    };

    cell5.appendChild(saveBtn);
    cell5.appendChild(cancelBtn);
}

function loadTasks() {
    let table = document.getElementById("taskList");
    table.innerHTML = `<tr>
        <th>Task</th>
        <th>File</th>
        <th>Due Date</th>
        <th>Status</th>
        <th>Actions</th>
    </tr>`;

    let tasks = getTasks();
    tasks.forEach((task, index) => renderTask(task, index));

    filterTasks(); // Apply filter on load
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function resetInputs() {
    document.getElementById("taskInput").value = "";
    document.getElementById("zipFileInput").value = "";
    document.getElementById("dueDateInput").value = "";
}

function filterTasks() {
    let filter = document.getElementById("filterStatus").value;
    let rows = document.querySelectorAll("#taskList tr:not(:first-child)");

    rows.forEach(row => {
        let status = row.dataset.status;
        if (filter === "all" || status === filter) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}


