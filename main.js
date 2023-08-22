// Function to update the total number of uncompleted tasks
const updateTotalTasks = () => {
  let tasksLeft = document.querySelectorAll(
    '#taskList li:not(.checked)'
  ).length;
  document.getElementById('totalTask').textContent = tasksLeft;
};

// Current filter type (all, uncompleted, completed)
let currentFilter = 'all';

// Function to filter tasks based on the selected filter type
const filterTasks = (filterType) => {
  currentFilter = filterType;
  var taskList = document.getElementById('taskList');
  var tasks = taskList.getElementsByTagName('li');
  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    var isCompleted = task.classList.contains('checked');

    // Apply the filter based on the filter type
    switch (filterType) {
      case 'all':
        task.style.display = '';
        break;
      case 'uncompleted':
        task.style.display = isCompleted ? 'none' : '';
        break;
      case 'completed':
        task.style.display = isCompleted ? '' : 'none';
        break;
    }
  }
};

// Function to set the active filter button
const setActiveButton = (buttonId) => {
  var buttons = ['showAll', 'showUncompleted', 'showCompleted'];
  buttons.forEach((id) => {
    document.getElementById(id).classList.remove('active');
  });
  document.getElementById(buttonId).classList.add('active');
};

// Function to add a new task to the task list
const addTask = (taskValue) => {
  let taskList = document.getElementById('taskList');
  let listItem = document.createElement('li');

  // Create the checkbox image element
  let img1 = document.createElement('img');
  img1.className = 'task-checkbox';
  img1.src = './images/circle-regular.svg';
  img1.alt = '';
  // Add event listener to toggle task completion
  img1.addEventListener('click', () => {
    if (img1.src.endsWith('circle-regular.svg')) {
      img1.src = './images/circle-check-regular.svg';
      listItem.classList.add('checked');
    } else {
      img1.src = './images/circle-regular.svg';
      listItem.classList.remove('checked');
    }
    filterTasks(currentFilter);
    updateTotalTasks();
  });

  // Create the task text element
  let span = document.createElement('span');
  span.textContent = taskValue;

  // Create the delete button image element
  let img2 = document.createElement('img');
  img2.className = 'task-delete';
  img2.src = './images/circle-xmark-regular.svg';
  img2.alt = '';
  img2.addEventListener('click', () => {
    taskList.removeChild(listItem);
    updateTotalTasks();
  });

  // Append the <img> and <span> elements to the <li> element
  listItem.appendChild(img1);
  listItem.appendChild(span);
  listItem.appendChild(img2);

  // Append the <li> element to the task list
  taskList.appendChild(listItem);
  updateTotalTasks();
};

// Event listeners for adding tasks and filtering
document.getElementById('addTask').addEventListener('click', () => {
  let taskInput = document.getElementById('taskInput');
  if (taskInput.value) {
    addTask(taskInput.value);
    taskInput.value = '';
  }
  filterTasks(currentFilter);
});
document.getElementById('todoForm').addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the default form submission behavior
  let taskInput = document.getElementById('taskInput');
  if (taskInput.value) {
    addTask(taskInput.value);
    taskInput.value = '';
  }
  filterTasks(currentFilter);
});

document.getElementById('showAll').addEventListener('click', function () {
  setActiveButton('showAll');
  filterTasks('all');
});

document
  .getElementById('showUncompleted')
  .addEventListener('click', function () {
    setActiveButton('showUncompleted');
    filterTasks('uncompleted');
  });

document.getElementById('showCompleted').addEventListener('click', function () {
  setActiveButton('showCompleted');
  filterTasks('completed');
});

filterTasks('all'); // Set the default filter to 'all'
setActiveButton('showAll'); // Set the "All" button as active by default

// Function to mark all tasks as completed
const completeAllTasks = () => {
  var taskList = document.getElementById('taskList');
  var tasks = taskList.getElementsByTagName('li');

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    var checkboxImg = task.querySelector('.task-checkbox');
    checkboxImg.src = './images/circle-check-regular.svg'; // Checked image
    task.classList.add('checked');
  }

  // Reapply the current filter to update the display
  filterTasks(currentFilter);
  updateTotalTasks();
};

// Function to clear all completed tasks
const clearCompletedTasks = () => {
  var taskList = document.getElementById('taskList');
  var tasks = taskList.getElementsByTagName('li');

  // Loop through the tasks in reverse to avoid issues while removing elements
  for (var i = tasks.length - 1; i >= 0; i--) {
    var task = tasks[i];
    if (task.classList.contains('checked')) {
      taskList.removeChild(task);
    }
  }

  // Update the total number of tasks
  updateTotalTasks();
};

// Event listeners for completing all tasks and clearing completed tasks
document
  .getElementById('completeAllTasks')
  .addEventListener('click', function () {
    completeAllTasks();
  });

document
  .getElementById('clearCompleted')
  .addEventListener('click', function () {
    clearCompletedTasks();
  });
