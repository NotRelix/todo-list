import './style.css';
import data from '../src/data/data.json';

class Project {
  constructor(name) {
    this.name = name;
  }

  #tasks = [];

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
