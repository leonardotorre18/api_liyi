const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes');


const db ='mongodb://0.0.0.0:27017/codeverification';
const port = 3000;

const server = express();

// Config
server.use(morgan('dev'));
server.use(cors());
mongoose.connect(db)
  .then(() => console.log("Connection Mongoose is Success\n"));

// Import routes
server.use('/', routes)



server.listen(3000, () => {
  console.log(`\n⚡ Server is running on port ${port}`)
  console.log(`click here: http://localhost:${port}\n`)
})