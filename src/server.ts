/* eslint-disable no-console */
import { Server } from "http";
import { app } from "./app";
import mongoose from "mongoose";
import { envVars } from "./config/env";
import { seedSuperAdmin } from "./utils/seedSuperAdmin";

let server: Server;

const startServer = async () => {
	try {
		if (envVars.NODE_ENV === "production") {
			await mongoose.connect(envVars.DB_URL);
		} else {
			await mongoose.connect(envVars.DB_URL_LOCAL);
		}

		console.log(`✅ sonnected to DB: ${envVars.NODE_ENV}`);

		server = app.listen(process.env.PORT, () => {
			console.log("✅ Server is listening to PORT: 5000");
		});
	} catch (err) {
		console.log(err);
	}
};

// unhandled rejection errors
process.on("unhandledRejection", (err) => {
	console.log(
		"❌ Server Shutting Down... unhandledRejection detected... ",
		err
	);

	if (server) {
		server.close(() => process.exit(1));
	}

	process.exit(1);
});

(async () => {
	await startServer();
	await seedSuperAdmin();
})();

// uncaught exception error
process.on("uncaughtException", (err) => {
	console.log("❌ Server Shutting Down... uncaughtException detected... ", err);

	if (server) {
		server.close(() => process.exit(1));
	}

	process.exit(1);
});
