import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import {
	createNewTokenWithRefreshToken,
	createUserToken,
} from "../../utils/userToken";
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
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { password: hPassword, ...rest } = user.toObject();

	const { accessToken, refreshToken } = createUserToken(rest);

	return { accessToken, refreshToken, user: rest };
};

const getNewAccessToken = async (refreshToken: string) => {
	const token = await createNewTokenWithRefreshToken(refreshToken);

	return token;
};

export const AuthServices = { credentialLogin, getNewAccessToken };
