const bodyParser = require("body-parser");
const pessoasRouter = require("./pessoasRouter");

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(pessoasRouter);
};
