import { addProject, addTask } from "./create.js";
import { deleteProject, deleteTask } from "./delete.js";
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

  const menuContainer = document.createElement('div');
  menuContainer.classList.add('side-bar-menu-container');
  newDiv.appendChild(menuContainer);

  const svg2 = createMenuIcon();
  svg2.classList.add('side-bar-menu-btn')
  menuContainer.appendChild(svg2);

  const menuDropDown = document.createElement('div');
  menuDropDown.classList.add('menu-drop-down', 'hidden');
  menuContainer.appendChild(menuDropDown);

  const renameText = document.createElement('p');
  renameText.classList.add('rename-project')
  renameText.textContent = 'Rename';
  menuDropDown.appendChild(renameText);

  const deleteText = document.createElement('p');
  deleteText.classList.add('delete-project');
  deleteText.textContent = 'Delete';
  menuDropDown.appendChild(deleteText);

  renameText.addEventListener('click', (e) => {
    handleEditProject(e);
  })

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
  const selectedElement = document.querySelector('.side-bar-select');
  const selectedIndex = selectedElement ? getProjectIndex() : null;

  const createdProjects = document.querySelector('.created-projects');
  createdProjects.innerHTML = '';

  projects.forEach((project, index) => {
    const newList = createSidebarDiv(project.name, index);
    createdProjects.appendChild(newList);
  });

  const addProjectBtn = createAddProjectBtn();
  createdProjects.appendChild(addProjectBtn);

  const updatedSelectedElement = document.querySelector('.side-bar-select') === null ? 'created-projects' : 'task-bar-options';
  if (selectedIndex !== null) {
    const newSelectedElement = document.querySelector(`[data-sidebar="${selectedIndex}"]`);
    if (updatedSelectedElement === 'created-projects') {
      document.querySelector('.created-projects').children[selectedIndex].classList.add('side-bar-select');
    } else {
      newSelectedElement.classList.add('side-bar-select');
    }
  }

  if (!updatedSelectedElement) return;

  const projectIndex = getProjectIndex();

  if (updatedSelectedElement === 'task-bar-options') {
    loadMainContentDefault(projects, projectIndex);
  } else {
    loadMainContentCreated(projects, projectIndex);
  }

  bindEditProjectFormListener(projects);
  createdProjectsListener(projects);
  defaultOptionsListener(projects);
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
  dueDate.classList.add('due-date');
  dueDate.textContent = formatDateShort(task.dueDate);
  taskInfoRight.appendChild(dueDate);

  const favoriteIcon = createFavoriteIcon();
  if (task.important === "true") {
    favoriteIcon.classList.add('favorite');
  }
  taskInfoRight.appendChild(favoriteIcon);

  const menuContainer = document.createElement('div');
  menuContainer.classList.add('task-menu-container');
  taskInfoRight.appendChild(menuContainer);

  const menuIcon = createMenuIcon();
  menuIcon.classList.add('task-menu-btn');
  menuContainer.appendChild(menuIcon);

  const menuDropDown = document.createElement('div');
  menuDropDown.classList.add('menu-drop-down', 'hidden');
  menuContainer.appendChild(menuDropDown);

  const editText = document.createElement('p');
  editText.classList.add('edit-task')
  editText.textContent = 'Edit';
  menuDropDown.appendChild(editText);

  const deleteText = document.createElement('p');
  deleteText.classList.add('delete-task');
  deleteText.textContent = 'Delete';
  menuDropDown.appendChild(deleteText);

  return taskInfoRight;
}

