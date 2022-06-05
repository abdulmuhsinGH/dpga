const { constants } = require("http2");
const https = require("https");
const {
  insertProject,
  findAllProjects,
  getProjectByTechStack
} = require("../model/projects.model");

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns {Promise<void>}
 * @description creates a project report and inserts it into the database
 *
 */
var createProject = async (req, res) => {
  try {
    //get projects from request body
    let projects = req.body;
    
    await insertProject(projects);
    res.status(constants.HTTP_STATUS_CREATED).json(projects);
  } catch (error) {
    console.log("error creating projects", error);
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};
/**
 * @param {*} req
 * @param {*} res
 * @returns {Promise<void>}
 * @description returns all projectss from the database
 *
 */
var getAllProjects = async (req, res) => {
  try {
    const projectss = await findAllProjects();
    res.status(constants.HTTP_STATUS_OK).json(projectss);
  } catch (error) {
    console.log("error getting all projectss", error);
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong",
    });
  }
};

var findProjectByTechStack = async (req, res) => {
  try {
    const techStack = req.params.tech_stack;
    const projectss = await getProjectByTechStack(techStack);
    res.status(constants.HTTP_STATUS_OK).json(projectss);
  } catch (error) {
    console.log("error getting all projectss", error);
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong",
    });
  }
};


module.exports = { createProject, getAllProjects,findProjectByTechStack };
