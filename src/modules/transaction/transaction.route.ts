import { Router } from "express";
import { TransactionController } from "./transaction.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createTransactionZodSchema } from "./transaction.validator";
import { checkAuth } from "../../utils/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post(
	"/send",
	validateRequest(createTransactionZodSchema),
	checkAuth(Role.AGENT, Role.USER),
	TransactionController.createTransaction
);

export const TransactionRoutes = router;
