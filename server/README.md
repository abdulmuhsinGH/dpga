# dpga

## Requirements

- Node.js
- Docker and Docker Compose
- npm
- Duplicate the `config.template.json` and name it `config.json` in the `./config/` folder. Set the
  `PORT`
  `PG_HOST`
  `PG_USER`
  `PG_PASSWORD`
  `PG_DB`
  `PG_PORT` before starting the server or running the test.

### How to run server the application

- `npm start` - starts the server
- `npm run test` - runs the tests. Integration tests require you have a database available to connect for test. you can set up the configuration for the test environment in your `config.json`.

### Endpoints

- GET `/projectss`
  - returns all projects reports
- POST `/projectss`
  - saves a new projects reports
