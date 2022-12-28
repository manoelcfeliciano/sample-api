<h1 align="center">
    <img alt="Sample API" ttle="Sample API" src="https://i.postimg.cc/7YX4x91N/logo.png" />
    <p>Sample API</p>
</h1>

<p align="center">
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-about-the-project">About the Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-architecture-decisions">Architecture Decisions</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-run">How to Run</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-run-the-tests">How to Run the Tests</a>
</p>

<br />

## 🚀 Technologies

-   [Node.js](https://nodejs.org/en/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Docker](https://www.docker.com/)
-   [Jest](https://jestjs.io/)
-   [Express](https://expressjs.com/)
-   [Celebrate](https://github.com/arb/celebrate)
-   [Intercom Client](https://github.com/intercom/intercom-node)

<br/>

## 📜 About the Project

This is a sample API that was created to demonstrate the use of Clean Architecture and TDD. For that
we have a single route that receives a payment confirmation from an external provider. This route is
responsible for validating the request, marking the payment as confirmed (\*) and logging analytics
events to multiple external services (\*\*).

The main goal here is to demonstrate how to solve a real world problem of needing to log a purchase
event to multiple external services in a scalable and maintainable way. For that, this project used
a well-known design pattern called Composite[https://refactoring.guru/design-patterns/composite].

In other to persist data in Intercom, of course you would need an Intercom API Key, defined in a
`.env` file (example in `.env.example`), but this API will not throw any error if you don't.

(\*) For simplicity purposes, this is not implemented in this project.

(\*\*) For simplicity purposes, only one external service (Intercom) is implemented in this project.

<br/>

## 💻 Architecture Decisions

[Clean Architecture](https://www.freecodecamp.org/news/a-quick-introduction-to-clean-architecture-990c014448d2/)
was chosen due to the folowing reasons:

-   Modular application with well defined layers, responsabilities and data flow
-   Easier to test (unit and integration) every portion of the application due to modularity
-   Easier to maintain as the business logic is not coupled to a specific framework or library

<br/>

## 🏁 How to Run

If you are going to use Docker it is as simple as running the following command:

```
docker-compose-up
```

If you are going to run the project without Docker, follow the steps bellow:

1 - Install the project dependencies

```
yarn install
```

2 - Duplicate the .env.example file and rename it to .env

3 - Get the secret values with the Lead Developer and replace it in your .env

4 - Build the project

```
yarn build
```

5 - Run the project

Watch mode (auto restart on every file change)

```
yarn dev
```

Regular mode (need to restart manually if a file changes)

```
yarn build && yarn start
```

<br/>

## 🧪 How to Run the Tests

The are mainly two types of automated tests in the application: unit and integration. We have 5
different commands to run the tests depending on the developer needs:

1 - Runs the unit tests of the application.

```
yarn test:unit
```

2 - Runs the integration tests of the application.

```
yarn test:integration
```

3 - Run both the unit and the integration tests.

```
yarn test
```

4- Run both the unit and the integration tests, also generating a coverage report.

```
yarn test:ci
```

5 - Run both the unit and the integration tests but with greater logging information for debug
purposes.

```
yarn test:verbose
```
