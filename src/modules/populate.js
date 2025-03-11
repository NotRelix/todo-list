import data from '../data/data.json';
import { Project, Task } from './classes.js';

function populateProjects(projects, projectName) {
  const newProject = new Project(projectName);
  projects.push(newProject);
}

function populateTasks(projects, task, projectId) {
  const newTask = new Task(task.title, task.desc, task.dueDate, task.priority, task.done);
  const projectIndex = projectId - 1;
  projects[projectIndex].addTask(newTask);
}

function populateFromJson() {
  const projects = [];
  for (let projectName in data) {
    const projectId = data[projectName].project_id;
    populateProjects(projects, projectName);
    for (let task of data[projectName].tasks) {
      populateTasks(projects, task, projectId);
    }
  }
  return projects;
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
  populateStorage,
}