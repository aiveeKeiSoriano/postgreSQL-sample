const env = require('dotenv') 
env.config()

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const pricingModelsRouter = require('./routes/pricing-models')
const kiosksRouter = require('./routes/kiosks')

const sequelize = require('./db');

const app = new Koa()
const PORT = process.env.PORT || 1337

try {
    sequelize.authenticate()
        .then(() => console.log('Connection has been established successfully.'))
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// sequelize.sync({ force: true })

app.use(bodyParser(
    {
        detectJSON: function (ctx) {
            return /\.json$/i.test(ctx.path);
        }
    }))

app
    .use(pricingModelsRouter.routes())
    .use(kiosksRouter.routes())
    .on('error', (err, ctx) => {
        ctx.response.body = err
    });

if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () =>
        console.log(`Server listening on port ${PORT}`)
    )
}

module.exports = app