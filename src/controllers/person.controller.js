const {
  findAll,
  findById,
  create,
  remove,
  update,
} = require("../services/person.service");

const getAllPersons = (req, res) => {
  return res.json(findAll(req.app.get("db")));
};

const getPerson = (req, res) => {
  const person = findById(req.params.id, req.app.get("db"));
  return res.json(person);
};

const createPerson = (req, res) => {
  const newPerson = create(req.body, req.app.get("db"));
  return res.status(200).json(newPerson);
};

const updatePerson = (req, res) => {
  const updatedPerson = update(res.personIndex, req.app.get("db"), {
    id: req.params.id,
    ...req.body,
  });
  return res.json(updatedPerson);
};

const deletePerson = (req, res) => {
  remove(res.personIndex, req.app.get("db"));
  return res.json({ message: "Person deleted successfully" });
};

module.exports = {
  getAllPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
};
