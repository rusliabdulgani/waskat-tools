const express = require('express')
const router = express.Router()

//IMPORT CONTROLLER & MIDDLEWARE
const controller = require('../controllers/kreditController')
const auth = require('../helper/auth')

router.get('/', auth.adminAndUser, controller.getAllKredit)
router.get('/:id', auth.adminAndUser, controller.getKreditById)
router.post('/', auth.adminAndUser, controller.inputKredit)
router.put('/:id', auth.adminAndUser, controller.editKredit)
router.delete('/:id', auth.adminAndUser, controller.deleteKredit)

module.exports = router