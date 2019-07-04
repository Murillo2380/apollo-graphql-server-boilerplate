import { RoleRequirement, RequesterRole, AccessLevels, Scopes } from "./types";

export abstract class RoleCheckManager {
	public hasPermission(requester: RequesterRole, resourceName: string) {
		const { accessLevel, scopes = [Scopes.UNSPECIFIED] } = this.getResourceRequirement(
			resourceName
		);

		if (accessLevel instanceof Array) {
			return this.checkRoleStrict(requester, accessLevel, scopes);
		}
		return this.checkRole(requester, accessLevel, scopes);
	}

	protected abstract getResourceRequirement(resource: string): RoleRequirement;

	protected checkRoleStrict(
		requester: RequesterRole,
		accessLevels: AccessLevels[],
		scopes: Scopes[]
	) {
		return accessLevels.includes(requester.accessLevel) && scopes.includes(requester.scope);
	}

	protected checkRole(requester: RequesterRole, accessLevel: AccessLevels, scopes: Scopes[]) {
		return (
			requester.accessLevel < accessLevel ||
			(requester.accessLevel === accessLevel && scopes.includes(requester.scope))
		);
	}
}
