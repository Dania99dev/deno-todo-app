import { Router } from "https://deno.land/x/oak/mod.ts";
import { getMainView, addTodo } from "./controllers/home/main.ts";

const router = new Router();

router.get("/", getMainView)
  .post("/add-todo", addTodo);

export default router;
