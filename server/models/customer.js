const mongoose = require('mongoose')
const Schema = mongoose.Schema

let customerSchema = new Schema({
    nama: {
      type: String,
      required: true
    },
    alamat: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  })
  
  let Customer =  mongoose.model('Customer', customerSchema)
  
  module.exports = Customer