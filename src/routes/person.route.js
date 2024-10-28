const { Router } = require("express");
const router = Router();

const {
  getAllPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
} = require("../controllers/person.controller");

const {
  findPersonIndex,
  validatePerson,
} = require("../middlewares/person.middleware");

router.get("/person", getAllPersons);

router.get("/person/:id", findPersonIndex, getPerson);

router.post("/person", validatePerson, createPerson);

router.put("/person/:id", findPersonIndex, validatePerson, updatePerson);

router.delete("/person/:id", findPersonIndex, deletePerson);

module.exports = router;
