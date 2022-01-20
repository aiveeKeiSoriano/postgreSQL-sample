const { default_pricing } = require('../../prices.json')
const Joi = require('joi')

const { models } = require('../db')

const { price, pricing, kiosk } = models

const createNewKiosk = async (ctx) => {
    const schema = Joi.object().keys({
        id: Joi.string().uuid(),
        name: Joi.string().required(),
    });

    const result = schema.validate(ctx.request.body);

    if (result.error) {
        ctx.throw(400, 'Invalid request')
    }

    const model = kiosk
    const newKiosk = await model.create(ctx.request.body)
    ctx.response.body = newKiosk.id
}

const deleteKiosk = async (ctx) => {
    await kiosk.destroy({
        where: {
            id: ctx.params.kioskId
        }
    })
    ctx.response.body = "Deleted successfully"
}

const updateKioskPricing = async (ctx) => {
    const kioskFound = await kiosk.findOne({
        where: {
            id: ctx.params.kioskId
        }
    })
    if (!kioskFound) {
        ctx.throw(404, 'Kiosk not found')
    }
    const pricingModel = await pricing.findOne({
        where: {
            id: ctx.params.pmId
        }
    })
    if (!pricingModel) {
        ctx.throw(404, 'Pricing Model not found')
    }
    kioskFound.setPricing(pricingModel.id)
    ctx.response.body = kioskFound
};

const deleteKioskPricing = async (ctx) => {
    const kioskFound = await kiosk.findOne({
        where: {
            id: ctx.params.kioskId
        }
    })
    if (!kioskFound) {
        ctx.throw(404, 'Kiosk not found')
    }
    const pricingModel = await pricing.findOne({
        where: {
            id: ctx.params.pmId
        }
    })
    if (!pricingModel) {
        ctx.throw(404, 'Pricing Model not found')
    }
    kioskFound.setPricing(null)
    ctx.response.body = kioskFound
}

const getKioskPricing = async (ctx) => {
    const kioskFound = await kiosk.findOne({
        where: {
            id: ctx.params.kioskId
        },
        include: { model: pricing, include: { model: price, as: 'prices' } }
    })
    if (!kioskFound) {
        ctx.throw(404, 'Kiosk not found')
    }
    if (!kioskFound.pricing) {
        ctx.response.body = { default_pricing }
    }
    else {
        ctx.response.body = kioskFound.pricing
    }
}

module.exports = {
    createNewKiosk,
    deleteKiosk,
    updateKioskPricing,
    deleteKioskPricing,
    getKioskPricing
}