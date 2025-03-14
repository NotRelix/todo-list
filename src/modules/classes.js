class Project {
  constructor(name) {
    this.name = name;
  }

  #tasks = [];

  get projectName() { return this.name; }
  get tasks() { return this.#tasks.slice(); }

  addTask(task) {
    this.#tasks.push(task);
  }

  deleteTask(index) {
    this.#tasks.splice(index, 1);
  }

  displayAllTasks() {
    this.#tasks.forEach(task => {
      console.log(task);
    });
  }
}

class Task {
  constructor(title, desc, dueDate, priority, done) {
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = done;
  }

  setTitle(newTitle) { this.title = newTitle; }
  setDesc(newDesc) { this.desc = newDesc; }
  setDueDate(newDueDate) { this.dueDate = newDueDate; }
  setPriority(newPriority) { this.priority = newPriority; }
  setDone(newDone) { this.done = newDone; }

  displayTask() {
    console.log(`${this.title} ${this.desc} ${this.dueDate} ${this.priority} ${this.done}`);
  }
}

export {
  Project,
  Task,
};