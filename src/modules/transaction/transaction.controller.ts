/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";

const createTransaction = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { fromUserId, toUserId } = req.body;

		const fromUser = await User.findById(fromUserId);
		const toUser = await User.findById(toUserId);

		if (!fromUser || !toUser) {
			throw new AppError(StatusCodes.NOT_FOUND, "User not found");
		}

		console.log(fromUser, toUser);

		sendResponse(res, {
			statusCode: StatusCodes.CREATED,
			success: true,
			message: "Transaction successfull",
			data: {},
		});
	}
);

export const TransactionController = {
	createTransaction,
};
