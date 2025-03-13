function removeSelectStyle(nodeList, className) {
  nodeList.forEach(btn => {
    btn.classList.remove(className);
  })
}

function screenController() {
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