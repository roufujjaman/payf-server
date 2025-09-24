import { model, Schema } from "mongoose";
import { ITransaction, TransactionType } from "./transaction.interface";

const transactionSchema = new Schema<ITransaction>(
	{
		from: { type: Schema.Types.ObjectId, required: true },
		to: { type: Schema.Types.ObjectId, required: true },
		amount: { type: Number, required: true },
		transactionType: {
			type: String,
			enum: Object.values(TransactionType),
			required: true,
		},
	},
	{ timestamps: true, versionKey: false }
);

export const Transaction = model<ITransaction>(
	"Transaction",
	transactionSchema
);
