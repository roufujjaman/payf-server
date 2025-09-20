/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import { StatusCodes } from "http-status-codes";

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

export const AuthController = {
	credentialLogin,
};
