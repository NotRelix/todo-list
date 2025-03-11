import './style.css';
import { populateFromJson, populateStorage } from './modules/populate.js';
import { addProject, addTask } from './modules/create.js';
import { deleteProject, deleteTask } from './modules/delete.js';
import { formatDateShort, formatDateLong } from './modules/formatDate.js';

const projects = populateFromJson();
populateStorage(projects);

console.log(projects);
console.log(JSON.parse(localStorage.getItem('todoData')));