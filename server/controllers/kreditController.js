const Kredit = require('../models/kredit')

let getAllKredit = (req, res) => {
  Kredit.find()
  .populate({path: '_customerId'})
  .populate({path: '_barangId'})
  .then(response => {
    console.log('get all Kredit: ', response)
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let getKreditById = (req, res) => {
  Kredit.findById(req.params.id)
  .populate({path: '_customerId'})
  .populate({path: '_barangId'})
  .then(response => {
    console.log('get Kredit by id: ', response)
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let inputKredit = (req, res) => {
  Kredit.create({
    noKredit: req.body.noKredit,
    pinjaman: req.body.pinjaman,
    _customerId: req.body._customerId,
    _barangId: req.body._barangId
  })
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let editKredit = (req, res) => {
  Kredit.update({
    _id: req.params.id
  }, {
    noKredit: req.body.noKredit,
    pinjaman: req.body.pinjaman,
    _customerId: req.body._customerId,
    _barangId: req.body._barangId
  })
  .then(response => {
    console.log('edit Kredit: ', response)
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let deleteKredit = (req, res) => {
  Kredit.remove({
    _id: req.params.id
  })
  .then(response => {
    console.log('delete Kredit', response)
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

module.exports = {
  getAllKredit,
  getKreditById,
  inputKredit,
  editKredit,
  deleteKredit
}