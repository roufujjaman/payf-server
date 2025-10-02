import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppError from "../errors/AppError";
import { verifyToken } from "./jwt";

export const checkAuth =
	(...authRoles: string[]) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			const accessToken = req.cookies.accessToken;
			if (!accessToken) {
				throw new AppError(StatusCodes.FORBIDDEN, "Access token not found");
			}
			const varifiedToken = verifyToken(
				accessToken,
				envVars.JWT_ACCESS_SECRET
			) as JwtPayload;

			if (!authRoles.includes(varifiedToken.role)) {
				throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized");
			}
			req.user = varifiedToken;
			next();
		} catch (error) {
			next(error);
		}
	};
