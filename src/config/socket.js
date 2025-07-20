const SocketNotification = require("../sockets/SocketsNotification")
function ConfigSocket(io){

    io.on("connection", (socket) => {
        console.log("Usuario conectado ", socket.id);

        
    })
}

module.exports = ConfigSocket