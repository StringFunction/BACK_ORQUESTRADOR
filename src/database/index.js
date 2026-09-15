const sequelize = require("../config/database");
const models = require("./models");
const configurarAssociacoes = require("./associations");


async function testarConexao() {

    console.log("🔄 Testando conexão com banco...");

    try {

        await sequelize.authenticate();

        console.log("✅ Banco de dados conectado.");

        return true;

    } catch (error) {

        console.error("❌ Não foi possível conectar ao banco.");
        console.error("Mensagem:", error.message);

        return false;
    }
}


async function carregarModels() {

    try {

        console.log("🔄 Carregando models...");

        Object.entries(models).forEach(([nome, model]) => {

            if (!model) {
                throw new Error(`Model ${nome} não foi carregado.`);
            }

            console.log(`   ✓ ${nome}`);
        });

        console.log("✅ Models carregados.");

    } catch (error) {

        console.error("❌ Erro ao carregar models.");

        throw error;
    }
}


async function carregarAssociacoes() {

    try {

        console.log("🔄 Configurando associações...");

        configurarAssociacoes();

        console.log("✅ Associações configuradas.");

    } catch (error) {

        console.error("❌ Erro nas associações.");

        throw error;
    }
}


async function sincronizarBanco() {

    try {

        console.log("🔄 Sincronizando banco...");

        await sequelize.sync({
            alter: false
        });

        console.log("✅ Banco sincronizado.");

    } catch (error) {

        console.error("❌ Erro ao sincronizar banco.");

        throw error;
    }
}


async function iniciarBanco() {

    console.log("");
    console.log("=================================");
    console.log("      DATABASE INITIALIZER");
    console.log("=================================");

    try {

        // 1
        const conectado = await testarConexao();

        if (!conectado) {
            throw new Error(
                "Banco de dados indisponível."
            );
        }

        // 2
        await carregarModels();

        // 3
        await carregarAssociacoes();

        // 4
        await sincronizarBanco();

        console.log("");
        console.log("=================================");
        console.log("      BANCO PRONTO 🚀");
        console.log("=================================");
        console.log("");

        return {
            sequelize,
            models
        };

    } catch (error) {

        console.error("");
        console.error("=================================");
        console.error("      ERRO DATABASE");
        console.error("=================================");
        console.error(error);
        console.error("");

        throw error;
    }
}


async function fecharBanco() {

    try {

        console.log("🔄 Encerrando conexão com banco...");

        await sequelize.close();

        console.log("✅ Conexão encerrada.");

    } catch (error) {

        console.error(
            "❌ Erro ao fechar conexão:",
            error.message
        );

    }
}


module.exports = {
    iniciarBanco,
    fecharBanco,
    sequelize,
    models
};