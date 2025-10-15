import { TGenericErrorResponse } from "../interface/error.types";

export const handleCastError = (): TGenericErrorResponse => {
	return {
		statusCode: 400,
		message: `Invalid MongoDB ObjectID`,
	};
};
