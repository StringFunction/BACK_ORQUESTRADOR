const { Model } = require("sequelize")
const Maquina = require("../Controller/controllerMaquina")
const app = require("../app")

app.use("/maquina", Maquina)


module.exports = app