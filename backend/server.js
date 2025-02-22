const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Crear usuarios
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
    res.status(201).send('Usuario creado');
  } catch (err) {
    res.status(400).send('Error al crear usuario');
  }
});

// Listar usuarios
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).send('Error al listar usuarios');
  }
});

// Registrar transacciones
app.post('/transactions', async (req, res) => {
  const { user_id, amount, type } = req.body;
  try {
    await pool.query('INSERT INTO transactions (user_id, amount, type) VALUES ($1, $2, $3)', [user_id, amount, type]);
    res.status(201).send('Transacción registrada');
  } catch (err) {
    res.status(400).send('Error al registrar transacción');
  }
});

// Obtener transacciones por usuario
app.get('/transactions/:user_id', async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM transactions WHERE user_id = $1', [user_id]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).send('Error al obtener transacciones');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
