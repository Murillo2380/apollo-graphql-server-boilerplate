import { DocumentNode } from "graphql";
import { ApolloServer } from "apollo-server";
import { Connection } from "typeorm";

interface ITestBody<TVariables = Record<string, any>, TExpected = Record<string, any>> {
	variables?: TVariables;
	expected?: TExpected | null;
}

export interface IMutationTest<TVariables = Record<string, any>, TExpected = Record<string, any>>
	extends ITestBody<TVariables, TExpected> {
	mutation: DocumentNode;
}
export interface IQueryTest<TVariables = Record<string, any>, TExpected = Record<string, any>>
	extends ITestBody<TVariables, TExpected> {
	query: DocumentNode;
}

export interface ITestContext {
	server: ApolloServer;
	connection: Connection;
}
