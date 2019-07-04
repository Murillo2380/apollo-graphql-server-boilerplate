import { gql } from "apollo-server";
import { TestManager } from "../../services/tests/TestManager";
import { IQueryTest } from "../../services/tests/types";

const QUERY_LOGIN = gql`
	query {
		login
	}
`;

const QUERY_ME = gql`
	query {
		me
	}
`;

type TRoleExpectedResponse = {
	myRole: {
		accessLevel: number;
		scope: number;
	};
};

const QUERY_ROLE: IQueryTest<null, TRoleExpectedResponse> = {
	query: gql`
		query {
			myRole {
				accessLevel
				scope
			}
		}
	`,
	expected: {
		myRole: {
			accessLevel: 0,
			scope: 1
		}
	}
};

describe("QUERIES", () => {
	describe("LOGIN", () => {
		test("Dummy", async () => {
			const res = await TestManager.getInstance().fireQuery({ query: QUERY_LOGIN });
			TestManager.getInstance().setAuthorizationCredential(res.data!.login);
		});
		test("Dummy credential", async () => {
			await TestManager.getInstance().fireQuery({ query: QUERY_ME });
		});
		test("Dummy role", async () => {
			await TestManager.getInstance().fireQuery<null, TRoleExpectedResponse>(QUERY_ROLE);
		});
	});
});
