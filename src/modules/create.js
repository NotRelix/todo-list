import { Project, Task } from "./classes";

function addProject(projects, name) {
  const newProject = new Project(name);
  projects.push(newProject);
}

function addTask(project, title, desc, dueDate, priority, done = "false") {
  const newTask = new Task(title, desc, dueDate, priority, done);
  project.addTask(newTask);
}

export {
  addProject,
  addTask,
}