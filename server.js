// server.js
const express = require('express');
const mongoose = require('mongoose');
const People = require('./models/People');

const app = express();
const PORT = 3000;

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/people');

// Ruta para obtener usuarios paginados
app.get('/people', async (req, res) => {
  const { page = 1, limit = 100 } = req.query;

  try {
    const totalPeople = await People.countDocuments();
    const peopleData = await People.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      totalPeople,
      peopleData,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalPeople / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use(express.json()); // Middleware para manejar JSON

// Ruta para eliminar persona por email
app.delete('/people', async (req, res) => {
  try {
    const email = req.body.emails;
    console.log(email);

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const deletedPersona = await People.findOneAndDelete({ emails: email });

    if (!deletedPersona) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.json({ message: 'Person deleted successfully', data: deletedPersona });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// elimina por id
app.delete('/people/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    if (!id) {
      return res.status(400).json({ error: 'Id is required' });
    }

    const deletedPersona = await People.findOneAndDelete({ _id: `ObjectId(${id})` });

    if (!deletedPersona) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.json({ message: 'Persona deleted successfully', data: deletedPersona });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});