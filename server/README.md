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

### How to run the application

- `docker-compose up` - starts the server, client and databse service


### Endpoints

- GET `/projects`
  - returns all projects reports
- POST `/projects`
  - saves a new projects reports
