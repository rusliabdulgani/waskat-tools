const Barang = require('../models/barang')

let getAllBarang = (req, res) => {
  Barang.find()
  .populate({path: '_userId'})
  .then(response => {
    console.log('get all barang: ', response)
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let getBarangById = (req, res) => {
  Barang.findById(req.params.id)
  .populate({path: '_userId'})
  .then(response => {
    console.log('get barang by id: ', response)
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let inputBarang = (req, res) => {
  Barang.create({
    judul: req.body.judul,
    jenisBarang: req.body.jenisBarang,
    beratBarang: req.body.beratBarang,
    pinjaman: req.body.pinjaman,
    _userId: req.body._userId
  })
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let editBarang = (req, res) => {
  Barang.update({
    _id: req.params.id
  }, {
    judul: req.body.judul,
    jenisBarang: req.body.jenisBarang,
    beratBarang: req.body.beratBarang,
    pinjaman: req.body.pinjaman
  })
  .then(response => {
    console.log('edit barang: ', response)
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let deleteBarang = (req, res) => {
  Barang.remove({
    _id: req.params.id
  })
  .then(response => {
    console.log('delete barang', response)
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

module.exports = {
  getAllBarang,
  getBarangById,
  inputBarang,
  editBarang,
  deleteBarang
}