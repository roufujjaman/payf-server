import { Request } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { Wallet } from "../wallet/wallet.model";
import { ITransaction, TransactionType } from "./transaction.interface";
import { Transaction } from "./transaction.models";

const createTransaction = async (req: Request) => {
	const { userWalletId, recipientWalletId, amount } = req.body;
	const { userId } = req.user;

	const user = await User.findById(userId);
	if (!user) {
		throw new AppError(StatusCodes.BAD_GATEWAY, "User not found");
	}

	if (user.wallets?.length === 0) {
		throw new AppError(StatusCodes.BAD_REQUEST, "User doesn't have any wallet");
	}

	if (!user.wallets?.includes(userWalletId)) {
		throw new AppError(StatusCodes.BAD_REQUEST, "Invalid sender wallet ID");
	}

	let userWallet = await Wallet.findById(userWalletId);
	if (!userWallet) {
		throw new AppError(StatusCodes.BAD_REQUEST, "User wallet not found");
	}

	const parsedAmount = parseInt(amount);
	if (userWallet.balance < parsedAmount) {
		throw new AppError(StatusCodes.BAD_REQUEST, "Insufficient balance");
	}

	const recipientWallet = await Wallet.findById(recipientWalletId);

	if (!recipientWallet) {
		throw new AppError(
			StatusCodes.BAD_REQUEST,
			"Recipient wallet is not found"
		);
	}

	const session = await mongoose.startSession();

	try {
		await session.startTransaction();

		userWallet = await Wallet.findByIdAndUpdate(
			userWalletId,
			{
				$inc: { balance: -parsedAmount },
			},
			{ new: true, session }
		);

		const recipeintWallet = await Wallet.findByIdAndUpdate(
			recipientWalletId,
			{
				$inc: { balance: parsedAmount },
			},
			{ new: true, session }
		);

		const transactionPayload: ITransaction = {
			from: userWalletId,
			to: recipientWalletId,
			amount: parsedAmount,
			transactionType: TransactionType.TRANSFER,
		};

		const transaction = await Transaction.create([transactionPayload], {
			session,
		});
		await session.commitTransaction();
		return { userWallet, recipeintWallet, transaction };
	} catch (err) {
		await session.abortTransaction();
		return err;
	} finally {
		await session.endSession();
	}
};

export const TransactionServices = {
	createTransaction,
};
