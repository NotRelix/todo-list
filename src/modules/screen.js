import { addProject } from "./create.js";
import { formatDateLong, formatDateShort } from "./formatDate.js";
import { populateStorage } from "./populate.js";
import { createHamburgerIcon, createAddIcon, createTickBoxIcon, createFavoriteIcon, createMenuIcon } from "./svg.js";

// Sidebar
function createSidebarDiv(name, index) {
  const newDiv = document.createElement('div');
  newDiv.classList.add('side-bar-btn');
  newDiv.setAttribute('data-sidebar', index);

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
  const createdProjects = document.querySelector('.created-projects');
  createdProjects.innerHTML = '';
  projects.forEach((project, index) => {
    const newList = createSidebarDiv(project.name, index);
    createdProjects.appendChild(newList)
  })
  const addProjectBtn = createAddProjectBtn();
  createdProjects.appendChild(addProjectBtn);
}

function removeSelectStyle(nodeList, className) {
  nodeList.forEach(btn => {
    btn.classList.remove(className);
  })
}

function getCreatedProjects() {
  return Array.from(document.querySelector('.created-projects').children);
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
  if (task.important === "true") {
    favoriteIcon.classList.add('favorite');
  }
  taskInfoRight.appendChild(favoriteIcon);

  const menuIcon = createMenuIcon();
  taskInfoRight.appendChild(menuIcon);

  return taskInfoRight;
}

function loadTaskList(tasks, taskList) {
  tasks.forEach(task => {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    taskCard.setAttribute('data-project-id', task.project_id)
    taskCard.setAttribute('data-task-id', task.task_id);
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
  const tasks = [];
  projects.forEach(project => {
    project.tasks.forEach(task => {
      tasks.push(task);
    })
  })
  sortTasks(tasks);
  loadTaskList(tasks, taskList)
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
  sortTasks(tasks);
  loadTaskList(tasks, taskList);
}

function loadThisWeek(projects, taskList) {
  const tasks = [];
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  projects.forEach(project => {
    project.tasks.forEach(task => {
      if (new Date() <= new Date(task.dueDate) && new Date(task.dueDate) <= nextWeek) {
        tasks.push(task);
      }
    })
  })
  sortTasks(tasks);
  loadTaskList(tasks, taskList);
}

function loadImportant(projects, taskList) {
  const tasks = [];
  projects.forEach(project => {
    project.tasks.forEach(task => {
      if (task.important === "true") {
        tasks.push(task);
      }
    })
  })
  sortTasks(tasks);
  loadTaskList(tasks, taskList);
}

function loadMainContentDefault(projects, index) {
  clearTaskList();
  const taskList = document.querySelector('.task-list');
  const taskTitle = document.querySelector('.task-title');
  if (index == 0) {         // All Tasks
    taskTitle.textContent = 'All Tasks';
    loadAllTasks(projects, taskList);
  } else if (index == 1) {  // Today
    taskTitle.textContent = 'Today';
    loadToday(projects, taskList);
  } else if (index == 2) {  // This Week
    taskTitle.textContent = 'This Week';
    loadThisWeek(projects, taskList);
  } else if (index == 3) {  // Important
    taskTitle.textContent = 'Important';
    loadImportant(projects, taskList);
  }
}

function loadMainContentCreated(projects, index) {
  clearTaskList();
  const taskList = document.querySelector('.task-list');
  const taskTitle = document.querySelector('.task-title');
  taskTitle.textContent = projects[index].name;

  loadTaskList(projects[index].tasks, taskList);

  const addTaskBtn = createAddTaskBtn();
  taskList.appendChild(addTaskBtn);
}

function handleFavoritePress(projects, projectId, taskId) {
  const projectIndex = projectId - 1;
  const taskIndex = taskId - 1;
  if (projects[projectIndex].tasks[taskIndex].important === "true") {
    projects[projectIndex].tasks[taskIndex].setImportant("false");
  } else {
    projects[projectIndex].tasks[taskIndex].setImportant("true");
  }
  populateStorage(projects);
}

// Modals
function handleCreateProject() {
  const addProjectModal = document.querySelector('.add-project-modal');
  addProjectModal.showModal();
  addProjectModal.classList.add('add-project-modal-open');
}

function handleProjectFormSubmit(projects) {
  const titleInput = document.querySelector('[name="project-name"]');
  addProject(projects, titleInput.value);
  loadSidebarContent(projects);
}

function closeCreateProject() {
  const addProjectModal = document.querySelector('.add-project-modal');
  setTimeout(() => {
    addProjectModal.close();
  }, 200)
  addProjectModal.classList.remove('add-project-modal-open');
}

// Utils
function defaultOptionsListener(projects) {
  const sideBarBtn = document.querySelectorAll('.side-bar-btn');
  const taskBarOptions = Array.from(document.querySelector('.task-bar-options').children);
  taskBarOptions.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      removeSelectStyle(sideBarBtn, 'side-bar-select');
      e.currentTarget.classList.add('side-bar-select');
      loadMainContentDefault(projects, index);
    })
  })
}

function createdProjectsListener(projects) {
  const createdProjects = getCreatedProjects();
  const sideBarBtn = document.querySelectorAll('.side-bar-btn');
  createdProjects.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      const projectCount = createdProjects.length - 1;
      if (index < projectCount) {
        removeSelectStyle(sideBarBtn, 'side-bar-select');
        e.currentTarget.classList.add('side-bar-select');
        loadMainContentCreated(projects, index);
      }
    })
  })
}

function getNewProjectAdded() {
  const createdProjects = document.querySelector('.created-projects').children;
  return createdProjects[createdProjects.length - 2];
}

function screenController(projects) {
  loadSidebarContent(projects);
  loadMainContentDefault(projects, 0);

  defaultOptionsListener(projects);
  createdProjectsListener(projects);

  const addProjectForm = document.querySelector('.add-project-form');
  addProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    handleProjectFormSubmit(projects);
    closeCreateProject();
    populateStorage(projects);
    
    defaultOptionsListener(projects);
    createdProjectsListener(projects);
    
    const lastIndex = projects.length - 1;
    const newProjectAdded = getNewProjectAdded();
    
    const sideBarBtn = document.querySelectorAll('.side-bar-btn');
    removeSelectStyle(sideBarBtn, 'side-bar-select');
    newProjectAdded.classList.add('side-bar-select');
    
    loadMainContentCreated(projects, lastIndex);
    
    e.target.reset();
  })

  const addProjectModal = document.querySelector('.add-project-modal');
  addProjectModal.addEventListener('cancel', (e) => {
    e.preventDefault();
    closeCreateProject();
  })

  document.addEventListener('click', (e) => {
    if (e.target.closest('.add-project')) {
      handleCreateProject();
    }

    if (e.target.closest('.close-icon')) {
      closeCreateProject();
    }

    const favoriteIcon = e.target.closest('.favorite-icon')
    if (favoriteIcon) {
      const projectId = +favoriteIcon.closest('[data-project-id]').getAttribute('data-project-id');
      const taskId = +favoriteIcon.closest('[data-task-id]').getAttribute('data-task-id');
      const parentClass = document.querySelector('.side-bar-select').parentElement.classList.value;
      const sideBarIndex = document.querySelector('.side-bar-select').getAttribute('data-sidebar');
      handleFavoritePress(projects, projectId, taskId);

      if (parentClass === 'task-bar-options') {
        loadMainContentDefault(projects, sideBarIndex);
      } else {
        loadMainContentCreated(projects, sideBarIndex);
      }
    }
  })
}

export {
  screenController,
}