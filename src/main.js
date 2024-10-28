const { json } = require("express");
const cors = require("cors");
const personRoute = require("./routes/person.route");

const bootstrapApplication = (app) => {
  app.use(json());
  app.use(cors());

  app.use(personRoute);

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
};

module.exports = bootstrapApplication;
