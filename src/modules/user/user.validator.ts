import z from "zod";

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
});
