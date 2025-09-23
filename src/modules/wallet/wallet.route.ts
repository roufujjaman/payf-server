/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from "express";
import { WalletContollers } from "./walet.controller";

const router = Router();

router.post("/register", WalletContollers.createWallet);

export const WalletRoutes = router;
