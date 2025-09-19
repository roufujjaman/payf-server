/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import httpStatusCodes from "http-status-codes";
import AppError from "../errors/AppError";

export const globalErrorHandler = (
	error: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
	let message = "Something went wrong";

	if (error instanceof AppError) {
		statusCode = error.statusCode;
		message = error.message;
	}

	res.status(statusCode).json({
		success: false,
		message,
		error,
		stack: envVars.NODE_ENV === "development" ? error.stack : null,
	});
};
