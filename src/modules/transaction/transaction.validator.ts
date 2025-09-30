import z from "zod";

export const createTransactionZodSchema = z.object({
	userWalletId: z.string("User wallet ID must be a string"),
	recipientWalletId: z.string("Recipent wallet ID must be a string"),
	amount: z
		.number("Amount must be a number")
		.min(50, "Minimum transaction amount is 50"),
});
