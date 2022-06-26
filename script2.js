class TaskList {
  constructor(id, name, parent, tasks = []) {
    this.id = id;
    this.name = name;
    this.parent = parent;
    this.tasks = tasks;
  }

  renderTasks() {
    let taskList = document.createElement("ul");
    taskList.setAttribute("class", "task__list-list");
    this.tasks.map((elem, id) => {
      taskList.append(this.renderNewTask(elem));
    });
    return taskList;
  }

  renderNewTask(taskText) {
    let taskItem = document.createElement("li");
    taskItem.setAttribute("class", "task__list-item");

    let titleContainer = document.createElement("div");
    titleContainer.classList.add("task__list-container");

    let title = document.createElement("textarea");
    title.setAttribute("class", "task__list-text");
    title.addEventListener("input", autoResize, false);
    title.addEventListener("input", () => {
      console.log(JSON.stringify(this.tasks));
      let updateTaskId;
      title.parentNode.parentNode.parentNode.childNodes.forEach(
        (child, index) => {
          if (child === title.parentNode.parentNode) {
            updateTaskId = index;
          }
        }
      );
      this.tasks[updateTaskId] = title.value;
      console.log(JSON.stringify(this.tasks));
    });
    title.addEventListener("input", saveData, false);
    setTimeout(() => {
      title.parentNode.style.maxHeight = title.scrollHeight + "px";
    }, 0);
    title.value = taskText;
    console.log(title.rows);

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
      saveData();
    });

    taskItem.appendChild(titleContainer);
    taskItem.appendChild(delBtn);

    return taskItem;
  }

  createNewTask(taskText) {
    this.tasks.push(taskText);
    return this.renderNewTask(taskText);
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
    const content = document.getElementById("list");
    this.listArray = this.listArray.map(
      (elem) => new TaskList(elem.id, elem.name, content, elem.tasks)
    );

    let taskSectionArray = document.getElementById("list");
    this.listArray.forEach((listObject) => {
      console.log(listObject.tasks);
      let taskListSection = document.createElement("section");
      taskListSection.setAttribute("class", "task__list");

      let taskListTitle = document.createElement("h1");
      taskListTitle.setAttribute("class", "task__list-title");
      taskListTitle.innerHTML = listObject.name;

      // const listObject = new TaskList(
      //   list.id,
      //   list.name,
      //   taskListSection,
      //   list.tasks
      // );

      console.log(listObject);
      let renderedTaskList = listObject.renderTasks();

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
        saveData();
      });

      let newTaskForm = document.createElement("form");
      newTaskForm.setAttribute("class", "task__list-form");
      newTaskForm.appendChild(newTaskInput);
      newTaskForm.appendChild(newTaskBtn);

      taskListSection.appendChild(taskListTitle);
      taskListSection.appendChild(renderedTaskList);
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

    let taskList = document.createElement("ul");
    taskList.setAttribute("class", "task__list-list");

    taskDiv.appendChild(taskList);

    if (list.tasks.length > 0) {
      taskList.appendChild(list.renderTasks());
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
      saveData();
    });

    let newTaskForm = document.createElement("form");
    newTaskForm.setAttribute("class", "task__list-form");
    newTaskForm.appendChild(newTaskInput);
    newTaskForm.appendChild(newTaskBtn);

    taskListSection.appendChild(taskListTitle);
    taskListSection.appendChild(taskList);
    taskListSection.appendChild(newTaskForm);

    console.log(this.listArray);
    return taskListSection;
  }

  addList(list) {
    this.listArray.push(list);
    saveData();
    return this.createNewList(list);
  }
}

// localStorage.removeItem("taskList");
let tasker = new List();

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
  console.log(tasker.listArray);

  newListName.value = "";

  addTaskBtns = content.querySelectorAll(".addTaskBtn");
});

function autoResize() {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
  // this.style.height = this.scrollHeight + "px";
  this.parentNode.style.maxHeight = this.scrollHeight + "px";
  console.log(this.scrollHeight);
}

function saveData() {
  localStorage.setItem("taskList", JSON.stringify(tasker.listArray));
  console.log(localStorage.taskList);
}
