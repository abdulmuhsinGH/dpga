const pool = require("../db/index.js");


const insertProject = async (projects) => {
  try {
    const query = `INSERT INTO projects (name, description, tech_stack) VALUES ($1, $2, $3) RETURNING *`;
    const values = [
      projects.name,
      projects.description,
      projects.tech_stack,
    ];
    const result = await pool.query(query, values);
    return result.rowCount;
  } catch (error) {
    throw error;
  }

};

/**
 *
 * @returns {Promise<Object>}
 * @description select all projects from projects table
 * @example selectAllprojectss()
 * .then(result => {
 * console.log(result);
 * })
 * .catch(err => {
 * console.log(err);
 * });
 *
 */
const findAllProjects = async () => {
  try {
    const result = await pool.query('SELECT * FROM "projects"');
    return result.rows;
  } catch (error) {
    throw error;
  }
};


const getProjectByTechStack = async (tech_stack) => {
  try {
    const query = `SELECT * FROM projects WHERE $1 = ANY(tech_stack) limit 1`;
    const values = [tech_stack];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    throw error;
  }
};



module.exports = {
  insertProject,
  findAllProjects,
  getProjectByTechStack
};
