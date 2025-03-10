function deleteProject(projects, index) {
  projects.splice(index, 1);
}

function deleteTask(project, index) {
  project.deleteTask(index);
}

export {
  deleteProject,
  deleteTask,
}