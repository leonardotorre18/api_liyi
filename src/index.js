const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path')
// const routes = require('./routes');


const db ='mongodb://0.0.0.0:27017/empleados';
const port = 3000; 

const server = express();

// Config
server.use(morgan('dev'));
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: false}));
mongoose.connect(db)
  .then(() => console.log("Connection Mongoose is Success\n"))
  .catch(() => console.log("Error Database Connection"))


const generateEntity = () => {
  let schema = new mongoose.Schema({
    name: {type: 'string'},
    position: {type: 'string'},
    office: {type: 'string'},
    salary: {type: 'number'}
  })
  return mongoose.models.users || mongoose.model('users', schema)
}

// Ruta estática para archivos publicos
// https://localhost:3000/
server.use('/', express.static(path.join(__dirname, './public')))


// Ruta para pedir usuarios 
// https://localhost:3000/empleados
server.get('/empleados', (req, res) => {

  generateEntity()
    .find({})
    .exec()
    .then(data => {
      res.json(data)
    })
})

// Ruta para agregar usuarios 
// https://localhost:3000/empleados
server.post('/empleados', (req, res) => {

  const { name, position, office, salary }
    = req.body

  console.log(name, position, office,salary)
  if (name && position && office && salary)
    generateEntity()
      .create({
        name, 
        position,
        office,
        salary
      }).then(() => res.json({ message: 'Empleado Agregado' }))

  else res.status(403).json({ error: 'Datos enviados incorrectamente' })
})



server.listen(3000, () => {
  console.log(`\n⚡ Server is running on port ${port}`)
  console.log(`click here: http://localhost:${port}\n`)
})