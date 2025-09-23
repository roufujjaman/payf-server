import { model, Schema } from "mongoose";
import { IWallet, WalletType } from "./wallet.interface";

export const walletSchema = new Schema<IWallet>(
	{
		userId: { type: Schema.Types.ObjectId, required: true },
		walletType: {
			type: String,
			enum: Object.values(WalletType),
			required: true,
		},
		balance: { type: Number, default: 50 },
		totalBalance: { type: Number, default: 50 },
		lastTransaction: { type: Schema.Types.ObjectId },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export const Wallet = model<IWallet>("Wallet", walletSchema);
