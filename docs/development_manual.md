# Contributions

Please check [contribution guidelines](CONTRIBUTING.md).

# Testing

This project contains a set of tests that can be run to automatically verify the correctness of the IoTA
functionalities.

The following requirements must be installed and executed in order to launch the tests:

-   [Node.js](https://nodejs.org/en/)
-   [MongoDB](https://www.mongodb.com/docs/manual/installation/)
-   [FIWARE Orion Context Broker](https://github.com/telefonicaid/fiware-orion)
-   [Mosquitto Broker](https://mosquitto.org/download/)

You can use the `docker-compose-dev.yml` file to set up the required services as follows:

```bash
cd docker
docker compose -f docker-compose-dev.yml up -d
```

To run the tests:

```bash
npm test
```

# Code coverage

In addition, the project is configured to provide source code coverage statistics reached thanks to the tests.

```bash
npm run test:coverage
```

This command will produce an HTML coverage report under _coverage_ folder.

# Coding guidelines

[ESLint](https://eslint.org/) is used to check code linting:

```bash
npn run lint
```
