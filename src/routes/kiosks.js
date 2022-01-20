const Router = require('koa-router')
const {
    updateKioskPricing,
    deleteKioskPricing,
    getKioskPricing,
    createNewKiosk,
    deleteKiosk
} = require('../controllers/kiosks')

const router = new Router({
    prefix: '/kiosks'
})

router
    .post('/', createNewKiosk)
    .delete('/:kioskId', deleteKiosk)
    .put('/:kioskId/prices/:pmId', updateKioskPricing)
    .delete('/:kioskId/prices/:pmId', deleteKioskPricing)
    .get('/:kioskId/prices', getKioskPricing)

module.exports = router