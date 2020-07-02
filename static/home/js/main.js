const addBtn = document.querySelector(".add-btn");
const todoList = document.querySelector(".todo-list");

addBtn.addEventListener("click", (e) => {
  let newTitle = document.querySelector("#new-title");

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/add-todo", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onload = () => {
    if (xhr.status == 201) {
      const response = JSON.parse(xhr.response);
      const newList = response.newList;
      listUpdater(newList, todoList);
    } else {
      console.log(xhr.responseText);
    }
  };
  xhr.send(`title=${newTitle.value}`);

  newTitle.value = "";
});

// Todo list updater function

function listUpdater(newList, oldList) {
  oldList.innerHTML = "";
  newList.forEach((el, i) => {
    if (el.is_completed) {
      oldList.innerHTML += `
            <li class="todo-item">
            <input type="hidden" class="todo-id" value="${el.id}" />
                <div class="title-checkbox">
                <input type="checkbox" class="is-completed" checked />
                <p class="todo-title checked">${el.title}</p>
                </div>
                <img src="/home/img/trash.svg" class="delete-icon" alt="delete" />
            </li>
        `;
    } else {
      oldList.innerHTML += `
            <li class="todo-item">
            <input type="hidden" class="todo-id" value="${el.id}" />
                <div class="title-checkbox">
                <input type="checkbox" class="is-completed" />
                <p class="todo-title">${el.title}</p>
                </div>
                <img src="/home/img/trash.svg" class="delete-icon" alt="delete" />
            </li>
        `;
    }
    if (i != newList.length - 1) {
      todoList.innerHTML += `<div class="item-devider"></div>`;
    }
  });
}
