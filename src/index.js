import './style.css';
import { populateFromJson, populateFromStorage, populateStorage } from './modules/populate.js';
import { addProject, addTask } from './modules/create.js';
import { deleteProject, deleteTask } from './modules/delete.js';
import { formatDateShort, formatDateLong } from './modules/formatDate.js';
import { screenController } from './modules/screen.js';

const projects = [];

// localStorage.removeItem('todoData');

if (localStorage.getItem('todoData') === null) {
  console.log('from json');
  populateFromJson(projects);
  populateStorage(projects);
} else {
  console.log('from storage');
  populateFromStorage(projects);
}

screenController(projects);

console.log(projects);