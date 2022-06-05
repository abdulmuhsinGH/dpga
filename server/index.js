// express server
require("./config/");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

//body parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect db
require("./db");

var index = require("./routes/");
app.use("/", index);

app.listen(port, () => {
  console.log("server started on port " + port);
});


module.exports = app;