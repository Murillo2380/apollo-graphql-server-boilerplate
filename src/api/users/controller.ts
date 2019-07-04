import { AccessLevels, Scopes, RequesterRole } from "../../services/auth/types";
import { IContext } from "../../config/graphql/types";

export function login({ authManager }: IContext) {
	return authManager.createCredential({
		accessLevel: AccessLevels.ZEUS,
		scope: Scopes.DEPARTMENT_EXAMPLE_1
	});
}

export function me() {
	return true;
}

export function myRole({ decodedCredential }: IContext<RequesterRole>) {
	return {
		accessLevel: decodedCredential!.accessLevel,
		scope: decodedCredential!.scope
	};
}
