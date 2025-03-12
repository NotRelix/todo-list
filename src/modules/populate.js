import data from '../data/data.json';
import { addProject, addTask } from './create.js';

function populateFromJson(projects) {
  const newData = Object.entries(data);
  newData.forEach((project, index) => {
    const projectName = project[0];
    const projectTasks = project[1].tasks;
    addProject(projects, projectName);
    for (let task of projectTasks) {
      addTask(projects[index], task);
    }
  });
}

function populateFromStorage(projects) {
  const newData = JSON.parse(localStorage.getItem('todoData'));
  newData.forEach((project, index) => {
    addProject(projects, project.name);
    for (let task of project.tasks) {
      addTask(projects[index], task);
    }
  });
}

function populateStorage(projects) {
  const todoData = [];
  for (let projectName in projects) {
    const newProject = {
      name: projects[projectName].name,
      tasks: [],
    };
    todoData.push(newProject);
    for (let task of projects[projectName].tasks) {
      newProject.tasks.push(task);
    }
  }
  localStorage.setItem('todoData', JSON.stringify(todoData));
}

export {
  populateFromJson,
  populateFromStorage,
  populateStorage,
}