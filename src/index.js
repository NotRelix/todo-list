import './style.css';
import { populateInitialData } from './modules/populate.js';
import { deleteProject, deleteTask } from './modules/delete.js';
import { Project, Task } from './modules/classes';

const projects = [];

populateInitialData(projects);

// Test: add new task to project
const newTask = new Task('study social issues', 'why do we have this subject this sem', '2025-03-10', 'medium');
projects[1].addTask(newTask);

// Test: delete task at index 2
deleteTask(projects[1], 2);
projects[1].displayAllTasks();

// Test: delete project
deleteProject(projects, 1);
console.log(projects);