import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const generateToken = (
	payload: JwtPayload,
	secret: string,
	expiresIn: string
) => {
	const token = jwt.sign(payload, secret, { expiresIn } as SignOptions);

	return token;
};

export const verifyToken = (token: string, secreet: string) => {
	const varifiedToken = jwt.verify(token, secreet);
	return varifiedToken;
};
