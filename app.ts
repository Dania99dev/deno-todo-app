import { Application, send } from "https://deno.land/x/oak/mod.ts";
import {
  viewEngine,
  adapterFactory,
  engineFactory,
} from "https://deno.land/x/view_engine/mod.ts";
import router from "./routes.ts";

const port = Deno.env.get("PORT") || 5000;
const app = new Application();

const oakAdapter = adapterFactory.getOakAdapter();
const denjuckEngine = engineFactory.getDenjuckEngine();

app.use(viewEngine(oakAdapter, denjuckEngine));

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx, next) => {
  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}/static`,
  });
  next();
});

console.log(`Server: http://localhost:${port}/`);
await app.listen({ port: +port });
