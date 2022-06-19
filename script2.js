class TaskList {
  constructor(id, name, parent) {
    this.id = id;
    this.name = name;
    this.parent = parent;
    this.tasks = [];
  }

  renderTasks() {
    let taskList = document.createElement("ul");
    taskList.setAttribute("class", "task__list-list");
    const tasksList = this.tasks.map((elem, id) => {
      let taskItem = document.createElement("li");
      taskItem.setAttribute("class", "task__list-item");

      let title = document.createElement("h3");
      title.setAttribute("class", "task__list-text");
      title.innerHTML = title.innerHTML + elem;

      let delBtn = document.createElement("button");
      delBtn.setAttribute("class", "task__list-deleteTaskBtn");
      delBtn.innerHTML = delBtn.innerHTML + "X";

      taskItem.appendChild(title);
      taskItem.appendChild(delBtn);

      taskList.append(taskItem);
    });
    return taskList;
  }

  createNewTask(taskText) {
    let taskItem = document.createElement("li");
    taskItem.setAttribute("class", "task__list-item");

    // let title = document.createElement("h3");
    // title.setAttribute("class", "task__list-text");
    // title.innerHTML = title.innerHTML + taskText;
    // this.tasks.push(taskText);

    let titleContainer = document.createElement("div");
    titleContainer.classList.add("task__list-container");

    let title = document.createElement("textarea");
    title.setAttribute("class", "task__list-text");
    title.addEventListener("input", autoResize, false);
    setTimeout(() => (title.style.height = title.scrollHeight + "px"), 0);
    title.value = taskText;
    this.tasks.push(taskText);

    let underlines = document.createElement("div");
    underlines.classList.add("task__list-underlines");
    titleContainer.appendChild(title);
    titleContainer.appendChild(underlines);

    let delBtn = document.createElement("button");
    delBtn.setAttribute("class", "task__list-deleteTaskBtn");
    delBtn.innerHTML = delBtn.innerHTML + "X";

    delBtn.addEventListener("click", () => {
      let deleteTaskId, deleteTaskListId;
      delBtn.parentNode.parentNode.childNodes.forEach((child, index) => {
        if (child === delBtn.parentNode) {
          deleteTaskId = index;
        }
      });
      delBtn.parentNode.parentNode.parentNode.parentNode.childNodes.forEach(
        (child, index) => {
          if (child === delBtn.parentNode.parentNode.parentNode) {
            deleteTaskListId = index;
          }
        }
      );
      this.tasks.splice(deleteTaskId, 1);
      delBtn.parentNode.parentNode.removeChild(delBtn.parentNode);
      localStorage.setItem("taskList", JSON.stringify(this.listArray));
    });

    taskItem.appendChild(titleContainer);
    taskItem.appendChild(delBtn);

    return taskItem;
  }

  addTask(task) {
    this.tasks.push(task);

    return this.createNewTask(task);
  }
}

class List {
  constructor() {
    this.listArray = [];
  }

  renderArray() {
    let taskSectionArray;
    this.listArray.forEach((list) => {
      let taskListSection = document.createElement("section");
      taskListSection.setAttribute("class", "task__list");

      let taskListTitle = document.createElement("h1");
      taskListTitle.setAttribute("class", "task__list-title");
      taskListTitle.innerHTML = list.name;

      list.tasks.forEach((task) => {
        let taskDiv = document.createElement("div");
        if (task.length > 0) {
          taskDiv.appendChild(list.renderTasks());
        }
      });

      let newTaskInput = document.createElement("input");
      newTaskInput.setAttribute("class", "task__list-input");
      newTaskInput.classList.add("input");

      let newTaskBtn = document.createElement("button");
      newTaskBtn.setAttribute("type", "button");
      newTaskBtn.classList.add("btn");
      newTaskBtn.classList.add("task__list-btn");
      newTaskBtn.innerHTML = newTaskBtn.innerHTML + "Add task";

      newTaskBtn.addEventListener("click", () => {
        let taskText = newTaskBtn.previousElementSibling;
        let tasksContainer = newTaskBtn.parentNode.parentNode.childNodes[1];

        let listIndex;
        const taskIndex =
          newTaskBtn.parentNode.parentNode.childNodes[1].childNodes.length - 1;

        newTaskBtn.parentNode.parentNode.parentNode.childNodes.forEach(
          (child, index) => {
            if (child === newTaskBtn.parentNode.parentNode) {
              listIndex = index;
            }
          }
        );

        tasksContainer.appendChild(
          this.listArray[listIndex].createNewTask(taskText.value)
        );
        taskText.value = "";
        localStorage.setItem("taskList", JSON.stringify(this.listArray));
      });

      let newTaskForm = document.createElement("form");
      newTaskForm.setAttribute("class", "task__list-form");
      newTaskForm.appendChild(newTaskInput);
      newTaskForm.appendChild(newTaskBtn);

      taskListSection.appendChild(taskListTitle);
      taskListSection.appendChild(taskDiv);
      taskListSection.appendChild(newTaskForm);

      taskSectionArray.appendChild(taskListSection);
    });

    return taskSectionArray;
  }

