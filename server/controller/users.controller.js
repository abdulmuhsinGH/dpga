const { constants } = require("http2");
const https = require("https");
const {
    addUser,
    findUserByCredentials, retrieveAllDevelopers, updateUserAvailability, getDevelopersByTechStack } = require("../model/users.model");


/**
 * @param {*} req
 * @param {*} res
 * @returns {Promise<void>}
 * @description creates a user and inserts it into the database
 * @example registerUser(req, res)
 * .then(result => {
 * console.log(result);
 * })
 * .catch(err => {
 * console.log(err);
 * });
 * */
var registerUser = async (req, res) => {
    try {
        //get user from request body
        let user = req.body;
        await addUser(user);
        res.status(constants.HTTP_STATUS_CREATED).json(user);
    } catch (error) {
        console.log("error creating user", error);
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            error: error.message,
        });
    }
}

/**
 * @param {*} req
 * @param {*} res
 * @returns {Promise<void>}
 * @description returns all developers from the database
 * @example getAllDevelopers(req, res)
 * .then(result => {
 * console.log(result);
 * })
 * .catch(err => {
 * console.log(err);
 * });
 * */
var getAllDevelopers = async (req, res) => {
    try {
        const users = await retrieveAllDevelopers();
        res.status(constants.HTTP_STATUS_OK).json(users);
    } catch (error) {
        console.log("error getting all users", error);
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong",
        });
    }
}

/**
 * @param {*} req
 * @param {*} res
 * @returns {Promise<void>}
 * @description updates a user's availability
 * @example updateUserAvailability(req, res)
 * .then(result => {
 * console.log(result);
 * })
 * .catch(err => {
 * console.log(err);
 * });
 * */
var changeUserAvailability = async (req, res) => {
    try {
        //get user from request body
        let user = req.body;
        await updateUserAvailability(user);
        res.status(constants.HTTP_STATUS_OK).json(user);
    } catch (error) {
        console.log("error updating user availability", error);
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            error: error.message,
        });
    }
}

/**
 * @param {*} req
 * @param {*} res
 * @returns {Promise<void>}
 * @description authenticates a user and returns the user
 * @example login(req, res)
 * .then(result => {
 * console.log(result);
 * })
 * .catch(err => {
 * console.log(err);
 * });
 * */
var login = async (req, res) => {
    try {
        //get user from request body
        let { email, password } = req.body;
        let userFound = await findUserByCredentials(email, password);
        if (userFound) {
            jwt.sign({ userFound }, process.env.JWT_SECRET, { expiresIn: "24h" }, (err, token) => {
                if (err) {
                    console.log("error signing token", err);
                    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
                        message: "Something went wrong",
                    });
                } else {
                    res.status(constants.HTTP_STATUS_OK).json({
                        token: token,
                        user: userFound,
                    });
                }
            });
        }
    } catch (error) {
        console.log("error logging in", error);
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            error: error.message,
        });
    }
}

var developersByTechStack = async (req, res) => {
    try {
        //get user from request params
        let { tech_stack } = req.params;
        let users = await getDevelopersByTechStack(tech_stack);
        res.status(constants.HTTP_STATUS_OK).json(users);
    } catch (error) {
        console.log("error getting developers by tech stack", error);
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            error: error.message,
        });
    }
}


module.exports = { registerUser, getAllDevelopers, changeUserAvailability, login, developersByTechStack };