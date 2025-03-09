import './style.css';
import data from '../src/data/data.json';

class Project {
  constructor(name) {
    this.name = name;
  }

  #tasks = [];

  get projectName() { return this.name; }
  get tasks() { return this.#tasks.slice(); }

  addTask(task) {
    this.#tasks.push(task);
  }

  displayAllTasks() {
    this.#tasks.forEach(task => {
      console.log(task);
    });
  }
}

class Task {
  constructor(title, desc, dueDate, priority) {
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  setTitle(newTitle) { this.title = newTitle; }
  setDesc(newDesc) { this.desc = newDesc; }
  setDueDate(newDueDate) { this.dueDate = newDueDate; }
  setPriority(newPriority) { this.priority = newPriority; }

  displayTask() {
    console.log(`${this.title} ${this.desc} ${this.dueDate} ${this.priority}`);
  }
}

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

const projects = [];

populateInitialData(projects);

// Check if its populated from data.json
console.log(projects[0].projectName);
projects[0].displayAllTasks();

console.log(projects[1].projectName);
projects[1].displayAllTasks();