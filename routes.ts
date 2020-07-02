import { Router } from "https://deno.land/x/oak/mod.ts";
import { getMainView, addTodo, updateTodo } from "./controllers/home/main.ts";

const router = new Router();

router.get("/", getMainView).post("/", addTodo).put("/", updateTodo);

export default router;
