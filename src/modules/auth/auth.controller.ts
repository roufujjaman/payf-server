/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const credentialLogin = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const loginInfo = await AuthServices.credentialLogin(req.body);

		sendResponse(res, {
			statusCode: StatusCodes.ACCEPTED,
			success: true,
			message: "User login successful",
			data: loginInfo,
		});
	}
);

const getNewAccessToken = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const refreshToken = req.headers.authorization as string;
		const token = await AuthServices.getNewAccessToken(refreshToken);

		sendResponse(res, {
			statusCode: StatusCodes.ACCEPTED,
			success: true,
			message: "User login refreshed",
			data: token,
		});
	}
);

export const AuthController = {
	credentialLogin,
	getNewAccessToken,
};
