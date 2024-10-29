// Initialize an array to hold the tasks
let tasks = [];

// Add task when button is clicked
const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', () => {
  addTask();
});

function addTask() {
  const inputValue = document.querySelector('.input');
  const taskAdded = inputValue.value;

  if (taskAdded.trim() === "") return; // Prevent adding empty tasks

  // Add the new task as an object with text and checked state
  tasks.push({ text: taskAdded, checked: false });

  // Save the updated task list to localStorage
  saveToStorage();

  // Display the task
  displayTasks();

  // Clear the input field after adding the task
  inputValue.value = '';

  deleteTask();
}

// Save tasks to localStorage
function saveToStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadFromStorage() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
  displayTasks();


  // Set up delete functionality for loaded tasks
  deleteTask();
}

// Display the tasks in the DOM
function displayTasks() {
  const todoContainer = document.querySelector('.todo-list-container');
  todoContainer.innerHTML = ''; // Clear the current list before repopulating

  tasks.forEach((task, index) => {
    let taskhtml = 
    `
    <div class="todo-task" data-index="${index}">
        <div class="wrapper">
        <input type="checkbox" ${task.checked ? 'checked' : ''} data-index="${index}">
        <div class="tooltip">Task completed</div>
        </div>
        <div class="task">${task.text}</div>
        <div class="x-mark-container" data-index="${index}">
          <div class="wrapper">
          <i class="fas fa-times close-mark"></i> <!-- This is a Font Awesome X icon -->
          <div class="tooltip">delete Task</div>
          </div>
        </div>
      </div>
    `;
    todoContainer.innerHTML += taskhtml;
  });

  addCheckboxListeners();

  deleteTask();
}

function addCheckboxListeners() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
      const index = event.target.getAttribute('data-index');
      tasks[index].checked = event.target.checked;
      saveToStorage();
    });
  });
}


function deleteTask() {
  const xmarks = document.querySelectorAll('.x-mark-container');
  xmarks.forEach((xmark, index) => {
    xmark.addEventListener('click', () => {
      // Remove the task from the tasks array using the index
      tasks.splice(index, 1);

      // Update localStorage with the modified tasks array
      saveToStorage();

      // Remove the task from the DOM
      xmark.parentElement.remove();

      // Re-run deleteTask to re-assign click events to remaining tasks
      deleteTask();
    });
  });
}

// Load tasks from storage when the page loads
window.onload = loadFromStorage;
