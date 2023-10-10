const express = require('express');
const MainController = require('../controllers')

const routes = express()

routes.get('/', async (req, res) => {
  const response = MainController.helloWorld('Hola mundo')
  res.send(response)
})

routes.get('/users', async (req, res) => {
  const response = await MainController.getusers()
  res.json(response)
})

module.exports = routes;