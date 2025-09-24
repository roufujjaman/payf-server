import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { WalletRoutes } from "../modules/wallet/wallet.route";
import { TransactionRoutes } from "../modules/transaction/transaction.route";

interface ModuleRouteObject {
	path: string;
	routes: Router;
}

const router = Router();

const moduleRoutes: ModuleRouteObject[] = [
	{
		path: "/user",
		routes: UserRoutes,
	},
	{
		path: "/auth",
		routes: AuthRoutes,
	},
	{
		path: "/wallet",
		routes: WalletRoutes,
	},
	{
		path: "/transaction",
		routes: TransactionRoutes,
	},
];

moduleRoutes.forEach((route) => {
	router.use(route.path, route.routes);
});

export const ModuleRoutes = router;
