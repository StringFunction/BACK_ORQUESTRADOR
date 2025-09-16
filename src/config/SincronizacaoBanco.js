const path = require("path");
const fs = require("fs")
const sequelize = require("../config/database")



const routesDir = path.join(__dirname, "..", "Models");
fs.readdirSync(routesDir).forEach(file => {
   console.log(path.join(routesDir, file));
   
  require(path.join(routesDir, file));
});

(async () => {
  try {
    await sequelize.sync({ alter: true }); // ou { force: true } para recriar tabelas
    console.log("Todas as tabelas foram sincronizadas com sucesso!");
  } catch (error) {
    console.error("Erro ao sincronizar tabelas:", error);
  }
})();