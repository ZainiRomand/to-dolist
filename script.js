// Initialize tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// DOM elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Function to render tasks
function renderTasks() {
    taskInput.focus();

    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        if (task.completed) {
            taskDiv.classList.add('completed');
        }

        // Mark as completed button
        const tdComplete = document.createElement('td');
        //const completeBtn = document.createElement('button');

        //completeBtn.style.cssText =
        "padding: 10px 10px; border: 1px solid grey; border-radius:4px;"

        //completeBtn.textContent = task.completed ? 'UNDO' : 'DONE';
        //const tempColor = completeBtn.style.backgroundColor;
        //completeBtn.onmouseenter = () => { completeBtn.style.backgroundColor = 'lightgrey'; };
        //completeBtn.onmouseleave = () => { completeBtn.style.backgroundColor = tempColor; };
        //completeBtn.onclick = () => toggleComplete(index);

        //tdComplete.appendChild(completeBtn);

        // Completed icon

        const completedIcon = document.createElement('button');
        completedIcon.style.cssText = "border: none; background-color: transparent;";
        completedIcon.onclick = () => toggleComplete(index);
        if (tasks[index].completed) {
            completedIcon.innerHTML =
                `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                </svg>`;
        }

        else {
            completedIcon.innerHTML =
                `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                </svg>`;
        }

        tdComplete.appendChild(completedIcon);

        taskDiv.appendChild(tdComplete);


        // Task content
        const tdTask = document.createElement('td');
        const taskText = document.createElement('span');

        taskText.value = task.text
        //taskText.maxLength = 25;

        // if (task.completed) {
        //     taskText.style.cssText = "form-sizing: normal; width: 95%; border: 0; rows: 2; font-size: larger; text-decoration: line-through; background-color: #d4edda; readonly"
        //     taskText.disabled = true;
        // } else {
        //     taskText.style.cssText = "form-sizing: normal; width: 95%; border: 0; rows: 2; font-size: larger; background-color: #f9f9f9;"
        //     taskText.disabled = false;
        // }

        //taskText.onchange = () => { tasks[index].text = taskText.value; }

        taskText.textContent = task.text;
        //taskText.textContent = (index + 1).toString() + ")  " + task.text;

        tdTask.appendChild(taskText);
        tdTask.style.cssText = "width: 90%;";

        taskDiv.appendChild(tdTask);



        // Delete button
        const tdDelete = document.createElement('td');
        //const deleteBtn = document.createElement('button');
        //deleteBtn.textContent = 'DELETE';
        //deleteBtn.classList.add('delete-btn');
        //deleteBtn.onclick = () => deleteTask(index);

        //tdDelete.appendChild(deleteBtn);

        // Delete icon

        const deleteIcon = document.createElement('button');
        deleteIcon.style.cssText = "border: none; background-color: transparent;";
        deleteIcon.innerHTML =
            `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
            </svg>`;
        deleteIcon.onclick = () => {
            if (confirm("Proceed to delete?"))
                deleteTask(index);
        } 
        tdDelete.appendChild(deleteIcon);

        taskDiv.appendChild(tdDelete);

        // Append to task list division
        taskList.appendChild(taskDiv);

    });
}

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();
    let isDiplucate = false;
    if (taskText === '') {
        alert('Please enter a task');
        alert(localStorage.getItem('tasks'));
        return;
    } else {
        tasks.forEach(task => {
            if (taskText === task.text) {
                alert('Duplicated task found');
                isDiplucate = true;
            }
        });
        if (isDiplucate)
            return;
    }

    const newTask = {
        text: taskText,
        completed: false
    };
    tasks.push(newTask);
    taskInput.value = ''; // Clear input field
    saveTasks();
    renderTasks();
}

// Function to toggle task completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for adding task
addTaskBtn.addEventListener('click', addTask);

// Get the input field
const input = document.getElementById('task-input');

input.addEventListener('keypress', function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById('add-task-btn').click();
  }
});

// Render tasks on page load
renderTasks();