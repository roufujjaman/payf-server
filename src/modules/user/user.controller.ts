/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserServices } from "./user.service";

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

const updateUser = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const userId = req.params.id;
		const payload = req.body;
		const token = req.user;

		const user = await UserServices.updateUser(userId, payload, token);

		sendResponse(res, {
			statusCode: StatusCodes.ACCEPTED,
			success: true,
			message: "User updated successfully",
			data: user,
		});
	}
);

export const UserController = { createUser, getAllUsers, updateUser };
