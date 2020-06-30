import client from "../../models/config.ts";

export async function getMainView(ctx: any) {
  await client.connect();
  const todos = await client.query(
    "SELECT * FROM public.todos ORDER BY id ASC",
  );
  const context = {
    "todos": todos.rowsOfObjects(),
  };
  ctx.render("./views/home/index.html", context);
}
