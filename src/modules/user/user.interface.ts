import { Types } from "mongoose";

export enum Role {
	SUPER_ADMIN = "SUPER_ADMIN",
	ADMIN = "ADMIN",
	USER = "USER",
	AGENT = "AGENT",
}

export interface IAuthProvider {
	provider: "google" | "credential";
	providerId: string;
}

export enum IIsActive {
	ACTIVE = "ACTIVE",
	INACTIVE = "INACTIVE",
	BLOCKED = "BLOCKED",
}

export interface IUser {
	_id?: Types.ObjectId;
	name: string;
	email: string;
	phone?: string;
	password?: string;
	address?: string;
	role: Role;

	isVarified: boolean;
	isActive: IIsActive;
	isDeleted?: boolean;

	auths: IAuthProvider[];
	wallets?: Types.ObjectId[];
}
