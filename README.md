# Example Application

## Description

This is an example application that utilizes a front end client and back end REST API to
insert, delete, update and fetch data.

## How to use (Docker)

1. First cd to client and run `docker image build -t example-client:latest`.
2. Second cd to server/Example.Api and run `docker image build -t example-api:latest`.
3. Third run `docker compose up -d --build`.
4. To access the Open API docs for the REST API go to localhost:8000/swagger

## How to use (Local)

1. First run `docker compose up -d --build pg` to set up the database.
2. Second cd to server/Example.Api and run `dotnet run` and also create a .env file as 
specified in the .env.example.
3. Third cd to client and run npm start.
4. To access the Open API docs for the REST API go to localhost:8000/swagger

## Running tests

1. To run dotnet tests, cd to `server/Example.Tests` and then run `dotnet tests`.
2. To run react tests, cd to `client` and then run `npm test`.

## Workflows

In addition to testing, this application also runs a CI/CD with github actions. Check on the actions tab on
github to verify this. 
