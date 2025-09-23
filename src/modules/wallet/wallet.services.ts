import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { IIsActive, IUser, Role } from "../user/user.interface";
import { IWallet, WalletType } from "./wallet.interface";
import { Types } from "mongoose";
import { Wallet } from "./wallet.model";

const createWallet = async (user: IUser) => {
	if ([Role.ADMIN, Role.SUPER_ADMIN].includes(user.role)) {
		throw new AppError(
			StatusCodes.BAD_REQUEST,
			`${user.role} is not allowed to have a wallet`
		);
	}

	if (
		!user.isVarified ||
		user.isActive !== IIsActive.ACTIVE ||
		user.isDeleted
	) {
		throw new AppError(
			StatusCodes.FORBIDDEN,
			"You are not eligible to open a wallet"
		);
	}

	const payload: IWallet = {
		userId: user._id as Types.ObjectId,
		walletType:
			user.role === "USER" ? WalletType.PERSONAL : WalletType.BUSINESS,
	};

	const wallet = await Wallet.create(payload);

	return wallet;
};

export const WalletServices = {
	createWallet,
};
