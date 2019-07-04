import { IMutationTest, IQueryTest, ITestContext } from "./types";
import { createTestClient } from "apollo-server-testing";
import { GraphQLResponse } from "graphql-extensions";

/**
 * Class that helps to test mutations and queries against the graphql server.
 * When a query or mutation needs an user to be logged in, use @link {#setAuthorizationCredential(string)}.
 */
export class TestManager {
	private static instance: TestManager;

	private context: ITestContext | null = null;
	private credential: string | null = null;

	private constructor() {}

	public static getInstance() {
		if (!this.instance) this.instance = new TestManager();
		return this.instance;
	}

	/**
	 * @returns the test context object or null if the test server hasn't started.
	 */
	public getContext() {
		return this.context;
	}

	/**
	 * Sets the authorization token to be used on mutations and queries that requires an user to be logged. Use it before
	 * firing the query or mutation.
	 * @param credential The credential token to be used.
	 */
	public setAuthorizationCredential(credential: string | null = null) {
		this.credential = credential;
	}

	/**
	 * Returns the credential to be used to run tests.
	 */
	public getAuthorizationCredential() {
		return (this.credential && `Bearer ${this.credential}`) || null;
	}

	/**
	 * Sets the shareable test context data.
	 * @param context The context object to be set
	 */
	public setContext(context: ITestContext) {
		console.log({ context });
		this.context = context;
	}

	/**
	 * Get the test client to be used to fire requests to the graphql server.
	 */
	public async getTestClient() {
		const context = this.getContext();
		if (!context) throw new Error("Test context object is not set");

		const { server } = context;
		return createTestClient(server as any);
	}

	private testSuccessfullResult<TExpected>(result: GraphQLResponse, expected?: TExpected | null) {
		console.log({ result });
		console.log({ error: result.errors });

		expect(!!result).toBeTruthy();
		if (!expected) expect(!!result.data).toBeTruthy();
		else expect(result.data).toMatchObject<TExpected>(expected);
	}

	/**
	 * Sends the mutation request to the grahpql server and returns the response.
	 * @param param0 The mutation to be tested.
	 * @returns The server data response.
	 */
	public async fireMutation<TVariables, TExpected>({
		mutation,
		variables,
		expected
	}: IMutationTest<TVariables, TExpected>) {
		const { mutate } = await this.getTestClient();
		const res = await mutate({ mutation, variables });
		this.testSuccessfullResult<TExpected>(res as any, expected);
		return res;
	}

	/**
	 * Sends the mutation request to the grahpql server and returns the response.
	 * @param param0 The mutation to be tested.
	 * @returns The server data response.
	 */
	public async fireQuery<TVariables, TExpected>({
		query,
		variables,
		expected
	}: IQueryTest<TVariables, TExpected>) {
		const { query: graphqlQuery } = await this.getTestClient();
		const res = await graphqlQuery({ query, variables });
		this.testSuccessfullResult<TExpected>(res as any, expected);
		return res;
	}
}
