import './style.css';

class Task {
  constructor(title, desc, dueDate, priority) {
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  displayTask() {
    console.log(`${this.title} ${this.desc} ${this.dueDate} ${this.priority}`);
  }
}

const task1 = new Task('shower', 'first desc', 'today', 'high');
const task2 = new Task('code', 'second desc', 'tomorrow', 'medium');

task1.displayTask();
task2.displayTask();