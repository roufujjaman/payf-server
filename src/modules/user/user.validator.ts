import z from "zod";
import { IIsActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
	name: z.string("Name must be string").min(4).max(50),
	email: z.email(),
	password: z
		.string()
		.min(8, { error: "Password must be minimum 8 characters" })
		.regex(/^(?=.*[A-Z])/, {
			error: "Password must contain at least 1 uppercase letter",
		})
		.regex(/^(?=.*[!@#$%^&*])/, {
			error: "Password must contain at least 1 special character",
		})
		.regex(/^(?=.*\d)/, {
			error: "Password must contain at least 1 number",
		}),
	phone: z
		.string()
		.regex(/^(\+88|0088)?(01){1}[3456789]{1}(\d){8}/)
		.optional(),
	address: z
		.string("Address must be string")
		.max(200, { error: "Address connot exceed 200 characters" })
		.optional(),

	// role: z.enum(Object.values(Role)).optional(),
});

export const updateUserZodSchema = z.object({
	name: z.string("Name must be string").min(4).max(50).optional(),
	password: z
		.string()
		.min(8, { error: "Password must be minimum 8 characters" })
		.regex(/^(?=.*[A-Z])/, {
			error: "Password must contain at least 1 uppercase letter",
		})
		.regex(/^(?=.*[!@#$%^&*])/, {
			error: "Password must contain at least 1 special character",
		})
		.regex(/^(?=.*\d)/, {
			error: "Password must contain at least 1 number",
		})
		.optional(),
	phone: z
		.string()
		.regex(/^(\+88|0088)?(01){1}[3456789]{1}(\d){8}/)
		.optional(),
	address: z
		.string("Address must be string")
		.max(200, { error: "Address connot exceed 200 characters" })
		.optional(),
	role: z.enum(Object.values(Role)).optional(),
	isVarified: z.boolean().optional(),
	isActive: z.enum(Object.values(IIsActive)).optional(),
	isDeleted: z.boolean().optional(),
});
