import Express, { Request, Response } from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { notFound } from "./middlewares/notFound";
import { ModuleRoutes } from "./routes";

export const app = Express();

app.use(Express.json());

app.use("/api/v1", ModuleRoutes);
app.get("/", async (req: Request, res: Response) => {
	res.status(200).json({ message: "app is working" });
});
app.use(globalErrorHandler);
app.use(notFound);
