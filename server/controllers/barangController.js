const Barang = require('../models/barang')

let getAllBarang = (req, res) => {
  Barang.find()
  .then(response => {
    console.log('get all Barang: ', response)
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let getBarangById = (req, res) => {
  Barang.findById(req.params.id)
  .then(response => {
    console.log('get Barang by id: ', response)
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let inputBarang = (req, res) => {
  Barang.create({
    foto: req.body.foto,
    keterangan: req.body.keterangan,
    _kreditId: req.body._kreditId
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
    foto: req.body.foto,
    keterangan: req.body.keterangan,
    _kreditId: req.body._kreditId
  })
  .then(response => {
    console.log('edit Barang: ', response)
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
    console.log('delete Barang', response)
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