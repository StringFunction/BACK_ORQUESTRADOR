require("./src/routes/rotasBots")
const http = require("http")
const app = require("./src/app")
const port = process.env.PORT || 10000
const {Server} = require("socket.io")


server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});


app.set("io", io);
io.on("connection", (socket) => {
  console.log("Frontend conectado ao WebSocket!");

  socket.on("disconnect", () => {
    console.log("Frontend desconectado.");
  });
});
server.listen(port, () =>{
   console.log("http://localhost:" +  port);
    
})