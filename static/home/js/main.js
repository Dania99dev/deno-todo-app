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
      todoList.innerHTML = "";
      response.newList.forEach((element, i) => {
        if (element.is_completed) {
          todoList.innerHTML += `
                <li class="todo-item">
                <input type="hidden" class="todo-id" value="${element.id}" />
                    <div class="title-checkbox">
                    <input type="checkbox" class="is-completed" checked />
                    <p class="todo-title checked">${element.title}</p>
                    </div>
                    <img src="/home/img/trash.svg" class="delete-icon" alt="delete" />
                </li>
            `;
        } else {
          todoList.innerHTML += `
                <li class="todo-item">
                <input type="hidden" class="todo-id" value="${element.id}" />
                    <div class="title-checkbox">
                    <input type="checkbox" class="is-completed" />
                    <p class="todo-title">${element.title}</p>
                    </div>
                    <img src="/home/img/trash.svg" class="delete-icon" alt="delete" />
                </li>
            `;
        }
        console.log(response.newList.length);

        if (i != response.newList.length - 1) {
          todoList.innerHTML += `<div class="item-devider"></div>`;
        }
      });
      console.log(response);
    } else {
      console.log(xhr.responseText);
    }
  };
  xhr.send(`title=${newTitle.value}`);

  newTitle.value = "";
});
