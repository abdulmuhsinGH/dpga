const jwt = require("jsonwebtoken");
const { constants } = require("http2");


/**
 * 
 * @param {*} req
 * @param {*} res
 * @returns {Promise<void>}
 * @description authenticates request
 * 
 * */
var authenticateRequest = async (req, res, next) => {
    try {
        if (process.env.NODE_ENV !== "production") {
        return next();
        }
    
        if (!req.headers.authorization) {
        return res
            .status(constants.HTTP_STATUS_UNAUTHORIZED)
            .send("Unauthorized");
        }
    
        const token = req.headers.authorization;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if (!payload) {
        return res
            .status(constants.HTTP_STATUS_UNAUTHORIZED)
            .send("Unauthorized");
        }
        next();
    } catch (error) {
        console.log("error authenticating request", error);
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
        });
    }
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {Promise<void>}
 * @description validates the request body before processing the request
 *
 */
 var validateUserRegistrationBody = (req, res, next) => {
    try {
      if (isInvalidRequestBody(req.body)) {
        return res.status(400).send("Missing required fields");
      }
  
      next();
    } catch (error) {
      console.log("error validating projects body", error);
      res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
      });
    }
  };

  function isInvalidUserRequestBody(body) {
    return (
      !body.name ||
      !body.email ||
      !body.tech_stack || !body.password

    );
  }


  module.exports = { validateUserRegistrationBody, authenticateRequest };