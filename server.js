
require('dotenv').config()
const path = require("path")
const fs = require("fs")
const http = require("http")
const app = require("./src/app")
const port = process.env.PORT || 10000
const { iniciarBanco } = require("./src/database")
const caminho = path.join(__dirname, "./src/routes")
server = http.createServer(app)
// ==========================
// ROTAS
// ==========================
fs.readdirSync(caminho).forEach(arquivo => {
    if (arquivo.endsWith(".js")) {
        require(path.join(caminho, arquivo));
        console.log(`Carregado: ${arquivo}`);
    }
    
});

app.get("/", (res,req) =>{
   req.send({"mensagem" :"seja bem vindo"})
})



async function iniciarServidor() {

    try {

        // ==========================
        // BANCO
        // ==========================

        await iniciarBanco();




        // ==========================
        // SERVIDOR
        // ==========================



        app.listen(port, () => {

            console.log(
                `🚀 Servidor rodando em http://localhost:${port}`
            );

        });

    } catch (error) {

        console.error(
            "❌ Aplicação não pôde ser iniciada."
        );

        process.exit(1);
    }
}


process.on("SIGINT", async () => {

    console.log("\n🛑 Encerrando aplicação...");

    await fecharBanco();

    process.exit(0);
});


process.on("SIGTERM", async () => {

    console.log("\n🛑 Encerrando aplicação...");

    await fecharBanco();

    process.exit(0);
});


iniciarServidor();
