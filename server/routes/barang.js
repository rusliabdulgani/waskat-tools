const express = require('express')
const router = express.Router()

//IMPORT CONTROLLER & MIDDLEWARE
const controller = require('../controllers/barangController')
const auth = require('../helper/auth')

router.get('/', auth.adminAndUser, controller.getAllBarang)
router.get('/:id', auth.adminAndUser, controller.getBarangById)
router.post('/', auth.adminAndUser, controller.inputBarang)
router.put('/:id', auth.adminAndUser, controller.editBarang)
router.delete('/:id', auth.adminAndUser, controller.deleteBarang)

module.exports = router