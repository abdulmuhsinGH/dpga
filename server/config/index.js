console.log("Setting env variables...");
var env = process.env.NODE_ENV || "production";
env = env.trim();

var config = require("./config.json");
var envConfig = config[env];

Object.keys(envConfig).forEach((key) => {
  process.env[key] = envConfig[key];
  console.log("...");
});

console.log("Done");
