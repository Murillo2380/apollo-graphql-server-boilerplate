module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    rootDir: "./src",
    setupFilesAfterEnv: ["./services/tests/setup.ts"]
};
