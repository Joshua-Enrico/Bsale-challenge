const request = require('supertest');
const api = require('../src/index');


/**
 * Creamos data en la tabla category
 */
 it('testing get method /api/category/ endpoint', done => {
    request(api).post('/api/category/fake').set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
})

/**
 * Creamos data en la tabla product
 */
it('testing get method /api/products/ endpoint', done => {
    request(api).post('/api/products/fake').set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
})