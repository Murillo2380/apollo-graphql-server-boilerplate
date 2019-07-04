import { getConnectionOptions, createConnection } from "typeorm";

export async function createTypeormConnection() {
	const connectionOptions = await getConnectionOptions();
	console.log({ connectionOptions });
	return createConnection(connectionOptions);
}
