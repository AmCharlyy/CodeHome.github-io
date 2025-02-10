/**
 * Rutas de la API - CodeHub
 */
const express = require("express");
const router = express.Router();
const db = require("../database");

// Registro de Usuario
router.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
  db.run(sql, [username, email, password], function(err) {
    if (err) {
      console.error("Error al registrar usuario:", err);
      res.status(500).json({ status: "error", message: "Error al registrar usuario" });
    } else {
      res.json({
        status: "success",
        message: "Usuario registrado correctamente",
        data: { id: this.lastID, username, email }
      });
    }
  });
});

// Autenticación de Usuario
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
  db.get(sql, [email, password], (err, row) => {
    if (err) {
      console.error("Error al autenticar usuario:", err);
      res.status(500).json({ status: "error", message: "Error en autenticación" });
    } else if (row) {
      res.json({
        status: "success",
        message: "Usuario autenticado correctamente",
        token: "JWT-TOKEN-DEMO", // Se debe generar un token real
        data: row
      });
    } else {
      res.status(401).json({ status: "error", message: "Credenciales incorrectas" });
    }
  });
});

// Obtener Retos Diarios
router.get("/challenges", (req, res) => {
  const sql = `SELECT * FROM challenges`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Error al obtener retos:", err);
      res.status(500).json({ status: "error", message: "Error al obtener retos" });
    } else {
      res.json({ status: "success", challenges: rows });
    }
  });
});

// Obtener Cursos Disponibles
router.get("/courses", (req, res) => {
  const sql = `SELECT * FROM courses`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Error al obtener cursos:", err);
      res.status(500).json({ status: "error", message: "Error al obtener cursos" });
    } else {
      res.json({ status: "success", courses: rows });
    }
  });
});

// Enviar Feedback
router.post("/feedback", (req, res) => {
  const { usuario, comentario } = req.body;
  console.log("Feedback recibido de:", usuario);
  // Aquí se podría insertar el feedback en una tabla de la base de datos
  res.json({ status: "success", message: "Feedback enviado, gracias por tu opinión." });
});


module.exports = router;
