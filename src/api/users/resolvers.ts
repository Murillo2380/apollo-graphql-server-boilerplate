import * as connector from "./connector";
import { IResolverMap } from "../../config/graphql/types";

export const resolvers: IResolverMap = {
	Query: {
		login: (_, __, context) => connector.login(context),
		me: () => connector.me(),
		myRole: (_, __, context) => connector.myRole(context)
	}
};
