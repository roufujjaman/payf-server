import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../utils/checkAuth";
import { UserController } from "./user.controller";
import { Role } from "./user.interface";
import { createUserZodSchema, updateUserZodSchema } from "./user.validator";

const router = Router();

router.post(
	"/register",
	validateRequest(createUserZodSchema),
	UserController.createUser
);
router.get(
	"/all-users",
	checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
	UserController.getAllUsers
);
router.patch(
	"/:id",
	validateRequest(updateUserZodSchema),
	checkAuth(...Object.values(Role)),
	UserController.updateUser
);

export const UserRoutes = router;
