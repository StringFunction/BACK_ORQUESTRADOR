const bot = require("../Controller/controllerBots")
const app = require("../app")

const monitoramento_req = (req,res, next) =>{
    console.log("========== NOVA REQUISIÇÃO ==========");

    console.log("IP:", req.ip);
    console.log("Método:", req.method);
    console.log("URL:", req.originalUrl);
    console.log("User-Agent:", req.headers["user-agent"]);
    console.log("Data:", new Date().toLocaleString());
    console.log("Headers:", req.headers);

    console.log("======================================");

    next();
}

app.use("/bot", monitoramento_req, bot)