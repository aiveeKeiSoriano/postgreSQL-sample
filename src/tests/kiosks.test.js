const app = require('../index');
const supertest = require('supertest');

let server = {};
let request = {};

beforeAll(async () => {
    server = app.callback(1337);
});

describe('Testing Kiosk routes', () => {

    beforeEach(async () => {
        request = supertest(server);
    });

    test('Setup sample data', async () => {
        const res = await request.post('/kiosks').send({
            id: '57342663-909c-4adf-9829-6dd1a3aa9143',
            name: 'Tester Kiosk 001'
        });
        expect(res.text).toBe('57342663-909c-4adf-9829-6dd1a3aa9143');
        expect(res.statusCode).toBe(200);
    });

    test('GET request to /kiosks/:kiosk-id/prices', async () => {
        const res = await request.get('/kiosks/57342663-909c-4adf-9829-6dd1a3aa9143/prices');
        expect(res.statusCode).toBe(200);
    });

    test('GET request to invalid kiosk id /kiosks/:kiosk-id/prices', async () => {
        const res = await request.get('/kiosks/57342663-909c-4adf-9829-6dd1a3aa9154/prices');
        expect(res.statusCode).toBe(404);
    });

    test('PUT request to /kiosks/:kiosk-id/prices/:pm-id', async () => {
        await request.post('/pricing-models').send({
            id: '3ba92095-3203-4888-a464-3c7d5d9acd7e',
            name: 'Special Sale Option'

        });
        const res = await request.put('/kiosks/57342663-909c-4adf-9829-6dd1a3aa9143/prices/3ba92095-3203-4888-a464-3c7d5d9acd7e');
        const kiosk = res.body;
        expect(kiosk.pricingId).toBe('3ba92095-3203-4888-a464-3c7d5d9acd7e');
        expect(res.statusCode).toBe(200);
    });

    test('PUT request to invalid kiosk id /kiosks/:kiosk-id/prices/:pm-id', async () => {
        const res = await request.put('/kiosks/57342663-909c-4adf-9829-6dd1a3aa9154/prices/3ba92095-3203-4888-a464-3c7d5d9acd7e');
        expect(res.statusCode).toBe(404);
    });

    test('GET request to /kiosks/:kiosk-id/prices', async () => {
        const res = await request.get('/kiosks/57342663-909c-4adf-9829-6dd1a3aa9143/prices');
        const pricingModel = res.body;
        expect(pricingModel.id).toBe('3ba92095-3203-4888-a464-3c7d5d9acd7e')
        expect(res.statusCode).toBe(200);
    });

    test('DELETE request to /kiosks/:kiosk-id/prices/:pm-id', async () => {
        const res = await request.delete('/kiosks/57342663-909c-4adf-9829-6dd1a3aa9143/prices/3ba92095-3203-4888-a464-3c7d5d9acd7e');
        const kiosk = res.body;
        expect(kiosk.pricingId).toBe(null);
        expect(res.statusCode).toBe(200);
    });

    test('DELETE request to invalid kiosk id /kiosks/:kiosk-id/prices/:pm-id', async () => {
        const res = await request.delete('/kiosks/57342663-909c-4adf-9829-6dd1a3aa9154/prices/3ba92095-3203-4888-a464-3c7d5d9acd7e');
        expect(res.statusCode).toBe(404);
    });

    test('DELETE request to invalid pricing model id /kiosks/:kiosk-id/prices/:pm-id', async () => {
        const res = await request.delete('/kiosks/57342663-909c-4adf-9829-6dd1a3aa9143/prices/3ba92095-3203-4888-a464-3c7d5d9acd8f');
        expect(res.statusCode).toBe(404);
    });

    test('DELETE sample data', async () => {
        await request.delete('/kiosks/57342663-909c-4adf-9829-6dd1a3aa9143')
        const res = await request.delete('/pricing-models/3ba92095-3203-4888-a464-3c7d5d9acd7e')
        expect(res.statusCode).toBe(200)
    })
});