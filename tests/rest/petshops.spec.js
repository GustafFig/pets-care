import { createApp } from '../../src/app.js';
import supertest from 'supertest';

let requestWithSupertest = null;
describe('/petshops endpoint', () => {
  beforeEach((done) => {
    createApp().then((app) => {
      requestWithSupertest = supertest(app);
      done();
    });
  });

  test('GET /petshops should show all petshops', async () => {
    expect(requestWithSupertest).not.toBe(null);
    const res = await requestWithSupertest.get('/petshops');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('users')
  });
});
