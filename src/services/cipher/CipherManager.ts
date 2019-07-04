import bcrypt = require("bcryptjs");

/**
 * Class that manages the encryption service.
 */
export class CipherManager {
	/**
	 * Encrypts the given content.
	 * @param content The content to be encrypted
	 * @param salt Optional salt. Default is 10.
	 * @returns The hashed content.
	 */
	static async encrypt(content: string, salt = process.env.CIPHER_SALT || 10) {
		return bcrypt.hash(content, salt);
	}

	/**
	 * Checks whether the content matches the hashed content.
	 * @param content The content to be compared.
	 * @param hashedContent The hashed content to be compared with.
	 * @returns True if matches, false otherwise.
	 */
	static async matches(content: string, hashedContent: string) {
		return bcrypt.compare(content, hashedContent);
	}
}
