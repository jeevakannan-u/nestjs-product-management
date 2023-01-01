DB Setup :
docker run --name=MysqlContainer  -p 3306:3306  -e MYSQL_ROOT_PASSWORD=mypassword -e MYSQL_ROOT_HOST=%  -d mysql/mysql-server
docker exec -it MysqlContainer bash
CREATE DATABASE mydb;


## Description
NestJs project

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
