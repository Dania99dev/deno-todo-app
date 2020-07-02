import client from "../../models/config.ts";

export async function getMainView(ctx: any) {
  await client.connect();
  const todos = await client.query(
    "SELECT * FROM public.todos ORDER BY id ASC",
  );
  const context = {
    todos: todos.rowsOfObjects(),
  };
  ctx.render("./views/home/index.html", context);
}

export async function addTodo(ctx: any) {
  const body = await ctx.request.body();
  const newTodo = body.value.get("title");

  if (newTodo != "") {
    const query = await client.query(
      "INSERT INTO todos(title, is_completed) VALUES($1, $2)",
      newTodo,
      false,
    );
    const result = await client.query("SELECT * FROM todos ORDER BY id ASC");
    ctx.response.status = 201;
    ctx.response.body = {
      success: true,
      newList: result.rowsOfObjects(),
    };
  } else {
    ctx.response.status = 400;
    ctx.response.body = {
      success: false,
      message: "Title should be provided",
    };
  }
}

export async function updateTodo(ctx: any) {
  const body = await ctx.request.body();
  const isCompleted = body.value.get("is_completed");
  const id = body.value.get("id");
  const query = await client.query(
    "UPDATE todos SET is_completed=$1 WHERE id=$2",
    isCompleted,
    id,
  );
  const result = await client.query("SELECT * FROM todos ORDER BY id ASC");
  ctx.response.status = 200;
  ctx.response.body = {
    success: true,
    newList: result.rowsOfObjects(),
  };
}

export async function deleteTodo(ctx: any) {
  const body = await ctx.request.body();
  const id = body.value.get("id");
  const query = await client.query("DELETE FROM todos WHERE id=$1", id);
  const result = await client.query("SELECT * FROM todos ORDER BY id ASC");
  ctx.response.status = 200;
  ctx.response.body = {
    success: true,
    newList: result.rowsOfObjects(),
  };
}
