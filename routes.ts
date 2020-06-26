import { Router } from "https://deno.land/x/oak/mod.ts";
import { getMainView } from "./controllers/home/main.ts";

const router = new Router();

router.get("/", getMainView);

export default router;