function loadTaskList(tasks, taskList) {
  tasks.forEach(task => {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    if (task.done === "true") {
      taskCard.classList.add('task-done');
    }
    taskCard.setAttribute('data-project-id', task.project_id)
    taskCard.setAttribute('data-task-id', task.task_id);
    taskList.appendChild(taskCard);

    const leftSection = createTaskInfoLeft(task);
    taskCard.appendChild(leftSection);

    const rightSection = createTaskInfoRight(task);
    taskCard.appendChild(rightSection);

    taskCard.addEventListener('click', () => {
      document.querySelectorAll('.task-card').forEach(card => card.style.zIndex = '1');
      taskCard.style.zIndex = '1000';
    })
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

function displayNoTasks() {
  const taskList = document.querySelector('.task-list');
  const text = document.createElement('p');
  text.classList.add('no-tasks');
  text.textContent = 'No Tasks!';
  taskList.appendChild(text);
}

function getProjectIndex() {
  const selectedProject = document.querySelector('.side-bar-select');
  const projectIndex = selectedProject.getAttribute('data-sidebar');
  return projectIndex;
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

  if (tasks.length === 0) {
    displayNoTasks();
  }
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
  const addProjectForm = document.querySelector('.add-project-form');
  setTimeout(() => {
    addProjectModal.close();
    addProjectForm.reset();
  }, 200)
  addProjectModal.classList.remove('add-project-modal-open');
}

function handleCreateTask() {
  const addTaskModal = document.querySelector('.add-task-modal');
  addTaskModal.showModal();
  addTaskModal.classList.add('add-task-modal-open');
}

function handleTaskFormSubmit(projects) {
  const title = document.querySelector('[name="task-title"]');
  const desc = document.querySelector('[name="task-desc"]');
  const priority = document.querySelector('[name="task-priority"]');
  const dueDate = document.querySelector('[name="task-due"]');
  const projectIndex = getProjectIndex();
  const newTask = {
    project_id: +projectIndex + 1 + "",
    task_id: projects[projectIndex].tasks.length + 1 + "",
    title: title.value,
    desc: desc.value,
    dueDate: new Date(dueDate.value) + "",
    priority: priority.value,
    done: "false",
    important: "false"
  }
  addTask(projects[projectIndex], newTask);
  loadMainContentCreated(projects, projectIndex);
}

function resetDescTextarea() {
  const taskDesc = document.querySelector('#task-desc');
  taskDesc.style.height = "calc(1.2rem * 6)";
}

function handleEditProject(e) {
  const sideBarIndex = e.target.closest('[data-sidebar]').getAttribute('data-sidebar');
  const editProjectModal = document.querySelector('.edit-project-modal');
  const projectInput = editProjectModal.querySelector('[name="edit-project-name"]');

  const sideBarElement = e.target.closest('[data-sidebar]');
  const title = sideBarElement.querySelector('h3').textContent;
  projectInput.value = title;

  editProjectModal.showModal();
  editProjectModal.classList.add('edit-project-modal-open');
  editProjectModal.setAttribute('data-sidebar', sideBarIndex);
}

function handleEditProjectSubmit(e, projects) {
  const title = document.querySelector('[name="edit-project-name"]');
  const index = e.target.closest('[data-sidebar]').getAttribute('data-sidebar');
  projects[index].projectName = title.value;

  const selectedElement = document.querySelector('.side-bar-select');
  if (selectedElement) {
    const parentClass = selectedElement.parentElement.classList.value;
    const projectIndex = getProjectIndex();
    if (parentClass === 'task-bar-options') {
      loadMainContentDefault(projects, projectIndex);
    } else {
      loadMainContentCreated(projects, projectIndex);
    }
  }

  populateStorage(projects);
}

function closeEditProject() {
  const editProjectModal = document.querySelector('.edit-project-modal');
  const editProjectForm = document.querySelector('.edit-project-form');
  setTimeout(() => {
    editProjectModal.close();
    editProjectForm.reset();
  }, 200)
  editProjectModal.classList.remove('edit-project-modal-open');
}

function closeCreateTask() {
  const addTaskModal = document.querySelector('.add-task-modal');
  const addTaskForm = document.querySelector('.add-task-form');
  const taskDue = document.querySelector('#task-due');
  setTimeout(() => {
    resetDescTextarea();
    addTaskModal.close();
    addTaskForm.reset();
  }, 200)
  taskDue.classList.add('task-due-empty');
  addTaskModal.classList.remove('add-task-modal-open');
}

function handleTickBoxPress(projects, projectId, taskId) {
  const projectIndex = projectId - 1;
  const taskIndex = taskId - 1;

  if (projects[projectIndex].tasks[taskIndex].done === "true") {
    projects[projectIndex].tasks[taskIndex].setDone("false");
  } else {
    projects[projectIndex].tasks[taskIndex].setDone("true");
  }
  populateStorage(projects);
}

function handleDeleteTask(e, projects) {
  const taskCard = e.target.closest('.task-card');
  const projectIndex = taskCard.getAttribute('data-project-id') - 1;
  const taskId = taskCard.getAttribute('data-task-id');
  const parentClass = document.querySelector('.side-bar-select').parentElement.classList.value;
  const selectedProjectIndex = document.querySelector('.side-bar-select').getAttribute('data-sidebar');
  if (confirm("are you sure you want to delete this task?")) {
    let indexInTasks;
    projects[projectIndex].tasks.forEach((task, index) => {
      if (task.task_id === taskId) {
        indexInTasks = index;
      }
    })
    deleteTask(projects[projectIndex], indexInTasks);
    if (parentClass === 'task-bar-options') {
      loadMainContentDefault(projects, selectedProjectIndex);
    } else {
      loadMainContentCreated(projects, selectedProjectIndex);
    }
    console.log(projects[projectIndex])
  }
}

// Utils
function defaultOptionsListener(projects) {
  const taskBarOptions = document.querySelector('.task-bar-options');
  taskBarOptions.addEventListener('click', (e) => {
    const btn = e.target.closest('.side-bar-btn');
    if (!btn) return;

    const sideBarBtn = document.querySelectorAll('.side-bar-btn');
    removeSelectStyle(sideBarBtn, 'side-bar-select');
    btn.classList.add('side-bar-select');

    const index = [...taskBarOptions.children].indexOf(btn);
    loadMainContentDefault(projects, index);
  })
}

function createdProjectsListener(projects) {
  const createdProjectsContainer = document.querySelector('.created-projects');
  if (!createdProjectsContainer) return;

  const sideBarBtns = document.querySelectorAll('.side-bar-btn');

  createdProjectsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.side-bar-btn');
    if (!btn) return;

    if (e.target.closest('.menu-drop-down')) {
      return;
    }

    if (e.target.closest('.side-bar-menu-btn')) {
      return;
    }

    const index = btn.getAttribute('data-sidebar');
    removeSelectStyle(sideBarBtns, 'side-bar-select');
    btn.classList.add('side-bar-select');
    loadMainContentCreated(projects, index);
  });
}

function bindEditProjectFormListener(projects) {
  const editProjectForm = document.querySelector('.edit-project-form');
  if (!editProjectForm) return;

  editProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleEditProjectSubmit(e, projects);
    populateStorage(projects);
    loadSidebarContent(projects);

    closeEditProject();
  }, { once: true });
}

