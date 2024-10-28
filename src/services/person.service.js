const { v4: uuidv4 } = require("uuid");

const findAll = (data) => {
  return data;
};

const findById = (personId, data) => {
  return data.find((p) => p.id === personId);
};

const create = (payload, data) => {
  const newPerson = {
    id: uuidv4(),
    ...payload,
  };

  data.push(newPerson);
  return newPerson;
};

const remove = (index, data) => {
  return data.splice(index, 1);
};

const update = (index, data, updatedPerson) => {
  data[index] = updatedPerson;
  return updatedPerson;
};
module.exports = {
  findAll,
  findById,
  create,
  remove,
  update,
};
