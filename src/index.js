import './style.css';

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

const project1 = new Project('morning routine');
const project2 = new Project('afternoon routine');

const task1 = new Task('shower', 'first desc', 'today', 'high');
const task2 = new Task('code', 'second desc', 'tomorrow', 'medium');
const task3 = new Task('eat', 'third desc', 'later', 'low');

project1.addTask(task1);
project1.addTask(task2);

project2.addTask(task3);

project1.displayAllTasks();
project2.displayAllTasks();