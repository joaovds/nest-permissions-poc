<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Permissions POC - nestjs

## Description

[POC] Permissioning system, role-based access control (RBAC) with entity-level permissions. With database configuration, SQL scripts.

## Project setup

```bash
pnpm install
```

Create an .env as in .env.example. The data in the example has the credentials of the bank that is set up in docker-compose for testing. If the configuration is different, just change it.

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
