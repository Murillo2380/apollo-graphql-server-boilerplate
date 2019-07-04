import { AuthenticationError } from "apollo-server";
import { IContext } from "../types";
import { TestManager } from "../../../services/tests/TestManager";

/**
 * Gets the credential from the authorization header if exists, throwing an exception
 * if it does't exist or if it is not a Bearer token.
 * @param context The apollo context.
 * @returns The requester's credential.
 */
function getCredential(context: any) {
	let bearer;

	const runType = process.env.NODE_ENV || "development";

	if (runType.startsWith("test")) bearer = TestManager.getInstance().getAuthorizationCredential();
	else
		bearer =
			(context && context.req && context.req.headers && context.req.headers.authorization) ||
			null;

	const credential = bearer && bearer.split(" ");

	if (!credential || credential[0] !== "Bearer" || !credential[1]) {
		throw new AuthenticationError("Not logged in");
	}

	return credential[1];
}

const isAuthenticated = async (
	resolve: any,
	parent: any,
	args: any,
	context: IContext,
	info: any
) => {
	const credential = getCredential(context);

	const authManager = context.authManager;
	const decoded = await authManager.isValid(credential);

	if (!decoded) {
		throw new AuthenticationError("Not authenticated");
	}
	context.credential = credential;
	context.decodedCredential = decoded;
	return resolve(parent, args, context, info);
};

/**
 * List of protected resolvers, which needs the requester
 * to be authenticated with a valid credential.
 */
export const authMiddleware = {
	Query: {
		me: isAuthenticated,
		myRole: isAuthenticated
	}
};
