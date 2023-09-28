import { useBase, createRouter, defineEventHandler } from "h3";

import * as request from "~~/server/controller/todo";

const router = createRouter();

router.get("/todo", defineEventHandler(request.read));
router.post("/todo", defineEventHandler(request.create));
router.patch("/todo/:id", defineEventHandler(request.markComplete));
router.put("/todo/:id", defineEventHandler(request.update));
router.delete("/todo/:id", defineEventHandler(request.remove));

export default useBase("/api", router.handler);
