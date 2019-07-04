import * as controller from "./controller";
import { IContext } from "../../config/graphql/types";

export async function login(context: IContext) {
	return controller.login(context);
}
export async function me() {
	return controller.me();
}

export async function myRole(context: IContext) {
	return controller.myRole(context);
}
