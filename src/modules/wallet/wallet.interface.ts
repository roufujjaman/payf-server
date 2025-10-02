import { Types } from "mongoose";

export enum WalletType {
	PERSONAL = "PERSONAL",
	BUSINESS = "BUSINESS",
}

export interface IWallet {
	_id?: Types.ObjectId;
	userId: Types.ObjectId;
	walletType: WalletType;
	balance: number;
	totalBalance?: number;
	lastTransaction?: Types.ObjectId | null;
}
