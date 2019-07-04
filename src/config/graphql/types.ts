import { GraphQLFieldResolver } from "graphql";
import express = require("express");
import { AuthManager } from "../../services/auth/AuthManager";
import { RoleCheckManager } from "../../services/auth/RoleChecker";
import { RoleRequirement } from "../../services/auth/types";
import { IMiddlewareResolver } from "graphql-middleware/dist/types";

export type IContext<TCredential = any> = {
	req: express.Request;
	res: express.Response;
	authManager: AuthManager;
	roleCheckManager: RoleCheckManager;
	credential?: string;
	decodedCredential?: TCredential;
};

/**
 * Possible Schema types according to the graphql
 */
export enum SchemaType {
	QUERY = "Query",
	MUTATION = "Mutation",
	SUBSCRIPTION = "Subscription"
}

export type IResolverMap = {
	[key in SchemaType]?: {
		[key: string]: GraphQLFieldResolver<any, IContext>;
	}
};

/**
 * Maps a resolver name
 */
export interface IRoleProtectedResolversMap {
	[key: string]: ProtectionInfo;
}

export type ProtectionInfo = {
	/**
	 * The type in the graphql schema (Mutation, Query, Subscription)
	 */
	type: SchemaType;
	/**
	 * The roles that are required to access the protected field
	 */
	requires: RoleRequirement;
};

/**
 * The role middleware to be ran for each protected resolver
 */
export type RoleMiddleware = IMiddlewareResolver<any, IContext, any>;

/**
 * The protected resolvers that maps the query/mutation/subscription name to the middleware function.
 */
export type ProtectedResolvers = {
	[key in SchemaType]?: {
		[key: string]: RoleMiddleware;
	}
};

/**
 * The class that checks for permission to access role-protected resource.
 */
export class GraphqlRoleChecker extends RoleCheckManager {
	public constructor(private protectedResolvers: IRoleProtectedResolversMap) {
		super();
	}

	/**
	 * Gets the requirements to use the given resolver.
	 * @param resolver The resolver name to be checked.
	 * @returns The role requirement of the given resolver.
	 */
	protected getResourceRequirement(resolver: string): RoleRequirement {
		return this.protectedResolvers[resolver].requires;
	}
}
