import { StatusCodes } from "http-status-codes";
import { Types } from "mongoose";
import AppError from "../../errors/AppError";
import { IIsActive, Role } from "../user/user.interface";
import { User } from "../user/user.model";
import { IWallet, WalletType } from "./wallet.interface";
import { Wallet } from "./wallet.model";

const createWallet = async (userId: string) => {
	const user = await User.findById(userId);

	if (!user) {
		throw new AppError(StatusCodes.BAD_REQUEST, "User not found");
	}

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
			`You can not opne a wallet right now. Your status {${user.isVarified}, ${user.isActive}, ${user.isDeleted}}`
		);
	}

	const payload: Partial<IWallet> = {
		userId: user._id as Types.ObjectId,
		walletType:
			user.role === "USER" ? WalletType.PERSONAL : WalletType.BUSINESS,
	};

	const wallet = await Wallet.create(payload);

	user.wallets?.push(wallet._id);

	await user.save();

	return wallet;
};

const deleteWallet = async (walletId: string) => {
	const wallet = await Wallet.findByIdAndDelete(walletId);
	if (!wallet) {
		throw new AppError(StatusCodes.BAD_REQUEST, "Can't delete the wallet");
	}

	return wallet;
};

export const WalletServices = {
	createWallet,
	deleteWallet,
};
