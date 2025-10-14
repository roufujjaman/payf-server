/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatusCodes from "http-status-codes";
import { envVars } from "../config/env";
import AppError from "../errors/AppError";
import { TErrorSources } from "../interface/error.types";
import { inspect } from "util";
import { handleDuplicateError } from "../helpers/handleDuplicateError";
import { handleCastError } from "../helpers/handleCastError";
import { handleValidationError } from "../helpers/handleValidationError";
import { ZodError } from "zod";
import { handleZodError } from "../helpers/handleZodError";

export const globalErrorHandler = (
	error: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
	let message = "Something went wrong";
	let errorSources: TErrorSources[] = [];

	// catches mongo duplicate error
	// does not require duplicate check in modules.module.service func
	if (error.code === 11000) {
		const simplifiedError = handleDuplicateError(error);

		statusCode = simplifiedError.statusCode;
		message = simplifiedError.message;
	}
	// objcet ID or CastError
	else if (error.name === "CastError") {
		const simplifiedError = handleCastError();

		statusCode = simplifiedError.statusCode;
		message = simplifiedError.message;
	}
	// optional mongoose validation error will be overwritten by zod error
	else if (error.name === "ValidationError") {
		const simplifiedError = handleValidationError(error);

		statusCode = simplifiedError.statusCode;
		message = simplifiedError.message;
		errorSources = simplifiedError.errorSources as TErrorSources[];
	}
	// zod error
	else if (error instanceof ZodError) {
		const simplifiedError = handleZodError(error);
		statusCode = simplifiedError.statusCode;
		message = simplifiedError.message;
		errorSources = simplifiedError.errorSources as TErrorSources[];
	}
	// custom AppError
	else if (error instanceof AppError) {
		statusCode = error.statusCode;
		message = error.message;
	}
	// general
	else if (error instanceof Error) {
		message = error.message;
	}

	// error inspection
	// console.log(inspect(error, { showHidden: true, depth: 3 }));

	res.status(statusCode).json({
		success: false,
		message,
		errorSources,
		error: envVars.NODE_ENV === "development" ? error : null,
		stack: envVars.NODE_ENV === "development" ? error.stack : null,
	});
};
