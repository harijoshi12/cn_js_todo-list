const updateTotalTasks = () => {
  let taskList = document.getElementById('taskList');
  let tasks = taskList.getElementsByTagName('li');
  let tasksLeft = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (!tasks[i].classList.contains('checked')) {
      tasksLeft++;
    }
  }
  document.getElementById('totalTask').textContent = tasksLeft;
};
let currentFilter = 'all';
const filterTasks = (filterType) => {
  currentFilter = filterType;
  var taskList = document.getElementById('taskList');
  var tasks = taskList.getElementsByTagName('li');
  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    var isCompleted = task.classList.contains('checked');

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
const setActiveButton = (buttonId) => {
  var buttons = ['showAll', 'showUncompleted', 'showCompleted'];
  buttons.forEach((id) => {
    document.getElementById(id).classList.remove('active');
  });
  document.getElementById(buttonId).classList.add('active');
};

const addTask = (taskValue) => {
  let taskList = document.getElementById('taskList');
  // create list item
  let listItem = document.createElement('li');

  // Create the first <img> element
  var img1 = document.createElement('img');
  img1.id = 'img4';
  img1.src = './images/circle-regular.svg';
  img1.alt = '';
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

  // Create the <span> element
  var span = document.createElement('span');
  span.textContent = taskValue;

  // Create the second <img> element
  var img2 = document.createElement('img');
  img2.id = 'img5';
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

document.getElementById('addTask').addEventListener('click', () => {
  let taskInput = document.getElementById('taskInput');
  if (taskInput.value) {
    addTask(taskInput.value);
    taskInput.value = '';
  }
});
document.getElementById('todoForm').addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the default form submission behavior
  let taskInput = document.getElementById('taskInput');
  if (taskInput.value) {
    addTask(taskInput.value);
    taskInput.value = '';
  }
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

const completeAllTasks = () => {
  var taskList = document.getElementById('taskList');
  var tasks = taskList.getElementsByTagName('li');

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    var checkboxImg = task.querySelector('#img4');
    checkboxImg.src = './images/circle-check-regular.svg'; // Checked image
    task.classList.add('checked');
  }

  // Reapply the current filter to update the display
  filterTasks(currentFilter);
};
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
