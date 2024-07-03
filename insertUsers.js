// insertpeople.js
const mongoose = require('mongoose');
const People = require('./models/People');

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/people');

// Función para generar datos aleatorios de usuario
const generateUserData = () => {
  const firstName = [
    'ANABELLA', 'JUAN', 'MARÍA', 'PEDRO', 'LAURA', 'CARLOS', 'ANA', 'JOSÉ', 'SOFIA', 'MIGUEL',
    'ISABELLA', 'LUCAS', 'VALENTINA', 'MATEO', 'CAMILA', 'DIEGO', 'MARTINA', 'ALEJANDRO', 'LUCÍA', 'GABRIEL',
    'EMMA', 'SANTIAGO', 'VALENTINA', 'BENJAMÍN', 'ISABELLA', 'SAMUEL', 'VALERIA', 'ANDRÉS', 'DANIELA', 'JOAQUÍN',
    'EMILIA', 'TOMÁS', 'RENATA', 'JERÓNIMO', 'VICTORIA', 'MÁXIMO', 'ANTONIA', 'DYLAN', 'GUADALUPE', 'EMMANUEL',
    'MIRANDA', 'NICOLÁS', 'RAFAELA', 'MATÍAS', 'SARA', 'LEONARDO', 'CATALINA', 'IAN', 'XIMENA', 'THIAGO',
    'ALMA', 'LIAM', 'AMANDA', 'BALTAZAR', 'JULIETA', 'GAEL', 'MONTSERRAT', 'SEBASTIÁN', 'REBECCA', 'DANTE',
    'ALLISON', 'JESÚS', 'FERNANDA', 'ÁLVARO', 'ROMINA', 'JOAQUÍN', 'ALICIA', 'EMILIANO', 'ABIGAIL', 'MASSIMO',
    'OLIVIA', 'DAMIÁN', 'ISABELLA', 'ARMANDO', 'MARIANA', 'CHRISTOPHER', 'SILVANA', 'BRUNO', 'FLORENCIA', 'IKER',
    'MARTA', 'ARIEL', 'BIANCA', 'ADRIÁN', 'NATALIA', 'JORGE', 'LOLA', 'BAUTISTA', 'CONSTANZA', 'SANTIAGO',
    'JULIA', 'ALEXIS', 'ANTONELLA', 'JAVIER', 'JIMENA', 'ÁNGEL', 'NADIA', 'MARCO', 'DULCE', 'SERGIO'
  ];

  const lastName = [
    'GONZÁLEZ', 'RODRÍGUEZ', 'LÓPEZ', 'MARTÍNEZ', 'GARCÍA', 'FERNÁNDEZ', 'SÁNCHEZ', 'PÉREZ', 'GÓMEZ', 'MARTÍN',
    'JIMÉNEZ', 'RUIZ', 'HERNÁNDEZ', 'DÍAZ', 'MORENO', 'MUÑOZ', 'ÁLVAREZ', 'ROMERO', 'ALONSO', 'GUTIÉRREZ',
    'NAVARRO', 'TORRES', 'DOMÍNGUEZ', 'VÁZQUEZ', 'RAMOS', 'GIL', 'RAMÍREZ', 'SERRANO', 'BLANCO', 'SUÁREZ',
    'MOLINA', 'DELGADO', 'SANZ', 'ORTEGA', 'RUBIO', 'MARÍN', 'IGLESIAS', 'NÚÑEZ', 'MEDINA', 'GARRIDO',
    'SANTOS', 'CASTILLO', 'CORTÉS', 'LOZANO', 'GUERRERO', 'CANO', 'PRIETO', 'CALVO', 'CRUZ', 'GALLEGO',
    'VIDAL', 'ARAGÓN', 'MORA', 'SERRA', 'VILLAR', 'LORENZO', 'MÉNDEZ', 'ARIAS', 'FUENTES', 'CARRASCO',
    'CABALLERO', 'NIETO', 'REYES', 'AGUILAR', 'PASCUAL', 'HERRERA', 'SANTANA', 'LORENZO', 'CABRERA', 'TORRES',
    'CAMPOS', 'VEGA', 'SOLER', 'MOYA', 'PARRA', 'ESTEBAN', 'BRAVO', 'GALÁN', 'ROJAS', 'GUERRERO',
    'PRIETO', 'QUINTANA', 'SALAS', 'VELASCO', 'MARIN', 'IBÁÑEZ', 'PORTILLO', 'ARROYO', 'PINEDA', 'MUÑOZ',
    'LARA', 'ROLDÁN', 'MERINO', 'ESPINOSA', 'PASTOR', 'FERRER', 'CASADO', 'MARCOS', 'CARMONA', 'TOLEDO'
  ];
  const genders = ['FEMENINO', 'MASCULINO'];
  const nationalities = ['ARGENTINA', 'ESPAÑA', 'MÉXICO', 'COLOMBIA', 'PERÚ'];
  const profiles = [
    { name: 'AFFILIATE@OSDE_PROD', register: '' },
    { name: 'DEVELOPER@HMS_OSIRIS', register: '' },
    { name: 'DEVELOPER@OSDE_DESA', register: '' },
    { name: 'TESTER@OSDE_TEST1', register: '' },
  ];

  const randomFirstName = firstName[Math.floor(Math.random() * firstName.length)];
  const randomLastName = lastName[Math.floor(Math.random() * lastName.length)];
  const randomGender = genders[Math.floor(Math.random() * genders.length)];
  const randomNationality = nationalities[Math.floor(Math.random() * nationalities.length)];
  const randomBirthDate = new Date(
    1970 + Math.floor(Math.random() * 50),
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28)
  );
  // const año = randomBirthDate.getFullYear();
  // const mes = String(randomBirthDate.getMonth() + 1).padStart(2, '0');
  // const dia = String(randomBirthDate.getDate()).padStart(2, '0');
  // const formattedBirthDate = `${dia}-${mes}-${año}`;
  // const formattedBirthDate = randomBirthDate.toISOString().slice(0, 10);
  
  // Generación aleatoria de teléfono
  const randomPhone = Math.floor(Math.random() * 900000000) + 100000000;

  // Generación aleatoria de correo electrónico
  const randomEmail = `${randomFirstName.toLowerCase()}.${randomLastName.toLowerCase()}@example.com`;

  return {
    first_name: randomFirstName,
    last_name: randomLastName,
    password: 'pass_hasheada',
    gender: randomGender,
    nationality: randomNationality,
    birth_date: randomBirthDate,
    selfie: 'https://cdn-icons-png.flaticon.com/512/3577/3577429.png',
    profiles: profiles,
    phones: randomPhone, // Nuevo campo para el teléfono
    emails: randomEmail, // Nuevo campo para el correo electrónico
  };
};

// Función para insertar usuarios en la base de datos
const insertPeople = async (numPeople) => {
  try {
    const people = [];
    for (let i = 0; i < numPeople; i++) {
      const peopleData = generateUserData();
      // console.log(peopleData);
      people.push(peopleData);
    }

    await People.insertMany(people);
    console.log(`${numPeople} usuarios insertados correctamente`);
  } catch (error) {
    console.error('Error al insertar usuarios:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Insertar 100 usuarios en la base de datos
insertPeople(100);