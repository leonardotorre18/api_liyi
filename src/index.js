const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const mysql = require('mysql');


const db ='mongodb://0.0.0.0:27017/empleados';
const port = 3000; 

const server = express();

// Config
server.use(morgan('dev'));
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: false}));

const entity = mysql.createPool({
  host: '0.0.0.0',
  user: 'root',
  password: 'Liyi123',
  port: '3306',
  database: 'pruebas'
})

// Este comando cambia la contraseña
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Liyi'
// Por alguna razón, la contraseña debe tener numeros y por eso no se conectaba



// Ruta estática para archivos publicos
// https://localhost:3000/
server.use('/', express.static(path.join(__dirname, './public')))


// Ruta para pedir usuarios 
// https://localhost:3000/usuarios
server.get('/users', (req, res) => {
  
  entity.query('SELECT * FROM users', (err, result) => {
    console.log(result)
    res.json(result)
  })

})

// Ruta para agregar usuarios 
// https://localhost:3000/usuarios
server.post('/users', (req, res) => {

  const { name, email } = req.body;

  entity.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email],
  (err, result) => {
    console.log(err, result)
    res.json(result)
  })

})



server.listen(3000, () => {
  console.log(`\n⚡ Server is running on port ${port}`)
  console.log(`click here: http://localhost:${port}\n`)
})