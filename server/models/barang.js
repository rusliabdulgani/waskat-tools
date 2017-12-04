const mongoose = require('mongoose')
const Schema = mongoose.Schema

let barangSchema = new Schema({
  foto: {
    type: String
  },
  keterangan: {
    type: String,
    required: true
  },
  _kreditId: {
    type: Schema.Types.ObjectId,
    ref: 'Kredit'
  }
})

let Barang = mongoose.model('Barang', barangSchema)

module.exports = Barang