const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");
const { config } = require("dotenv");
const PORT = process.env.PORT || 3000;
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
app.use(express.json());
app.use(cors());

const personSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  hobbies: Joi.array().items(Joi.string()).required(),
});

app.get("/person", (req, res) => {
  return res.json(app.get("db"));
});

app.get("/person/:id", (req, res) => {
  const person = app.get("db").find((p) => p.id === req.params.id);
  if (!person) {
    return res.status(404).json({ message: "Person not found" });
  }
  return res.json(person);
});

app.post("/person", (req, res) => {
  const { error } = personSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const newPerson = {
    id: uuidv4(),
    ...req.body,
  };

  app.get("db").push(newPerson);
  return res.status(200).json(newPerson);
});

app.put("/person/:id", (req, res) => {
  const personIndex = app.get("db").findIndex((p) => p.id === req.params.id);
  if (personIndex === -1) {
    return res.status(404).json({ message: "Person not found" });
  }

  const { error } = personSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const updatedPerson = {
    id: req.params.id,
    ...req.body,
  };

  app.get("db")[personIndex] = updatedPerson;
  return res.json(updatedPerson);
});

app.delete("/person/:id", (req, res) => {
  const personIndex = app.get("db").findIndex((p) => p.id === req.params.id);
  if (personIndex === -1) {
    return res.status(404).json({ message: "Person not found" });
  }

  app.get("db").splice(personIndex, 1);
  return res.json({ message: "Person deleted successfully" });
});

app.get("/", (req, res) => {
  return res.json({ message: "Hello old friend" });
});

app.use((req, res) => {
  return res.status(404).json({ message: "Endpoint not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).json({ message: "Internal Server Error" });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
