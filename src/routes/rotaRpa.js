const app = require("../app")
const ControllerRpp = require("../Controller/ControllerCadastroEmpresa")



app.use("/v1", ControllerRpp)