const pool = require("../db/index.js");


const addUser = async (user) => {
  try {
    const query = `INSERT INTO users (name, username, password, user_type,tech_stack, is_available) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [
      user.name,
      user.username,
      user.password,
      user.user_type,
      user.tech_stack,
      user.is_available
    ];
    const result = await pool.query(query, values);
    return result.rowCount;
  } catch (error) {
    throw error;
  }

};

/** 
 *  @returns {Promise<Object>}
 * @description select all projects from projects table
 * @example selectAllProjects()
 * .then(result => {
 * console.log(result);
 * })
 * .catch(err => {
 * console.log(err);
 * });
 * 
 * */ 
const findUserByCredentials = async (email, password) => {
  try {
    const query = `SELECT * FROM users WHERE email = $1 AND password = $2`;
    const values = [email, password];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    throw error;
  }

};

const updateUserAvailability = async (id, isAvailable) => {
  try {
    const query = `UPDATE users SET is_available = $1 WHERE id = $2`;
    const values = [isAvailable, id];
    const result = await pool.query(query, values);
    return result.rowCount;
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @returns {Promise<Object>}
 * @description Retrieves all developers from users table
 * @example getAllDevelopers()
 * .then(result => {
 * console.log(result);
 * })
 * .catch(err => {
 * console.log(err);
 * });
 *
 */
const retrieveAllDevelopers = async () => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE user_type = 'developer'`);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const getDevelopersByTechStack = async (tech_stack) => {
  try {
    const query = `SELECT * FROM users WHERE $1 = ANY(tech_stack) AND user_type = 'developer' limit 1`;
    const values = [tech_stack];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    throw error;
  }
};



module.exports = {
  addUser,
  findUserByCredentials,
  retrieveAllDevelopers,
  updateUserAvailability,
  getDevelopersByTechStack
};
