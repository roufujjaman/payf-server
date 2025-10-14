import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import AppError from "../../errors/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: Partial<IUser>) => {
	const { email, password, ...rest } = payload;
	// emmited for new globalErrorHandler -> handleDuplicateError()
	// const isUserExist = await User.findOne({ email });

	// if (isUserExist) {
	// 	throw new AppError(StatusCodes.BAD_REQUEST, "User already exists");
	// }

	const hashedPassword = await bcryptjs.hash(
		password as string,
		parseInt(envVars.BCRYPT_SALT_ROUND)
	);

	const authProvider: IAuthProvider = {
		provider: "credential",
		providerId: email as string,
	};

	const user = await User.create({
		...rest,
		email: email,
		password: hashedPassword,
		auths: authProvider,
	});

	return user;
};

const getAllUsers = async () => {
	const users = await User.find({});
	return users;
};

const updateUser = async (
	userId: string,
	payload: Partial<IUser>,
	decodedToken: JwtPayload
) => {
	const user = await User.findById(userId);

	if (!user) {
		throw new AppError(StatusCodes.NOT_FOUND, "User not found");
	}

	if (payload?.role) {
		if (decodedToken.role === Role.USER || decodedToken.role === Role.AGENT) {
			throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized");
		}

		if (payload.role === Role.SUPER_ADMIN) {
			throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized");
		}
	}

	if (payload.isVarified || payload.isActive || payload.isDeleted) {
		if (decodedToken.role === Role.USER || decodedToken.role === Role.AGENT) {
			throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized");
		}
	}

	if (payload.password) {
		payload.password = await bcryptjs.hash(
			payload.password,
			envVars.BCRYPT_SALT_ROUND
		);
	}

	const updatedUser = await User.findByIdAndUpdate(userId, payload, {
		new: true,
	});

	return updatedUser;
};

export const UserServices = {
	createUser,
	getAllUsers,
	updateUser,
};
