//express router
//set up routes
const express = require("express");
const router = express.Router();

const {
  validateprojectsBody,
} = require("../middleware/projects.middleware");

const {
  authenticateRequest,
  validateUserRegistrationBody
} = require("../middleware/users.middleware");
const {
  createProject,
  getAllProjects,
  findProjectByTechStack
} = require("../controller/projects.controller");

const {
  registerUser, getAllDevelopers, changeUserAvailability, login,developersByTechStack
} = require("../controller/users.controller");

router.get("/", (req, res) => {
  res.json({
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
  });
});

//get all projectss
router.get("/projects", getAllProjects);

router.get("/projects/:tech_stack", findProjectByTechStack);

//create projects
router.post(
  "/projects",
  [validateprojectsBody],
  createProject
);


router.post("/user/register", [validateUserRegistrationBody], registerUser);
router.post("/user/login", login);
router.put("/user/availability/:id",  changeUserAvailability);
router.get("/user/developers",  getAllDevelopers);
router.get("/user/developers/:tech_stack", developersByTechStack);

module.exports = router;
