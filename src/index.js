import './style.css';
import { populateInitialData } from './modules/populate.js';
import { addProject, addTask } from './modules/create.js';
import { deleteProject, deleteTask } from './modules/delete.js';
import { formatDateShort, formatDateLong } from './modules/formatDate.js';

const projects = [];

populateInitialData(projects);

console.log(formatDateShort(new Date()));
console.log(formatDateLong(new Date()));