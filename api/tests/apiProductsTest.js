const request = require('supertest');
const api = require('../src/index');

/**
 * Test para endpoint get  /api/products
 */
it('testing get method /api/products/ endpoint', done => {
    request(api).get('/api/products/').set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
})

/**
 * Test para endpoint get  /api/products/:productId"
 */
it('testing get method /api/products/:productId endpoint', done => {
    request(api).get('/api/products/1').set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
})

/**
 * Test para endpoint get  /api/products//qty/8"
 */
it('testing get method /api/products/qty/:number endpoint', done => {
    request(api).get('/api/products/qty/8').set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
})

/**
 * Test para endpoint get  /api/products/qty/S manejo de errores "
 */
it('testing get method /api/products/qty/ endpoint manejo de errores', done => {
    request(api).get('/api/products/qty/S').set('Accept', 'application/json')
    .expect('Content-Type', "text/html; charset=utf-8")
    .expect(400, done);
})

/**
 * Test para endpoint get  /api/products//search/paginate/:search endpoint"
 */
it('testing get method /api/products/search/paginate/:search endpoint', done => {
    request(api).get('/api/products/search/bebida').set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
})


/**
 * Test para endpoint get  /api/products/search/paginate/:search endpoint
 */
it('testing get method /api/products/search/paginate/:search endpoint', done => {
    request(api).get('/api/products/search/paginate/pisco?page=2&size=8').set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
})

// manejo de errores
it('testing get method /api/products/search/paginate/:search endpoint manejo de errores', done => {
    request(api).get('/api/products/search/paginate/pisco?page=S&size=8').set('Accept', 'application/json')
    .expect('Content-Type', "text/html; charset=utf-8")
    .expect(400, done);
})

// manejo de errores
it('testing get method /api/products/search/paginate/:search endpoint manejo de errores', done => {
    request(api).get('/api/products/search/paginate/pisco?page=1&size=S').set('Accept', 'application/json')
    .expect('Content-Type', "text/html; charset=utf-8")
    .expect(400, done);
})
