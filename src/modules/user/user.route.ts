import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../utils/checkAuth";
import { UserController } from "./user.controller";
import { createUserZodSchema } from "./user.validator";

const router = Router();

router.post(
	"/register",
	validateRequest(createUserZodSchema),
	UserController.createUser
);
router.get("/all-users", checkAuth("ADMIN"), UserController.getAllUsers);

export const UserRoutes = router;
