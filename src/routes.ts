import { Router } from "express";
import { createUserController } from "./useCases/CreateUser";

const router = Router();

router.post("/users", (request, response, next) => {
  return createUserController.handle(request, response, next);
});

export { router };