import './style.css';
import { populateInitialData } from './modules/populate.js';
import { addProject, addTask } from './modules/create.js';
import { deleteProject, deleteTask } from './modules/delete.js';

const projects = [];

populateInitialData(projects);

// Test: create new project
addProject(projects, 'Tomorrow');

// Test: add new task to project
addTask(projects[2], 'study social issues', 'why do we have this subject this sem', '2025-03-10', 'medium');
projects[2].displayAllTasks();

console.log(projects);