class TaskList {
  constructor(id, name, parent) {
    this.id = id;
    this.name = name;
    this.parent = parent;
    this.tasks = [];
  }

  renderTasks() {
    const tasksList = this.tasks.map(
      (elem, id) =>
        `<li class="task__list-item"><h3 class="task__list-text">${elem}</h3><button class="task__list-deleteTaskBtn" id="list${this.id}_task${id}" type="button">X</button></li>`
    );
    return `<ul class="task__list-list">${tasksList.join("")}</ul>`;
  }

  addTask(task) {
    this.tasks.push(task);
  }
}

class List {
  constructor() {
    this.listArray = [];
  }

  renderArray() {
    const lists = this.listArray.map(
      (elem) => `<section class="task__list" id="taskList${elem.id}">
      <h1 class="task__list-title">${elem.name}</h1>
      <div>${elem.renderTasks()}</div>
    <form class="task__list-form" id="newTask${elem.id}">
      <input class="task__list-input" id="taskText${
        elem.id
      }" type="text" placeholder="Enter new task">
      <button class="task__list-btn addTaskBtn" id="addTask${
        elem.id
      }" type="button">Add task</button>
    </form>
    </section>
    `
    );
    return lists.join("");
  }

  addList(list) {
    this.listArray.push(list);
  }
}
let tasker = new List();

const content = document.getElementById("list");
const listForm = newList;

let addTaskBtns = content.querySelectorAll(".addTaskBtn");

const addListBtn = listForm.elements.addList;
const newListName = listForm.elements.listName;

addListBtn.addEventListener("click", () => {
  let id = tasker.listArray.length ? tasker.listArray.length : 0;
  tasker.addList(new TaskList(id, newListName.value, content));

  content.innerHTML = tasker.renderArray();

  newListName.value = "";

  addTaskBtns = content.querySelectorAll(".addTaskBtn");
  addTaskBtns.forEach((item) => {
    item.addEventListener("click", () => {
      let taskText = item.previousElementSibling;
      let tasksContainer = item.parentNode.parentNode.childNodes[3];
      let listIndex = item.id.substring(7);
      tasker.listArray[listIndex].addTask(taskText.value);
      taskText.value = "";
      newListName.value = "";

      tasksContainer.innerHTML = tasker.listArray[listIndex].renderTasks();
      updateDeleteListeners(tasksContainer);
    });
  });
});

function updateDeleteListeners(tasksContainer) {
  let deleteTaskBtns = content.querySelectorAll(".task__list-deleteTaskBtn");
  deleteTaskBtns.forEach((item) => {
    item.addEventListener("click", () => {
      let listId = item.id.split("_")[0].substring(4);
      let taskId = item.id.split("_")[1].substring(4);
      tasker.listArray[listId].tasks.splice(taskId, 1);

      tasksContainer.innerHTML = tasker.listArray[listId].renderTasks();
      updateDeleteListeners(tasksContainer);
    });
  });
}
