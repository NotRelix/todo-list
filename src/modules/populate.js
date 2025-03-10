import data from '../data/data.json';
import { Project, Task } from './classes.js';

function populateProjects(projects, projectName) {
  const newProject = new Project(projectName);
  projects.push(newProject);
}

function populateTasks(projects, task, projectId) {
  const newTask = new Task(task.title, task.desc, task.dueDate, task.priority);
  const projectIndex = projectId - 1;
  projects[projectIndex].addTask(newTask);
}

function populateInitialData(projects) {
  for (let projectName in data) {
    const projectId = data[projectName].project_id;
    populateProjects(projects, projectName);
    for (let task of data[projectName].tasks) {
      populateTasks(projects, task, projectId);
    }
  }
}

export {
  populateInitialData,
}