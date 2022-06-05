# dpga

## Link to UI sketches
[UI Sketches](https://www.figma.com/file/UwTokzWv79kyL1nH0cDPaE/Untitled?node-id=3%3A8)

## User Stories
### User A - DPGA Reviewer
 - A reviewer should be able to view projects and description

 - A reviewer should be able to validate a project as DPG

 - A reviewer should be able to match a project to a Developer
 - A reviewer should verify a Developer

### User B - Project Owner
- A project owner should be able to post project and the details to the system.

- A project owner should be able to see potential Developers with the right skills.

- A project owner should be able to reach out to Developers with the right skills.

- A project owner should be able to see Developers’ experience.

- A project owner should be able to see Developers’ availability.

- A project owner should be able to track progress of the project

- A project owner should be able to set the status of a project

- A project owner should be able to set and update the progress of the project

- A project owner should be able to approve a match from the matching system

User C - Developer 
- A developer should be able to submit their interests

- A developer should be able to submit their skills

- A developer should be able to view projects
 
- A developer should be able to view a projects their back log
 
- A developer should be able to submit their availability
 
- A developer should be able to send their experience
 
- A developer should be able to show interest in a project 
 
- A developer should be able to make a request to work on a backlog of a project
 
- A developer should be notified when a project that match their skills and interest is available
 
- A developer should be able ot approve a match if they are interested in a project


### Matching System
  The Matching system should find the right project for a developer based on skills and interest

  The Matching system should notify both project owner and developer of a match
  The matching system should track projects and developers 

  The matching system should be able to view a Developer’s skills and interest
  - What determines the right match/ ranking?

    - Developer skills 
    - Verifying Developer skills - How? Programming tests and score
    - Developer project interest,
    - Project Tech Stack
    - Developer Availaibility
    - Project cost 
    - Developer desired remuneration 

## Prototype Focus
Matching Devlopers to Projects

## Requirements before running application
- Node.js installed
- Postgres
- Docker and Docker Compose: for docker setup
- npm
- Duplicate the `config.template.json` and name it `config.json` in the `./config/` folder. Set the
  `PORT`
  `PG_HOST`
  `PG_USER`
  `PG_PASSWORD`
  `PG_DB`
  `PG_PORT` before starting the server or running the test.

### How to run the application
#### Using docker compose
- `docker-compose up` - starts the server, client and databse service
- `docker-compose down` - to shutdown services




### Using your computer
- Make sure you Postgres installed
- `cd server/` then `npm start` to start server
- Open a new Terminal
- `cd client` then `npm run serve` to start client

- go to the the url `localhost:8080 to see the website` or the next generated port if 8080 is occupied.

### When server is running 
go to `localhost:3000` or the port you set to see a full description of the enpoints

### Endpoints
```
{
    message: "Welcome to  DGPA API",
    endpoints: [
      {
        url: "projects",
        method: "GET",
        description: "Returns all projectss",
        response: {
          status: 200,
          data: "Array of projectss",
        },
      },
      {
        url: "projects",
        method: "POST",
        description: "Creates an projects",
        body: {
          name: "string",
          description: "string",
          tech_stack: "string",
        },
        response: {
          status: 201,
          data: "object",
        },
      },
      {
        url: "projects/:tech_stack",
        method: "GET",
        description: "Returns all projectss by tech_stack",
        response: {
          status: 200,
          data: "Array of projectss",
        }
      },
      {
        url: "user/register",
        method: "POST",
        description: "Creates an user",
        body: {
          name: "string",
          email: "string",
          password: "string",
          user_type: "string",
          is_available: "boolean",
        },
        response: {
          status: 201,
          data: "object",
        },
      },
      {
        url: "user/login",
        method: "POST",
        description: "Authenticates a user",
        body: {
          email: "string",
          password: "string",
        },
        response: {
          status: 200,
          data: "object",
        },
      },
      {
        url: "user/availablity/:id",
        method: "PUT",
        description: "Updates a user's availability",
        body: {
          is_available: "boolean",
        },
        response: {
          status: 200,
          data: "object",
        },
      },
      {
        url: "user/developers",
        method: "GET",
        description: "Returns list of developers",
        response: {
          status: 200,
          data: "Array of users",
        },
      },
      {
        url: "user/developers/:tech_stack",
        method: "GET",
        description: "Returns list of developers by tech_stack",
        response: {
          status: 200,
          data: "Array of users",
        }
      }

    ],
  }
```
