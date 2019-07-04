import { AuthenticationError } from "apollo-server";
import {
	RoleMiddleware,
	IRoleProtectedResolversMap,
	SchemaType,
	ProtectedResolvers,
	IContext
} from "../types";
import { Scopes, AccessLevels, RequesterRole } from "../../../services/auth/types";

/**
 * The middleware function that will be ran for each protected field. Check the
 * graphql-middleware api to understand the purpose of each parameter.
 */
const checkHasRole: RoleMiddleware = async (
	resolve: any,
	parent: any,
	args: any,
	context: IContext<RequesterRole>,
	info: any
) => {
	const { fieldName } = info;
	const { roleCheckManager, decodedCredential } = context;

	if (!decodedCredential) {
		throw new AuthenticationError("Not logged in");
	}

	const hasPermission = roleCheckManager.hasPermission(decodedCredential, fieldName);

	if (!hasPermission) {
		throw new AuthenticationError("Not enough permission");
	}

	return resolve(parent, args, context, info);
};

/**
 * The description of each role that is required to access each graphql field
 */
export const protectedResolvers: IRoleProtectedResolversMap = {
	myRole: {
		type: SchemaType.QUERY,
		requires: {
			accessLevel: AccessLevels.ADMIN,
			scopes: [Scopes.DEPARTMENT_EXAMPLE_1]
		}
	}
};

/**
 * Builds the resolver middleware map.
 */
function buildMiddlewareMap() {
	/**
	 * Var with the information that will be exported to the graphql-middleware
	 */
	const middlewareMap: ProtectedResolvers = {};

	for (const [key, { type }] of Object.entries(protectedResolvers)) {
		if (!middlewareMap[type]) {
			middlewareMap[type] = {};
		}

		middlewareMap[type]![key] = checkHasRole;
	}

	console.log({
		roleProtectedResolvers: middlewareMap
	});

	return middlewareMap;
}

/**
 * List of each graphql resolver that has special
 * permission requirements.
 */
export const roleMiddleware: ProtectedResolvers = {
	...buildMiddlewareMap()
} as any;
