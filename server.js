const bodyParser = require("body-parser");
const cors = require("cors");
const port = 8000;
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// endpoint callback
const getAll = (req, res) => {
  res.send(projectData);
};

const addData = (req, res) => {
  const { temp, date, feelings, zip } = req.body || {};
  projectData = { temp, date, feelings, zip };

  return res.send(projectData);
};

// endpoints
app.get("/all", getAll);
app.post("/add", addData);

// Setup Server
const server = app.listen(port, () => {
  console.log(`server running on localhost: ${port}`);
});
