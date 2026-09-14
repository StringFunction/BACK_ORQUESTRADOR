const agendamento = require("../Controller/controllerAgendamento")
const app = require("../app")


app.use("/agendamento", agendamento)


module.exports = app