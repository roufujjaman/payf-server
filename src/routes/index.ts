import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";

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
];

moduleRoutes.forEach((route) => {
	router.use(route.path, route.routes);
});

export const ModuleRoutes = router;
