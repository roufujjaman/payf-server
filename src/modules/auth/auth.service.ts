import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { envVars } from "../../config/env";
import AppError from "../../errors/AppError";
import { generateToken } from "../../utils/jwt";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";

const credentialLogin = async (payload: Partial<IUser>) => {
	const { email, password } = payload;
	const user = await User.findOne({ email });

	if (!user) {
		throw new AppError(StatusCodes.NOT_FOUND, "User does not exist");
	}

	const isPasswordMatch = await bcryptjs.compare(
		password as string,
		user.password as string
	);

	if (!isPasswordMatch) {
		throw new AppError(StatusCodes.BAD_REQUEST, "User password does not match");
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

export const AuthServices = { credentialLogin };
