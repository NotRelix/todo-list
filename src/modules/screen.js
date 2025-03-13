import { createHamburgerIcon, createAddIcon } from "./svg.js";

function createSidebarDiv(name) {
  const newDiv = document.createElement('div');
  newDiv.classList.add('side-bar-btn');

  const svg = createHamburgerIcon();
  newDiv.appendChild(svg);

  const title = document.createElement('h3');
  title.textContent = name;
  newDiv.appendChild(title);

  return newDiv;
}

function createAddProjectBtn() {
  const btn = document.createElement('button');
  btn.classList.add('add-btn', 'add-project');

  const svg = createAddIcon();
  svg.classList.add('add-icon');
  btn.appendChild(svg);

  const text = document.createElement('h3');
  text.textContent = 'Add Project';
  btn.appendChild(text);

  return btn;
}

function loadSidebarContent(projects) {
  const sidebar = document.querySelector('.side-bar');
  projects.forEach(project => {
    const newList = createSidebarDiv(project.name);
    sidebar.appendChild(newList)
  })
  const addProjectBtn = createAddProjectBtn();
  sidebar.appendChild(addProjectBtn);
}

function removeSelectStyle(nodeList, className) {
  nodeList.forEach(btn => {
    btn.classList.remove(className);
  })
}

function screenController(projects) {
  loadSidebarContent(projects);

  const sideBarBtns = document.querySelectorAll('.side-bar-btn');
  sideBarBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      removeSelectStyle(sideBarBtns, 'side-bar-select');
      e.currentTarget.classList.add('side-bar-select');
    })
  })
}

export {
  screenController,
}