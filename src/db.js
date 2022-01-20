const { DataTypes, Sequelize } = require('sequelize');
const config = require('./config/database.js');

const sequelize = new Sequelize(
    config
);

const modelDefiners = [
    require('./models/prices'),
    require('./models/kiosks'),
    require('./models/pricing-models')
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}
const { price, pricing, kiosk } = sequelize.models;

price.belongsTo(pricing);

pricing.hasMany(price, { as: 'prices' });

pricing.hasOne(kiosk, {
    foreignKey: {
        type: DataTypes.UUID
    },
    constraints: false
});

kiosk.belongsTo(pricing);

// sequelize.sync({alter: true});

module.exports = sequelize;