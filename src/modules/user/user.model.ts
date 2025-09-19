import { model, Schema, Types } from "mongoose";
import { IAuthProvider, IIsActive, IUser, Role } from "./user.interface";

const authProviderSchema = new Schema<IAuthProvider>(
	{
		provider: String,
		providerId: String,
	},
	{ versionKey: false, _id: false }
);

const userSchema = new Schema<IUser>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		phone: { type: String },
		password: { type: String },
		address: { type: String },
		role: {
			type: String,
			enum: Object.values(Role),
			default: Role.USER,
		},

		isVarified: {
			type: Boolean,
			default: false,
		},
		isActive: {
			type: String,
			enum: Object.values(IIsActive),
			default: IIsActive.INACTIVE,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},

		auths: {
			type: [authProviderSchema],
			required: true,
			// validate: {
			// 	validator: (v) => {
			// 		return v.length > 0;
			// 	},
			// 	message: "Atleast a single auth is required",
			// },
		},
		wallets: {
			type: [Types.ObjectId],
		},
	},
	{ timestamps: true, versionKey: false }
);

export const User = model<IUser>("User", userSchema);
