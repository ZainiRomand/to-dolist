// Initialize tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// DOM elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        if (task.completed) {
            taskDiv.classList.add('completed');
        }

        // Task content
        const tdTask = document.createElement('td');
        const taskText = document.createElement('span');

        taskText.textContent = (index + 1).toString() + ")  " + task.text;

        tdTask.appendChild(taskText);
        tdTask.style.cssText = "width: 70%;";

        taskDiv.appendChild(tdTask);

        // Mark as completed button
        const tdComplete = document.createElement('td');
        const completeBtn = document.createElement('button');

        completeBtn.style.cssText =
            "padding: 10px 10px; border: 1px solid grey; border-radius:4px;"

        completeBtn.textContent = task.completed ? 'UNDO' : 'COMPLETED';
        const tempColor = completeBtn.style.backgroundColor;
        completeBtn.onmouseenter = () => { completeBtn.style.backgroundColor = 'lightgrey'; };
        completeBtn.onmouseleave = () => { completeBtn.style.backgroundColor = tempColor; };
        completeBtn.onclick = () => toggleComplete(index);

        tdComplete.appendChild(completeBtn);

        taskDiv.appendChild(tdComplete);

        // Delete button
        const tdDelete = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'DELETE';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => deleteTask(index);

        tdDelete.appendChild(deleteBtn);

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

// Render tasks on page load
renderTasks();