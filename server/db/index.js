"use strict";
//postgresql db connect
const { Pool, Client } = require("pg");

const client = new Client({
  user: process.env["PG_USER"],
  host: process.env["PG_HOST"],
  database: process.env["PG_DB"],
  password: process.env["PG_PASSWORD"],
  port: process.env["PG_PORT"],
});

const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "dgpadb",
  password: "postgres",
  port: 5432,
});

pool.on("connect", async () => {
  console.log("connected to the db");
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

/**
 *
 * @param {*} query
 * @returns {Promise<Object>}
 * @description executes a query on the database with the client connection
 */
const executeWithClient = async (query) => {
  try {

    await pool.query(query); // sends queries
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  } finally {
    await client.end(); // closes connection
  }
};

const projectsTableSQL = `CREATE TABLE IF NOT EXISTS projects (
    id serial PRIMARY KEY,
    name varchar NOT NULL,
    description text NOT NULL,
    tech_stack varchar[] NOT NULL
  )`;

const usersTableSQL = `CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    name varchar NOT NULL,
    email varchar NOT NULL,
    password varchar NOT NULL,
    user_type varchar NOT NULL,
    is_available bool NOT NULL,
    tech_stack varchar[] NOT NULL
  );`;

executeWithClient(projectsTableSQL).then(async (result) => {
  console.log("Table projects created");
  /* INSERT QUERY NO: 1 */

  const seed = [`INSERT INTO projects(name, description, tech_stack) VALUES (
  'OpenCRVS', 'Plan International and partners are building an open-source digital CRVS system that works in every country and for every individual.', ARRAY ['nodejs']
  );`,
    `INSERT INTO projects(name, description, tech_stack)
  VALUES
  (
  'StoryWeaver', 'StoryWeaver is an open source platform by Pratham Books for multilingual children’s stories.', ARRAY ['python']
  );`,

    `INSERT INTO projects(name, description, tech_stack)
  VALUES
  (
  'Curious Learning', 'Curious Learning works with partners to curate & localize and distribute & measure free open source apps that empowers everyone to have the opportunity to learn to read.', ARRAY ['kotlin']
  );`,

    `INSERT INTO projects(name, description, tech_stack)
  VALUES
  (
  'Primero', 'Primero is an open source software platform that helps social services', ARRAY ['android']
  );`];

  const res = await Promise.all(seed.map(async (insertQuery) => await executeWithClient(insertQuery)))
  console.log("Seeded projects", res);
}).catch((err) => {
  console.log("user seed error", err)
});

executeWithClient(usersTableSQL).then(async (result) => {
  console.log("Table users created");
  const seed = [
    `INSERT INTO users (name, username, password, tech_stack, is_available, user_type) VALUES ('Kanaan', 'knaan', 'knaan', ARRAY ['nodejs'], true, 'developer')`,
    `INSERT INTO users (name, username, password, tech_stack, is_available, user_type) VALUES  ('Kwesi', 'kwesi', 'kwesi', ARRAY ['java'], true, 'developer')`,
    `INSERT INTO users (name, username, password, tech_stack, is_available, user_type) VALUES  ('Robert', 'robert', 'robert', ARRAY ['python'], true, 'developer')`,
    `INSERT INTO users (name, username, password, tech_stack, is_available, user_type) VALUES  ('Eric', 'eric', 'eric', ARRAY ['c++'], true, 'reviewer')`,
    `INSERT INTO users (name, username, password, tech_stack, is_available, user_type) VALUES  ('Christian', 'christian', 'christian', ARRAY ['android'], true, 'developer')`
  ]
  const res = await Promise.all(seed.map(async (insertQuery) => await executeWithClient(insertQuery)));
  console.log("Seeded users", res)
}).catch((err) => {
  console.log("user seed error",err)
});



module.exports = pool;
