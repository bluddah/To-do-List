const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');
const taskList = document.querySelector('.task-list');

// Retrieve task list data from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to add a new task to the list
function addTask(task) {
  tasks.push(task);
  displayTasks();
  updateLocalStorage();
}

// Function to delete a task from the list
function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
  updateLocalStorage();
}

// Function to update the local storage with the current task list data
function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to display the tasks on the page
function displayTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = !task.completed;
      updateLocalStorage();
    });
    const taskName = document.createElement('span');
    taskName.innerText = task.name;
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteTask(index);
    });
    li.appendChild(checkbox);
    li.appendChild(taskName);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

// Display the initial task list data on page load
displayTasks();

// Event listener to handle form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const taskName = input.value;
  if (taskName.trim() !== '') {
    const task = { name: taskName, completed: false };
    addTask(task);
    input.value = '';
  }
});
