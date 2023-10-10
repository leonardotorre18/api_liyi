const mongoose = require("mongoose")

const Entity = () => {
  let schema = new mongoose.Schema({
    name: {
      type: 'string'
    },
    position: {
      type: 'string'
    },
    office: {
      type: 'string'
    },
    salary: {
      type: 'number'
    }
  })
  return mongoose.models.users || mongoose.model('users', schema)
}


const getUsers = () => {
  return Entity().find({}).exec().then(users => users)
}

module.exports = {
  getUsers
}