function updateDateInput() {
  const taskDue = document.querySelector('#task-due');
  if (taskDue.value) {
    taskDue.classList.remove('task-due-empty')
  } else {
    taskDue.classList.add('task-due-empty');
  }
}

function getNewProjectAdded() {
  const createdProjects = document.querySelector('.created-projects').children;
  return createdProjects[createdProjects.length - 2];
}

document.addEventListener('click', (e) => {
  const menuBtn = e.target.closest('.menu-icon');
  const taskMenu = e.target.closest('.task-menu-btn');
  
  if (menuBtn) {
    const allMenus = document.querySelectorAll('.menu-drop-down');
    allMenus.forEach(menu => {
      if (menu !== menuBtn.nextElementSibling) {
        menu.classList.add('hidden');
      }
    });

    const menu = menuBtn.nextElementSibling;
    if (menu) {
      menu.classList.toggle('hidden');
    }
    return;
  }

  const menuOption = e.target.closest('.menu-drop-down p');
  if (menuOption) {
    menuOption.closest('.menu-drop-down').classList.add('hidden');
    return;
  }

  if (!e.target.closest('.side-bar-menu-container')) {
    document.querySelectorAll('.menu-drop-down').forEach(menu => {
      menu.classList.add('hidden');
    });
  }
});

