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
