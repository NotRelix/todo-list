import { Project, Task } from "./classes";

function addProject(projects, name) {
  const newProject = new Project(name);
  projects.push(newProject);
}

function addTask(project, task) {
  const newTask = new Task(
    task.project_id,
    task.task_id,
    task.title,
    task.desc,
    task.dueDate,
    task.priority,
    task.done,
    task.important
  );
  project.addTask(newTask);
}

export {
  addProject,
  addTask,
}