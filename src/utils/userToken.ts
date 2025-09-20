import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { IIsActive, IUser } from "../modules/user/user.interface";
import { generateToken, verifyToken } from "./jwt";
import { User } from "../modules/user/user.model";
import AppError from "../errors/AppError";
import { StatusCodes } from "http-status-codes";

export const createUserToken = (payload: Partial<IUser>) => {
	const { _id, email, role } = payload;

	const jwtPayload = {
		userId: _id,
		email: email,
		role: role,
	};

	const accessToken = generateToken(
		jwtPayload,
		envVars.JWT_ACCESS_SECRET,
		envVars.JWT_ACCESS_EXPIRES
	);

	const refreshToken = generateToken(
		jwtPayload,
		envVars.JWT_REFRESH_SECRET,
		envVars.JWT_REFRESH_EXPIRES
	);

	return { accessToken, refreshToken };
};

export const createNewTokenWithRefreshToken = async (refreshToken: string) => {
	const verifiedToken = verifyToken(
		refreshToken,
		envVars.JWT_REFRESH_SECRET
	) as JwtPayload;

	const user = await User.findOne({ email: verifiedToken.email });

	if (!user) {
		throw new AppError(StatusCodes.BAD_REQUEST, "User does not exist");
	}

	if (
		user.isActive === IIsActive.BLOCKED ||
		user.isActive === IIsActive.INACTIVE
	) {
		throw new AppError(
			StatusCodes.BAD_REQUEST,
			`User currently ${user.isActive}`
		);
	}

	if (user.isDeleted) {
		throw new AppError(StatusCodes.BAD_REQUEST, "User is deleted");
	}

	const jwtPayload = {
		userId: user._id,
		email: user.email,
		role: user.role,
	};

	const accessToken = generateToken(
		jwtPayload,
		envVars.JWT_ACCESS_SECRET,
		envVars.JWT_ACCESS_EXPIRES
	);

	return { accessToken };
};
