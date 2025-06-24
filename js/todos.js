let todosData = [];
const getData = localStorage.getItem("todos");
let acceptArea = "addTodos";

const txtTodo = document.getElementById("txttodo");
const txtUpdate = document.getElementById("txtUpdate");
let newId = null;
const btnSave = document.querySelector(".btn-save");
const todoList = document.querySelector(".todo--data");
const modal = document.querySelector(".modal");
const btnUpdate = document.querySelector(".btn-update");

if (getData) {
  todosData = JSON.parse(getData);
  renderData();
}

const saveData = function () {
  const todos = txtTodo.value;
  if (!todos) return;
  todosData.push(todos);
  todoList.innerHTML = "";
  localStorage.setItem("todos", JSON.stringify(todosData));

  renderData();
  txtTodo.value = "";
  acceptArea = "addTodos";
};

const updateTodo = function () {
  const retData = todosData.map((item, i) =>
    i === Number(newId) ? txtUpdate.value : item
  );
  todosData = retData;
  localStorage.setItem("todos", JSON.stringify(todosData));
  renderData();
  modal.classList.remove("modal--open");
  acceptArea = "addTodos";
};

btnUpdate.addEventListener("click", updateTodo);

btnSave.addEventListener("click", saveData);

function setId(id) {
  return (newId = id);
}

function renderData() {
  todoList.innerHTML = "";
  todosData.map((t, i) => {
    todoList.insertAdjacentHTML(
      "beforeend",
      `<li class="list--datas" data-id="${i}"><span class="text__list__item">${t}</span>
      <span><button class="btn-edit btn-success">✒️Edit</button>
      <button class="btn-delete btn-delete">🗑️Delete</button></span>
      </li>`
    );
  });
}
todoList.addEventListener("click", function (e) {
  const clicked = e.target.closest(".btn-edit");
  if (!clicked) return;
  const data = clicked.closest(".list--datas");
  const item = data.querySelector(".text__list__item");
  const id = data.dataset.id;

  if (clicked) {
    acceptArea = "updateTodos";
    modal.classList.add("modal--open");
    setId(id);
    txtUpdate.value = item.textContent;
    txtUpdate.focus();
  }
});

todoList.addEventListener("click", function (e) {
  const clicked = e.target.closest(".btn-delete");
  if (!clicked) return;
  const data = clicked.closest(".list--datas");
  const id = +data.dataset.id;
  if (clicked) {
    const newData = todosData.filter((_, i) => i !== id);
    todosData = newData;
    localStorage.setItem("todos", JSON.stringify(todosData));
  }

  renderData();
});

document.addEventListener("keydown", function (e) {
  const txtTodos = txtTodo.value;
  if (!txtTodos) return;
  if (e.key === "Enter") {
    if (acceptArea === "addTodos") {
      saveData();
    } else if (acceptArea === "updateTodos") {
      updateTodo();
    }
  }
});
