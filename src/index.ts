import dotenv = require("dotenv");
import express = require("express");
import { createApolloServer } from "./config/graphql";
import { createTypeormConnection } from "./config/orm";
import { TestManager } from "./services/tests/TestManager";

function loadEnvironmentVariables() {
	const result = dotenv.config();

	if (result.error) {
		throw result.error;
	}
}

async function startServer() {
	const app: express.Application = express();
	const apolloServer = createApolloServer();
	apolloServer.applyMiddleware({ app, path: process.env.GRAPHQL_ENDPOINT });

	try {
		await createTypeormConnection();
		app.listen(process.env.SERVER_PORT, () => {
			console.log(
				`🚀  Server ready at http://localhost:${process.env.SERVER_PORT}${
					apolloServer.graphqlPath
				}`
			);
		});
	} catch (err) {
		console.error(err);
	}
}

export async function startTestServer() {
	try {
		const connection = await createTypeormConnection();
		const server = createApolloServer() as any;
		TestManager.getInstance().setContext({ connection, server });
	} catch (e) {
		console.error(e);
		return false;
	}
	return true;
}

const runType = process.env.NODE_ENV || "development";

if (runType !== "test_circle_ci") loadEnvironmentVariables();
if (!runType.startsWith("test")) startServer();
