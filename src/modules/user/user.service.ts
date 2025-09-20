import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs";
import { envVars } from "../../config/env";

const createUser = async (payload: Partial<IUser>) => {
	const { email, password, ...rest } = payload;
	const isUserExist = await User.findOne({ email });

	if (isUserExist) {
		throw new AppError(StatusCodes.BAD_REQUEST, "User already exists");
	}

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

export const UserServices = {
	createUser,
	getAllUsers,
};
