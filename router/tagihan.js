const express = require ('express')
const router = express.Router()
const tagihanController = require('../controllers/tagihan_controllers')

router.post('/data/add', tagihanController.store)
router.get('/data', tagihanController.index)
router.get('/data/paid', tagihanController.showPaid)
router.get('/data/pending', tagihanController.showPending)
router.put('/data/update/:id', tagihanController.update)
router.delete('/data/delete/:id', tagihanController.delete)

module.exports = router