import supertest from 'supertest';
import { createApp } from '../../src/app.js';
import prisma from '../../src/models/index.js';

let requestWithSupertest = null;
describe('/petshops endpoint', () => {
  let petshopId = null;

  beforeEach(async () => {
    const app = await createApp();
    requestWithSupertest = supertest(app);
  });

  afterAll(async () => {
    await prisma.$transaction([
      prisma.petshops.deleteMany(),
    ]);
    await prisma.$disconnect();
  });

  test('POST /petshops should create an petshops', async () => {
    expect(requestWithSupertest).not.toBe(null);
    const res = await requestWithSupertest.post('/petshops')
      .send({ name: 'Petshop1', cnpj: '123.123.123/0001-1' })
      .expect(201);

    const data = { cnpj: '123.123.123/0001-1', name: 'Petshop1' };
    expect(res.body.data).toMatchObject(data);
    petshopId = res.body.data.id;
    expect(await prisma.petshops.findUnique({ where: { id: petshopId } })).toMatchObject(data);
  });

  test('GET /petshops should show all petshops', async () => {
    const res = await requestWithSupertest.get('/petshops').expect(200);
    expect(res.body).toMatchObject([
      { cnpj: '123.123.123/0001-1', name: 'Petshop1', id: petshopId },
    ]);
  });

  test('PUT /petshops should change its name or cnpj', async () => {
    const newData = { name: 'PetshopModified', cnpj: '999.999.999/0001-1' };
    const res = await requestWithSupertest.put(`/petshops/${petshopId}`).send(newData);
    expect(res.body.data).toMatchObject(newData);
  });

  test('DELETE /petshops should show all petshops', async () => {
    const res = await requestWithSupertest.get('/petshops').expect(200);
    expect(res.body.data).toMatchObject([
      { cnpj: '123.123.123/0001-1', name: 'Petshop1' },
    ]);
  });
});
