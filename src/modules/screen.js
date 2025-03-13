import { formatDateLong, formatDateShort } from "./formatDate.js";
import { createHamburgerIcon, createAddIcon, createTickBoxIcon, createFavoriteIcon, createMenuIcon } from "./svg.js";

// Sidebar
function createSidebarDiv(name) {
  const newDiv = document.createElement('div');
  newDiv.classList.add('side-bar-btn');

  const svg = createHamburgerIcon();
  newDiv.appendChild(svg);

  const title = document.createElement('h3');
  title.textContent = name;
  newDiv.appendChild(title);

  return newDiv;
}

function createAddProjectBtn() {
  const btn = document.createElement('button');
  btn.classList.add('add-btn', 'add-project');

  const svg = createAddIcon();
  svg.classList.add('add-icon');
  btn.appendChild(svg);

  const text = document.createElement('h3');
  text.textContent = 'Add Project';
  btn.appendChild(text);

  return btn;
}

function loadSidebarContent(projects) {
  const sidebar = document.querySelector('.side-bar');
  projects.forEach(project => {
    const newList = createSidebarDiv(project.name);
    sidebar.appendChild(newList)
  })
  const addProjectBtn = createAddProjectBtn();
  sidebar.appendChild(addProjectBtn);
}

function removeSelectStyle(nodeList, className) {
  nodeList.forEach(btn => {
    btn.classList.remove(className);
  })
}

// Main Content
function clearTaskList() {
  const taskList = document.querySelector('.task-list');
  taskList.innerHTML = '';
}

function sortTasks(tasks) {
  tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
}

function createTaskInfoLeft(task) {
  const taskInfoLeft = document.createElement('div');
  taskInfoLeft.classList.add('task-info-left');

  const svg = createTickBoxIcon();
  taskInfoLeft.appendChild(svg);

  const title = document.createElement('h3');
  title.textContent = task.title;
  taskInfoLeft.appendChild(title);

  const separator = document.createElement('div');
  separator.classList.add('separator');
  separator.textContent = '|';
  taskInfoLeft.appendChild(separator);

  const para = document.createElement('p');
  para.textContent = task.desc;
  taskInfoLeft.appendChild(para);

  return taskInfoLeft;
}

function createTaskInfoRight(task) {
  const taskInfoRight = document.createElement('div');
  taskInfoRight.classList.add('task-info-right');

  const dueDate = document.createElement('p');
  dueDate.textContent = formatDateShort(task.dueDate);
  taskInfoRight.appendChild(dueDate);

  const favoriteIcon = createFavoriteIcon();
  taskInfoRight.appendChild(favoriteIcon);

  const menuIcon = createMenuIcon();
  taskInfoRight.appendChild(menuIcon);

  return taskInfoRight;
}

function loadTaskList(tasks, taskList) {
  tasks.forEach(task => {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    taskList.appendChild(taskCard);

    const leftSection = createTaskInfoLeft(task);
    taskCard.appendChild(leftSection);

    const rightSection = createTaskInfoRight(task);
    taskCard.appendChild(rightSection);
  })
}

function createAddTaskBtn() {
  const btn = document.createElement('button');
  btn.classList.add('add-task', 'add-btn');

  const svg = createAddIcon();
  btn.appendChild(svg);

  const text = document.createElement('h3');
  text.textContent = 'Add Task';
  btn.appendChild(text);

  return btn;
}

function loadAllTasks(projects, taskList) {
  const sortedTasks = [];
  projects.forEach(project => {
    project.tasks.forEach(task => {
      sortedTasks.push(task);
    })
  })
  sortTasks(sortedTasks);
  loadTaskList(sortedTasks, taskList)
}

function loadToday(projects, taskList) {
  const tasks = [];
  projects.forEach(project => {
    project.tasks.forEach(task => {
      if (formatDateLong(task.dueDate) === formatDateLong(new Date())) {
        tasks.push(task);
      }
    })
  })
  loadTaskList(tasks, taskList);
}

function loadThisWeek(projects, taskList) {
  const tasks = [];
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  projects.forEach(project => {
    project.tasks.forEach(task => {
      console.log(new Date(task.dueDate))
      if (new Date() <= new Date(task.dueDate) && new Date(task.dueDate) <= nextWeek) {
        tasks.push(task);
      }
    })
  })
  sortTasks(tasks);
  loadTaskList(tasks, taskList);
}

function loadMainContent(projects, index) {
  const taskList = document.querySelector('.task-list');
  const taskTitle = document.querySelector('.task-title');
  clearTaskList();
  if (index == 0) {
    // All Tasks
    taskTitle.textContent = 'All Tasks';
    loadAllTasks(projects, taskList);
  } else if (index == 1) {
    // Today
    taskTitle.textContent = 'Today';
    loadToday(projects, taskList);
  } else if (index == 2) {
    // This Week
    taskTitle.textContent = 'This Week';
    loadThisWeek(projects, taskList);
  } else if (index == 3) {
    // Important
    taskTitle.textContent = 'Important';
  } else {
    // User Created Projects
    index -= 4;
    taskTitle.textContent = projects[index].name;
    loadTaskList(projects[index].tasks, taskList);
    const addTaskBtn = createAddTaskBtn();
    taskList.appendChild(addTaskBtn);
  }
}

function screenController(projects) {
  loadSidebarContent(projects);
  loadMainContent(projects, 0);

  const sideBarBtns = document.querySelectorAll('.side-bar-btn');
  sideBarBtns.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      removeSelectStyle(sideBarBtns, 'side-bar-select');
      e.currentTarget.classList.add('side-bar-select');
      loadMainContent(projects, index);
    })
  })
}

export {
  screenController,
}