function screenController(projects) {
  loadSidebarContent(projects);
  loadMainContentDefault(projects, 0);

  const addProjectForm = document.querySelector('.add-project-form');
  addProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleProjectFormSubmit(projects);
    closeCreateProject();
    populateStorage(projects);

    const lastIndex = projects.length - 1;
    const newProjectAdded = getNewProjectAdded();
    const sideBarBtns = document.querySelectorAll('.side-bar-btn');
    removeSelectStyle(sideBarBtns, 'side-bar-select');
    newProjectAdded.classList.add('side-bar-select');

    loadMainContentCreated(projects, lastIndex);
  });

  const addProjectModal = document.querySelector('.add-project-modal');
  addProjectModal.addEventListener('cancel', (e) => {
    e.preventDefault();
    closeCreateProject();
  });

  const addTaskForm = document.querySelector('.add-task-form');
  addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleTaskFormSubmit(projects);
    closeCreateTask();
    populateStorage(projects);
  });

  const addTaskModal = document.querySelector('.add-task-modal');
  addTaskModal.addEventListener('cancel', (e) => {
    e.preventDefault();
    closeCreateTask();
  });

  const editProjectModal = document.querySelector('.edit-project-modal');
  editProjectModal.addEventListener('cancel', (e) => {
    e.preventDefault();
    closeEditProject();
  });

  document.querySelector('.created-projects').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-project')) {
      const projectIndex = e.target.closest('.side-bar-btn').getAttribute('data-sidebar');
      const selectedProject = document.querySelector('.side-bar-select');
      const parentElement = selectedProject.parentElement.classList.value
      const selectedProjectSideBar = selectedProject.getAttribute('data-sidebar');
      if (confirm('are you sure you want to delete this project?')) {
        deleteProject(projects, projectIndex);
        if (parentElement === 'created-projects' && selectedProjectSideBar === projectIndex) {
          const sideBarBtns = document.querySelectorAll('.side-bar-btn');
          const allTasks = document.querySelector('.task-bar-options').children[0];
          removeSelectStyle(sideBarBtns, 'side-bar-select');
          allTasks.classList.add('side-bar-select');
        }
        loadSidebarContent(projects);
        populateStorage(projects);
      }
    }
  })
  
  document.addEventListener('click', (e) => {
    if (e.target.closest('.add-project')) {
      handleCreateProject();
    }
    
    if (e.target.closest('.add-task')) {
      handleCreateTask();
    }
    
    if (e.target.closest('.close-icon')) {
      closeCreateProject();
      closeCreateTask();
      closeEditProject();
    }
    
    if (e.target.closest('.delete-task')) {
      handleDeleteTask(e, projects);
    }

    const favoriteIcon = e.target.closest('.favorite-icon');
    if (favoriteIcon) {
      const projectId = +e.target.closest('[data-project-id]').getAttribute('data-project-id');
      const taskId = +e.target.closest('[data-task-id]').getAttribute('data-task-id');
      const parentClass = document.querySelector('.side-bar-select').parentElement.classList.value;
      const projectIndex = getProjectIndex();
      handleFavoritePress(projects, projectId, taskId);

      if (parentClass === 'task-bar-options') {
        loadMainContentDefault(projects, projectIndex);
      } else {
        loadMainContentCreated(projects, projectIndex);
      }
    }

    const tickBoxIcon = e.target.closest('.tick-box');
    if (tickBoxIcon) {
      const projectId = +e.target.closest('[data-project-id]').getAttribute('data-project-id');
      const taskId = +e.target.closest('[data-task-id]').getAttribute('data-task-id');
      const parentClass = document.querySelector('.side-bar-select').parentElement.classList.value;
      const projectIndex = getProjectIndex();
      handleTickBoxPress(projects, projectId, taskId);

      if (parentClass === 'task-bar-options') {
        loadMainContentDefault(projects, projectIndex);
      } else {
        loadMainContentCreated(projects, projectIndex);
      }
    }
  });

  const taskDue = document.querySelector('#task-due');
  taskDue.addEventListener('input', updateDateInput);
  taskDue.addEventListener('focus', updateDateInput);
  taskDue.addEventListener('blur', updateDateInput);
}

export {
  screenController,
}