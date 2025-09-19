/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";

const createUser = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const user = await UserServices.createUser(req.body);

		sendResponse(res, {
			statusCode: StatusCodes.CREATED,
			success: true,
			message: "User created successfully",
			data: user,
		});
	}
);

const getAllUsers = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const users = await UserServices.getAllUsers();

		sendResponse(res, {
			statusCode: StatusCodes.OK,
			success: true,
			message: "All users retieved successfully",
			data: users,
		});
	}
);

const needImplment = (req: Request, res: Response, next: NextFunction) => {
	sendResponse(res, {
		statusCode: 200,
		success: false,
		message: `${req.url} needs to be implemented`,
		data: null,
	});
};

export const UserController = { createUser, getAllUsers, needImplment };
