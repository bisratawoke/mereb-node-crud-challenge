const personSchema = require("../schemas/person.schema");

const findPersonIndex = (req, res, next) => {
  const personIndex = req.app
    .get("db")
    .findIndex((p) => p.id === req.params.id);
  if (personIndex === -1) {
    return res.status(404).json({ message: "Person not found" });
  }
  res.personIndex = personIndex;

  next();
};

const validatePerson = (req, res, next) => {
  const { error } = personSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

module.exports = {
  validatePerson,
};

module.exports = { findPersonIndex, validatePerson };
