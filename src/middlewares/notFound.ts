import { Request, Response } from "express";

export const notFound = async (req: Request, res: Response) => {
	res.status(201).json({
		success: false,
		message: "Route not found",
		data: null,
	});
};
