const express = require("express");
const { config } = require("dotenv");
const bootstrapApplication = require("./src/main");
config();
const app = express();

let persons = [
  {
    id: "1",
    name: "Sam",
    age: 26,
    hobbies: [],
  },
];
app.set("db", persons);

bootstrapApplication(app);

module.exports = app;
