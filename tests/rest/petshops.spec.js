import { createApp } from '../../src/app.js';
import supertest from 'supertest';
import models from '../../src/models/index.js';

let requestWithSupertest = null;
describe('/petshops endpoint', () => {
  beforeEach((done) => {
    createApp().then((app) => {;
      requestWithSupertest = supertest(app);
      done();
    }).catch(err => done(err));
  });

  test('POST /petshops should create an petshops', async () => {
    expect(requestWithSupertest).not.toBe(null);
    const res = await requestWithSupertest.post('/petshops')
      .send({ name: 'Petshop1', cnpj: '123.123.123/0001-1' })
      .expect(201);

    const data = { "cnpj": "123.123.123/0001-1", "id": 1, "name": "Petshop1" };
    expect(res.body).toEqual({ data });
    expect(models.petshops.findUnique(1)).toEqual(data)
  });

  test('GET /petshops should show all petshops', async () => {
    expect(requestWithSupertest).not.toBe(null);
    const res = await requestWithSupertest.get('/petshops');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('data')
  });
});
