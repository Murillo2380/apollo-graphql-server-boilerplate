/**
 * The possible access levels for this application. Lower the number, more access.
 */
export enum AccessLevels {
	/**
	 * The super admin, having access to everything.
	 */
	ZEUS,
	/**
	 * The admin that can manage users from every business and create business.
	 */
	ADMIN,
	/**
	 * The user of the application, with minimal permissions.
	 */
	USER
}

/**
 * Roles of the application
 */
export enum Scopes {
	UNSPECIFIED,
	DEPARTMENT_EXAMPLE_1,
	DEPARTMENT_EXAMPLE_2
}

/**
 * The requester's role.
 */
export type RequesterRole = {
	/**
	 * His access level. Lower the number, higher the permissions.
	 */
	accessLevel: AccessLevels;
	/**
	 * Scope that limits the visibility of a resource among users with the same
	 * access level.
	 */
	scope: Scopes;
};

/**
 * The minimum requirement for a protected resolver.
 */
export type RoleRequirement = {
	/**
	 * The access level needed. There are 2 possible uses:
	 *
	 * 1. If a single value is given, then the requester will need
	 * the same permission (same number) or a better one (lower number).
	 *
	 * ```js
	 * const requesterAccessLevel = 5
	 * const requiredAccessLevel = 5
	 * // Granted
	 *
	 * const requesterAccessLevel = 4
	 * const requiredAccessLevel = 5
	 * // Granted
	 *
	 * const requesterAccessLevel = 6
	 * const requiredAccessLevel = 5
	 * // Denied
	 * ```
	 *
	 * 2. If an array is given, then the requester will need one of the given
	 * access levels.
	 * ```js
	 * const requesterAccessLevel = 5
	 * const requiredAccessLevel = [5]
	 * // Granted
	 *
	 * const requesterAccessLevel = 8
	 * const requiredAccessLevel = [5, 2, 8]
	 * // Granted
	 *
	 * const requesterAccessLevel = 4
	 * const requiredAccessLevel = [5]
	 * // Denied
	 *
	 * const requesterAccessLevel = 6
	 * const requiredAccessLevel = [5]
	 * // Denied
	 *
	 * const requesterAccessLevel = 6
	 * const requiredAccessLevel = [5, 7, 9]
	 * // Denied
	 * ```
	 */
	accessLevel: AccessLevels | AccessLevels[];
	/**
	 * Optional set of scopes used as a tie-breaking rule for the cases where
	 * the requester has exactly the same accessLevel required to use
	 * the protected resolver.
	 *
	 * Example: A manager cannot use a protected resolver that are
	 * intented to be used only by a coffee manager, even though both
	 * are managers.
	 */
	scopes?: Scopes[];
};
