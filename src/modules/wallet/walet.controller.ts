/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { User } from "../user/user.model";
import { WalletServices } from "./wallet.services";

const createWallet = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { userId } = req.user;

		const wallet = await WalletServices.createWallet(userId);

		sendResponse(res, {
			statusCode: StatusCodes.CREATED,
			success: true,
			message: "Wallet created successfully",
			data: wallet,
		});
	}
);

const deleteWallet = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { walletId } = req.body;

		// eslint-disable-next-line no-console
		console.log(walletId);
		// const wallet = await WalletServices.deleteWallet(walletId);

		sendResponse(res, {
			statusCode: StatusCodes.ACCEPTED,
			success: true,
			message: "Wallet delete successfully",
			data: {},
		});
	}
);

export const WalletContollers = { createWallet, deleteWallet };
