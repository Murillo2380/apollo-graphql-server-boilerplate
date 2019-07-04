// see https://gist.github.com/rkkautsar/567d16b0986b00aeb467b31e9cb09cbb

const base = {
    name: "default",
    type: "postgres",
    synchronize: true,
    logging: true,
    entities: ["src/models/**/*.ts", "src/api/**/model.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
        entitiesDir: "src/entity",
        migrationsDir: "src/migration",
        subscribersDir: "src/subscriber"
    },
    migrationsRun: true
};

const config = {
    test: {
        port: 5432,
        dropSchema: true,
        host: process.env.TYPEORM_DB_TEST_HOST,
        username: process.env.TYPEORM_DB_TEST_USERNAME,
        password: process.env.TYPEORM_DB_TEST_PASSWORD,
        database: process.env.TYPEORM_DB_TEST_NAME
    },
    test_circle_ci: {
        port: 5432,
        dropSchema: true,
        host: process.env.TYPEORM_DB_TEST_HOST,
        username: process.env.TYPEORM_DB_TEST_USERNAME,
        password: process.env.TYPEORM_DB_TEST_PASSWORD,
        database: process.env.TYPEORM_DB_TEST_NAME
    },
    development: {
        port: 5432,
        dropSchema: false,
        host: process.env.TYPEORM_DB_HOST,
        username: process.env.TYPEORM_DB_USERNAME,
        password: process.env.TYPEORM_DB_PASSWORD,
        database: process.env.TYPEORM_DB_NAME
    },
    production: {
        dropSchema: false,
        url: process.env.TYPEORM_DB_PRODUCTION_URL,
        username: process.env.TYPEORM_DB_PRODUCTION_USERNAME,
        password: process.env.TYPEORM_DB_PRODUCTION_PASSWORD,
        database: process.env.TYPEORM_DB_PRODUCTION_NAME
    }
};

module.exports = { ...base, ...config[process.env.NODE_ENV || "development"] };
