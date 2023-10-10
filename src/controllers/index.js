const model = require('../models')

class MainController {
  helloWorld (message) {
    return message
  }
  async getusers () {
    const response = await model.getUsers()
    return response;
  }
}

module.exports = new MainController()