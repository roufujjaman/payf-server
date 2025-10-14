import { ZodError } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../interface/error.types";

export const handleZodError = (error: ZodError): TGenericErrorResponse => {
	const errorSources: TErrorSources[] = [];
	error.issues.forEach((issue) => {
		errorSources.push({
			path: issue.path[issue.path.length - 1] as string,
			message: issue.message,
		});
	});

	return {
		statusCode: 400,
		message: "Zod validation error",
		errorSources,
	};
};
