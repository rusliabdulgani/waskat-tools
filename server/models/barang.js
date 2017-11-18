const mongoose = require('mongoose')
const Schema = mongoose.Schema

let barangSchema = new Schema({
  judul: {
    type: String
  },
  jenisBarang: {
    type: String,
    required: true
  },
  beratBarang: {
    type: String,
    required: true
  },
  pinjaman: {
    type: String,
    required: true
  }
})

let Barang = mongoose.model('Barang', barangSchema)

module.exports = Barang