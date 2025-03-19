import './style.css';
import { populateFromJson, populateFromStorage, populateStorage } from './modules/populate.js';
import { screenController } from './modules/screen.js';

const projects = [];

// Test: to fetch from json
// localStorage.clear();

// Use my data template or use their modified todo list
if (localStorage.getItem('todoData') === null) {
  populateFromJson(projects);
  populateStorage(projects);
} else {
  populateFromStorage(projects);
}

screenController(projects);