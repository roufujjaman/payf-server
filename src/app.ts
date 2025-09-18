import Express, { Request, Response } from "express";

export const app = Express();

app.use(Express.json());
app.get("/", (req: Request, res: Response) => {
	res.status(200).json({ message: "app is working" });
});
