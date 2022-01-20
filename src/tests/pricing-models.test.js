const app = require('../index')
const supertest = require('supertest')

let server = {}
let request = {}

beforeAll(async () => {
    server = app.callback(1337)
});


describe('Testing Pricing Model routes', () => {

    beforeEach(async () => {
        request = supertest(server)
    })

    test('first GET request to /pricing-models', async () => {
        const res = await request.get('/pricing-models')
        let pricingModels = res.body
        expect(Array.isArray(pricingModels)).toBe(true)
        expect(res.statusCode).toBe(200)
    })

    test('first POST request to /pricing-models', async () => {
        const res = await request.post('/pricing-models').send({
            id: '3ba92095-3203-4888-a464-3c7d5d9acd7e',
            name: 'Special Sale Option'
        })
        expect(res.statusCode).toBe(200)
        expect(res.text).toBe('3ba92095-3203-4888-a464-3c7d5d9acd7e')
    })

    test('GET request to /pricing-models/:pm-id', async () => {
        const res = await request.get('/pricing-models/3ba92095-3203-4888-a464-3c7d5d9acd7e')
        const pricingModel = res.body
        expect(res.statusCode).toBe(200)
        expect(pricingModel.name).toBe('Special Sale Option')
    })

    test('GET request to invalid pricing model ID /pricing-models/:pm-id', async () => {
        const res = await request.get('/pricing-models/3ba92095-3203-4888-a464-3c7d5d9acd8f')
        expect(res.statusCode).toBe(404)
    })

    test('PUT request to /pricing-models/:pm-id', async () => {
        const res = await request.put('/pricing-models/3ba92095-3203-4888-a464-3c7d5d9acd7e').send({
            name: 'New Special Sale Option'
        })
        let pricingModel = res.body
        expect(pricingModel.name).toBe('New Special Sale Option')
        expect(res.statusCode).toBe(200)
    })

    test('PUT request to invalid pricing model ID /pricing-models/:pm-id', async () => {
        const res = await request.put('/pricing-models/3ba92095-3203-4888-a464-3c7d5d9acd8f').send({
            name: 'New Special Sale Option'
        })
        expect(res.statusCode).toBe(404)
    })

    test('GET request to /pricing-models/:pm-id/prices', async () => {
        const res = await request.get('/pricing-models/3ba92095-3203-4888-a464-3c7d5d9acd7e/prices')
        let prices = res.body
        expect(prices.length).toBe(0)
        expect(res.statusCode).toBe(200)
    })

    test('GET request to invalid pricing model ID /pricing-models/:pm-id/prices', async () => {
        const res = await request.get('/pricing-models/3ba92095-3203-4888-a464-3c7d5d9acd8f/prices')
        expect(res.statusCode).toBe(404)
    })

    test('POST request to /pricing-models/:pm-id/prices', async () => {
        const res = await request.post('/pricing-models/3ba92095-3203-4888-a464-3c7d5d9acd7e/prices').send({
            id: '9a5c6f19-4a4c-43d9-9024-583000b8bf21',
            price: 3,
            name: '10 minutes',
            value: 10
        })
        expect(res.statusCode).toBe(200)
    })

    test('POST request to invalid pricing model id /pricing-models/:pm-id/prices', async () => {
        const res = await request.post('/pricing-models/3ba92095-3203-4888-a464-3c7d5d9acd8f/prices').send({
            price: 3,
            name: '10 minutes',
            value: 10
        })
        expect(res.statusCode).toBe(404)
    })

    test('DELETE request to /pricing-models/:pm-id/prices/:price-id', async () => {
        const res = await request.delete(`/pricing-models/3ba92095-3203-4888-a464-3c7d5d9acd7e/prices/9a5c6f19-4a4c-43d9-9024-583000b8bf21`)
        expect(res.statusCode).toBe(200)
    })

    test('DELETE request to invalid pricing model id /pricing-models/:pm-id/prices/:price-id', async () => {
        const res = await request.delete(`/pricing-models/3ba92095-3203-4888-a464-3c7d5d9acd8f/prices/9a5c6f19-4a4c-43d9-9024-583000b8bf21`)
        expect(res.statusCode).toBe(404)
    })

    test('DELETE request to invalid price id /pricing-models/:pm-id/prices/:price-id', async () => {
        const res = await request.delete(`/pricing-models/3ba92095-3203-4888-a464-3c7d5d9acd7e/prices/9a5c6f19-4a4c-43d9-9024-583000b8bf21`)
        expect(res.statusCode).toBe(404)
    })

    test('Second GET request to /pricing-models/:pm-id/prices', async () => {
        const res = await request.get('/pricing-models/3ba92095-3203-4888-a464-3c7d5d9acd7e/prices')
        let prices = res.body
        expect(prices.length).toBe(0)
        expect(res.statusCode).toBe(200)
    })

    test('DELETE sample data', async () => {
        const res = await request.delete('/pricing-models/3ba92095-3203-4888-a464-3c7d5d9acd7e')
        expect(res.statusCode).toBe(200)
    })

})