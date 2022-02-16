const request = require("supertest");
const api = require("../src/index");

/**
 * Test para endpoint get  /api/category/ endpoint
 */
it("testing get method /api/category/ endpoint", (done) => {
  request(api)
    .get("/api/category/")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200, done);
});
