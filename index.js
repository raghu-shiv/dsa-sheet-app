const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

require("./startup/routes")(app);
require("./startup/db")(app);
require("./startup/validation")();
