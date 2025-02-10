/**
 * Servidor Backend - CodeHub
 */
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const apiRouter = require("./routes/api");
const db = require("./database");  // Inicializa la base de datos

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend")));

// Rutas API
app.use("/api", apiRouter);

// Ruta para la página principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// WebSocket para Chat en Vivo
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado:", socket.id);
  socket.on("chat message", (msg) => {
    console.log("Mensaje recibido:", msg);
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// Inicialización del Servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

