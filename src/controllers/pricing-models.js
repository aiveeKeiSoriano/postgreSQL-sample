const Joi = require('joi');
const { default_pricing } = require('../../prices.json');

const { models } = require('../db');
const { pricing, price } = models;

const getPricingsList = async (ctx) => {
    const model = pricing;
    const pricingModels = await model.findAll({ include: { model: price, as: 'prices' } });
    pricingModels.unshift({ default_pricing });
    ctx.response.body = pricingModels;
};

const createNewPricing = async (ctx) => {

    const schema = Joi.object().keys({
        id: Joi.string().uuid(),
        name: Joi.string().required()
    });

    const result = schema.validate(ctx.request.body);

    if (result.error) {
        ctx.throw(400, 'Invalid request');
    }

    const model = pricing;
    const newModel = await model.create(ctx.request.body);
    ctx.response.body = newModel.id;
};


const getPricing = async (ctx) => {
    const model = pricing;
    const pricingModel = await model.findOne({
        where: {
            id: ctx.params.pmId
        },
        include: { model: price, as: 'prices' }
    });
    if (!pricingModel) {
        ctx.throw(404, 'Pricing Model not found');
    }
    ctx.response.body = pricingModel;
};

const updatePricing = async (ctx) => {
    const model = pricing;

    const schema = Joi.object().keys({
        name: Joi.string().required()
    });

    const result = schema.validate(ctx.request.body);

    if (result.error) {
        ctx.throw(400, 'Invalid request');
    }

    const pricingModel = await model.findOne({
        where: {
            id: ctx.params.pmId
        }
    });

    if (!pricingModel) {
        ctx.throw(404, 'Pricing Model not found');
    }
    pricingModel.set(ctx.request.body);
    await pricingModel.save();
    ctx.response.body = pricingModel;
};

const deletePricing = async (ctx) => {
    await pricing.destroy({
        where: {
            id: ctx.params.pmId
        }
    })
    ctx.body = "deleted successfully"
}

const getPrices = async (ctx) => {
    const model = pricing;
    const pricingModelFound = await model.findOne({
        where: {
            id: ctx.params.pmId
        },
        include: { model: price, as: 'prices' }
    });
    if (!pricingModelFound) {
        ctx.throw(404, 'Pricing Model not found');
    }
    ctx.response.body = pricingModelFound.prices;
};

const addPrice = async (ctx) => {

    const schema = Joi.object().keys({
        id: Joi.string().uuid(),
        price: Joi.number().required(),
        name: Joi.string().required(),
        value: Joi.number().required()
    });

    const result = schema.validate(ctx.request.body);

    if (result.error) {
        ctx.throw(400, 'Invalid request');
    }

    const model = pricing;
    const pricingModel = await model.findOne({
        where: {
            id: ctx.params.pmId
        },
        include: { model: price, as: 'prices' }
    });
    if (!pricingModel) {
        ctx.throw(404, 'Pricing Model not found');
    }

    let where;
    if (ctx.request.body.id) {
        where = {
            id: ctx.request.body.id,
            name: ctx.request.body.name,
            price: ctx.request.body.price,
            value: ctx.request.body.value,
            pricingId: pricingModel.id
        };
    } else {
        where = {
            name: ctx.request.body.name,
            price: ctx.request.body.price,
            value: ctx.request.body.value,
            pricingId: pricingModel.id
        };
    }

    const priceFound = await price.findOrCreate({
        where
    });

    ctx.response.body = [priceFound[0]];
};

const deletePrice = async (ctx) => {
    const model = pricing;
    const pricingModel = await model.findOne({
        where: {
            id: ctx.params.pmId
        },
        include: { model: price, as: 'prices' }
    });
    if (!pricingModel) {
        ctx.throw(404, 'Pricing Model not found');
    }
    const priceFound = await price.destroy({
        where: {
            id: ctx.params.priceId
        }
    });
    if (!priceFound) {
        ctx.throw(404, 'price not found');
    }
    ctx.response.body = "Deleted successfully";
};

module.exports = {
    getPricingsList,
    createNewPricing,
    getPricing,
    deletePricing,
    updatePricing,
    getPrices,
    addPrice,
    deletePrice,
}