import { Project, Task } from "./classes";

function addProject(projects, name) {
  const newProject = new Project(name);
  projects.push(newProject);
}

function addTask(project, task) {
  const newTask = new Task(task.title, task.desc, task.dueDate, task.priority, task.done);
  project.addTask(newTask);
}

export {
  addProject,
  addTask,
}