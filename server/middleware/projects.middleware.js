const jwt = require("jsonwebtoken");
const { constants } = require("http2");
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {Promise<void>}
 * @description validates the request body before processing the request
 *
 */
var validateprojectsBody = (req, res, next) => {
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

function isInvalidProjectRequestBody(body) {
  return (
    !body.name ||
    !body.description ||
    !body.tech_stack
  );
}

module.exports = { validateprojectsBody };
