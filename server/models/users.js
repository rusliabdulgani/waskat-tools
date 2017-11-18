const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
})

let User =  mongoose.model('User', userSchema)

module.exports = User