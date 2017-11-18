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
    type: Number,
    required: true
  },
  _userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

let Barang = mongoose.model('Barang', barangSchema)

module.exports = Barang