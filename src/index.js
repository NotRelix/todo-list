import './style.css';
import { populateInitialData } from './modules/populate.js';

const projects = [];

populateInitialData(projects);

// Check if its populated from data.json
console.log(projects[0].projectName);
projects[0].displayAllTasks();

console.log(projects[1].projectName);
projects[1].displayAllTasks();