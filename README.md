# JS server boilerplate

The JavaScript server boilerplate with continuous integration and tests configured.

## Getting started

### Prerequisites

Clone the repository and run either:

```bash
yarn install
```

Or:

```bash
npm install
```

### Installing

You will need to create the following file in the project root folder:

-   **.env** - This file may contain sensitive information that should not be online. Check the `.env.example` file for available vars.

Then just run:

```bash
yarn start
```

Or:

```bash
npm run start
```

You may need to create the PostgreSQL database before running this project.

## Running the tests

The following scripts are available (always check **package.json**):

```
    yarn test
    yarn test:circleCi
    yarn test:noForceExit
    yarn test:detectAsync
    yarn test:watch
    yarn test:coverage
```

The first script are configured to run before any commit. All the tests must be placed inside the **src/** folder, ending with **.test.ts**.

## Deployment

TODO

## Built With

-   [NodeJS](https://nodejs.org/en/) - Dependency Management
-   [Apollo Server](https://www.apollographql.com/docs/apollo-server/) - The JavaScript GraphQL Server.
-   [TypeORM](https://typeorm.io/#/) - To access and manage databases.
-   [PostgreSQL](https://www.postgresql.org/) - The database.
-   [Jest](https://jestjs.io) - For testing.

## Contributing

TODO

## Acknowledgments

TODO
