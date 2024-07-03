// models/People.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String },
  register: { type: String },
});

const peopleSchema = new mongoose.Schema({
  // id: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  password: { type: String },
  gender: { type: String },
  nationality: { type: String },
  birth_date: { type: Date },
  selfie: { type: String },
  profiles: [profileSchema],
  phones: { type: String }, // Nuevo campo para el teléfono
  emails: { type: String }, // Nuevo campo para el correo electrónico
});

const People = mongoose.model('People', peopleSchema);

module.exports = People;