class Project {
  constructor(name) {
    this.name = name;
  }

  #tasks = [];

  get projectName() { return this.name; }
  get tasks() { return this.#tasks.slice(); }

  set projectName(newProjectName) { this.name = newProjectName; }

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
  constructor(project_id, task_id, title, desc, dueDate, priority, done, important) {
    this.project_id = project_id;
    this.task_id = task_id;
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = done;
    this.important = important;
  }

  setTitle(newTitle) { this.title = newTitle; }
  setDesc(newDesc) { this.desc = newDesc; }
  setDueDate(newDueDate) { this.dueDate = newDueDate; }
  setPriority(newPriority) { this.priority = newPriority; }
  setDone(newDone) { this.done = newDone; }
  setImportant(newImportant) { this.important = newImportant; }

  displayTask() {
    console.log(`${this.title} ${this.desc} ${this.dueDate} ${this.priority} ${this.done} ${this.important}`);
  }
}

export {
  Project,
  Task,
};