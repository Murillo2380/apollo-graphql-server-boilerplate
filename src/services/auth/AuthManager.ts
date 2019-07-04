import * as jwt from "jsonwebtoken";
import { ApolloError } from "apollo-server";

/**
 * Class that handles stateless authentication.
 */
export class AuthManager {
	/**
	 *
	 * @param defaultSignature The default signature for every operations
	 */
	constructor(private defaultSignature: string) {}

	/**
	 * Creates a credential with the given data.
	 * @param userData The data to be associated with the login instance.
	 * @param signature Optional string to sign the given credential.
	 * @param expiresIn How long this credential will be valid. Default: "1d" (one day).
	 * Check the jsonwebtoken package for other options.
	 * @returns A signed credential with the given data.
	 */
	public createCredential(userData: any, signature = this.defaultSignature, expiresIn = "1d") {
		if (!signature) {
			throw new Error("Signature undefined");
		}

		return jwt.sign({ ...userData }, signature, {
			algorithm: process.env.JWT_ALGORITHM || "HS256",
			expiresIn
		});
	}

	/**
	 * Checks if the given tokens is valid for the given signature.
	 * @param credential The credential to be verified.
	 * @param signature Optional signature to be tested.
	 * @returns The decoded object or null in case of errors (for instance the token is not valid anymore).
	 */
	public isValid(credential: string, signature = this.defaultSignature) {
		if (!signature) {
			throw new Error("Signature undefined");
		}

		try {
			return jwt.verify(credential, signature, { algorithms: ["HS256"] });
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	/**
	 * Logouts the given user.
	 * TODO Not supported, an error will be thrown. Refresh tokens must be implemented first.
	 */
	public logout(credential: string) {
		console.log({ credential });
		throw new ApolloError("Logout is currently not supported", "Unsupported");
	}
}
