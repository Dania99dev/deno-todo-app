const addBtn = document.querySelector(".add-btn");
const todoList = document.querySelector(".todo-list");
funcUpdater(todoList);

// Add new todo
addBtn.addEventListener("click", (e) => {
  let newTitle = document.querySelector("#new-title");

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/", true);
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

// Updades all functions when the list updates
function funcUpdater(newList) {
  const todoItem = newList.querySelectorAll(".todo-item");
  todoItem.forEach((element) => {
    const checkbox = element.querySelector(".is-completed");
    const title = element.querySelector(".todo-title");
    const deleteBtn = element.querySelector(".delete-icon");
    const id = element.querySelector(".todo-id").value;

    checkbox.addEventListener("change", () => {
      const newVal = checkbox.checked;
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", "/", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onload = () => {
        if (xhr.status == 200) {
          const response = JSON.parse(xhr.response);
          const newList = response.newList;
          listUpdater(newList, todoList);
        } else {
          console.log(xhr.responseText);
        }
      };
      xhr.send(`is_completed=${newVal}&id=${id}`);
    });

    deleteBtn.addEventListener("click", () => {
      const xhr = new XMLHttpRequest();
      xhr.open("DELETE", "/", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onload = () => {
        if (xhr.status == 200) {
          const response = JSON.parse(xhr.response);
          const newList = response.newList;
          listUpdater(newList, todoList);
        } else {
          console.log(xhr.responseText);
        }
      };
      xhr.send(`id=${id}`);
    });
  });
}

// Todo list updater

function listUpdater(newArray, oldList) {
  oldList.innerHTML = "";
  newArray.forEach((el, i) => {
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
    if (i != newArray.length - 1) {
      oldList.innerHTML += `<div class="item-devider"></div>`;
    }
  });
  const newList = oldList;
  funcUpdater(newList);
}
