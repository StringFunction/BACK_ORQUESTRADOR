const movimento = require("../Controller/controllerMovimentos")
const app = require("../app")
const monitoramento_req = (req,res, next) =>{
    console.log("========== NOVA REQUISIÇÃO ==========");
    console.log("agendamento");
    

    console.log("IP:", req.ip);
    console.log("Método:", req.method);
    console.log("URL:", req.originalUrl);
    console.log("User-Agent:", req.headers["user-agent"]);
    console.log("Data:", new Date().toLocaleString());
    console.log("Headers:", req.headers);
    console.log("======================================");

    next();
}

app.use("/movimento", monitoramento_req, movimento)


module.exports = app