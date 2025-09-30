/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import { TransactionServices } from "./transaction.service";

const createTransaction = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const transaction = await TransactionServices.createTransaction(req);

		sendResponse(res, {
			statusCode: StatusCodes.CREATED,
			success: true,
			message: "Transaction successfull",
			data: transaction,
		});
	}
);

export const TransactionController = {
	createTransaction,
};
