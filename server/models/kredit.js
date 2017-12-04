const mongoose = require('mongoose')
const Schema = mongoose.Schema

let kreditSchema = new Schema({
  noKredit: {
    type: String
  },
  pinjaman: {
    type: Number,
    required: true
  },
  _customerId: {
    type: Schema.Types.ObjectId,
    ref: 'Customer'
  },
  _barangId: [{
    type: Schema.Types.ObjectId,
    ref: 'Barang'
  }]
})

let Kredit = mongoose.model('Kredit', kreditSchema)

module.exports = Kredit