  createNewList(list) {
    let taskListSection = document.createElement("section");
    taskListSection.setAttribute("class", "task__list");

    let taskListTitle = document.createElement("h1");
    taskListTitle.setAttribute("class", "task__list-title");
    taskListTitle.innerHTML = taskListTitle.innerHTML + list.name;

    let taskDiv = document.createElement("div");
    if (list.tasks.length > 0) {
      taskDiv.appendChild(list.renderTasks());
    }

    let newTaskInput = document.createElement("input");
    newTaskInput.setAttribute("class", "task__list-input");
    newTaskInput.classList.add("input");

    let newTaskBtn = document.createElement("button");
    newTaskBtn.setAttribute("type", "button");
    newTaskBtn.classList.add("btn");
    newTaskBtn.classList.add("task__list-btn");
    newTaskBtn.innerHTML = newTaskBtn.innerHTML + "Add task";

    newTaskBtn.addEventListener("click", () => {
      let taskText = newTaskBtn.previousElementSibling;
      let tasksContainer = newTaskBtn.parentNode.parentNode.childNodes[1];

      let listIndex;
      const taskIndex =
        newTaskBtn.parentNode.parentNode.childNodes[1].childNodes.length - 1;

      newTaskBtn.parentNode.parentNode.parentNode.childNodes.forEach(
        (child, index) => {
          if (child === newTaskBtn.parentNode.parentNode) {
            listIndex = index;
          }
        }
      );

      tasksContainer.appendChild(
        this.listArray[listIndex].createNewTask(taskText.value)
      );
      taskText.value = "";
      localStorage.setItem("taskList", JSON.stringify(this.listArray));
    });

    let newTaskForm = document.createElement("form");
    newTaskForm.setAttribute("class", "task__list-form");
    newTaskForm.appendChild(newTaskInput);
    newTaskForm.appendChild(newTaskBtn);

    taskListSection.appendChild(taskListTitle);
    taskListSection.appendChild(taskDiv);
    taskListSection.appendChild(newTaskForm);

    console.log(this.listArray);
    return taskListSection;
  }

  addList(list) {
    this.listArray.push(list);
    localStorage.setItem("taskList", JSON.stringify(this.listArray));
    return this.createNewList(list);
  }
}
let tasker = new List();
console.log(JSON.parse(JSON.stringify(tasker)));
if (localStorage.taskList) {
  tasker.listArray = JSON.parse(localStorage.taskList);
  console.log(tasker);
  tasker.renderArray();
}

const content = document.getElementById("list");
const listForm = newList;

const addListBtn = listForm.elements.addList;
const newListName = listForm.elements.listName;

addListBtn.addEventListener("click", () => {
  let id = tasker.listArray.length ? tasker.listArray.length : 0;
  const newList = tasker.addList(new TaskList(id, newListName.value, content));
  content.appendChild(newList);

  newListName.value = "";

  addTaskBtns = content.querySelectorAll(".addTaskBtn");
});

function autoResize() {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
}
