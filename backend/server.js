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
    const result = await pool.query('SELECT * FROM users where email = $1', [email]);
    if (result.rows.length > 0) {
      return res.status(400).send('El email ya está registrado');
    }
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
    if (type == 'deposit')
      await pool.query('INSERT INTO transactions (user_id, amount, type) VALUES ($1, $2, $3)', [user_id, amount, type]);
    else {
      const balance = await pool.query("SELECT SUM(CASE WHEN type = 'deposit' THEN amount ELSE -amount END) AS balance FROM transactions WHERE user_id = $1", [user_id]);
      if (balance.rows[0].balance < amount) {
        return res.status(405).send('Fondos insuficientes');
      }
      else
        await pool.query('INSERT INTO transactions (user_id, amount, type) VALUES ($1, $2, $3)', [user_id, amount, type]);
    }
    res.status(201).send('Transacción registrada');
  } catch (err) {
    res.status(400).send('Error al registrar transacción');
  }
});

// Obtener transacciones por usuario
app.get('/transactions/:user_id', async (req, res) => {
  if (!req.params) return res.status(400).send('Petición incorrecta');
  const { user_id } = req.params;
  try {
    if (!user_id) {
      return res.status(400).send('El id del usuario es requerido');
    }
    const regs = await pool.query('SELECT * FROM transactions where user_id = $1', [user_id]);
    if (regs.rows.length <= 0) {
      return res.status(400).send('Transaccion no encontrada');
    }

    const result = await pool.query('SELECT a.id, b.name, a.amount, a.type FROM transactions a inner join users b on a.user_id = b.id WHERE a.user_id = $1', [user_id]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).send('Error al obtener transacciones');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
