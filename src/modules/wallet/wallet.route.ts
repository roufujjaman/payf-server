/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from "express";
import { WalletContollers } from "./walet.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../utils/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post(
	"/register",
	checkAuth(Role.AGENT, Role.USER),
	WalletContollers.createWallet
);

router.delete(
	"/delete",
	checkAuth(Role.AGENT, Role.USER),
	WalletContollers.deleteWallet
);

export const WalletRoutes = router;
