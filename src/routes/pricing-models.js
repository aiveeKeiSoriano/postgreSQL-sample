const Router = require('koa-router')
const {
    getPricingsList,
    createNewPricing,
    getPricing,
    updatePricing,
    deletePricing,
    getPrices,
    addPrice,
    deletePrice
} = require('../controllers/pricing-models')

const router = new Router({
    prefix: '/pricing-models'
})

router
    .get('/', getPricingsList)
    .post('/', createNewPricing)
    .get('/:pmId', getPricing)
    .put('/:pmId', updatePricing)
    .delete('/:pmId', deletePricing)
    .get('/:pmId/prices', getPrices)
    .post('/:pmId/prices', addPrice)
    .delete('/:pmId/prices/:priceId', deletePrice)

module.exports = router