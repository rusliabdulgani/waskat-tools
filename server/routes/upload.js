const express = require('express')
const router = express.Router()
const Multer = require('multer')

//IMPORT HELPER FOR UPLOAD TO GCP
const imgUpload = require('../helper/imgUpload')

const multer = Multer({
  storage: Multer.MemoryStorage
})

router.post('/single', multer.single('file'), imgUpload, function (req, res, next) {
  res.status(500).json({
    status: true,
    message: 'OK',
    result: req.filePhoto
  })
})

module.exports = router