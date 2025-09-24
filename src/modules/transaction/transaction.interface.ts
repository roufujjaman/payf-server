import { Types } from "mongoose";

export enum TransactionType {
	TRANSFER = "TRANSFER",
	WITHDRAWAL = "WITHDRAWAL",
}

export interface ITransaction {
	_id?: Types.ObjectId;
	from: Types.ObjectId;
	to: Types.ObjectId;
	amount: number;
	transactionType: TransactionType;
}
