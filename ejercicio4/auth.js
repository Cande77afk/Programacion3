const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const router = express.Router();
const SECRET_KEY = 'tu_clave_secreta'; // Cambia esto en producción

// Registro de usuario
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });
  await newUser.save();
  res.status(201).send('Usuario registrado');
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).send('Credenciales incorrectas');
  }

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
