import { TestManager } from "./TestManager";
import { startTestServer } from "../../index";

// Here can also be placed: beforeEach and afterEach if necessary

beforeAll(async () => {
	console.log("Starting tests");
	const hasStarted = await startTestServer();
	if (!hasStarted) console.error("Test server failed to start");
});

afterAll(async done => {
	const context = TestManager.getInstance().getContext();
	if (!context) throw new Error("Test context object not set");

	const { connection, server } = context;
	await connection.close();
	await server.stop();
	console.log("Tests finished");
	await new Promise(setImmediate);
	done();
});
