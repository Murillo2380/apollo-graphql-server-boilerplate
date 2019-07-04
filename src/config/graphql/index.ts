import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import { mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import { applyMiddleware } from "graphql-middleware";
import express = require("express");
import * as glob from "glob";
import * as path from "path";
import * as fs from "fs";
import { IContext, GraphqlRoleChecker } from "./types";
import { AuthManager } from "../../services/auth/AuthManager";
import { protectedResolvers, roleMiddleware, authMiddleware } from "./protectedResolvers";

function buildContext(req: express.Request, res: express.Response): IContext {
	return {
		req,
		res,
		authManager: new AuthManager(process.env.JWT_SIGNATURE as string),
		roleCheckManager: new GraphqlRoleChecker(protectedResolvers)
	};
}

function genSchema() {
	const schemaRoot = path.join(__dirname, "../../api");

	const schemaDefs = glob
		.sync(`${schemaRoot}/**/*.graphql`)
		.map(schemaFile => fs.readFileSync(schemaFile, { encoding: "utf8" }));

	const resolvers = glob
		.sync(`${schemaRoot}/**/resolvers.?s`)
		.map(resolverFile => require(resolverFile).resolvers);

	return makeExecutableSchema({
		typeDefs: mergeTypes(schemaDefs),
		resolvers: mergeResolvers(resolvers)
	});
}

export function createApolloServer() {
	const schema = genSchema();

	const apolloServer = new ApolloServer({
		schema: applyMiddleware(schema, authMiddleware, roleMiddleware as any),
		cacheControl: true,
		context: ({ req, res }) => buildContext(req, res)
	});

	return apolloServer;
}
