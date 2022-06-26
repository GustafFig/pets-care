import Boom from 'boom';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import Middlewares from '../middlewares.js';

const defaultConfig = {
  JWT_SECRET: 'batata',
  NODE_ENV: 'tests',
};

describe('Middleware Error', () => {
  test('should receive genereic erros', async () => {
    const err = new Error('dumb message');
    const req = {};
    const json = jest.fn();
    const res = {
      status: jest.fn(() => ({ json })),
    };

    Middlewares({ config: defaultConfig })
      .error(err, req, res, jest.fn());

    expect(json).toHaveBeenCalledWith({ message: err.message });
    expect(res.status).toHaveBeenCalledWith(500);
  });

  test('should receive boom error representing http', async () => {
    const err = Boom.notFound('dumb message');
    const req = {};
    const json = jest.fn();
    const res = {
      status: jest.fn(() => ({ json })),
    };

    Middlewares({ config: defaultConfig })
      .error(err, req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({ message: err.message });
  });
});

describe('auth midleware', () => {
  test('should throw on a valid token', async () => {
    const user = {
      petshopId: 1256,
      name: 'Usuário1',
      email: 'user@gmail.com',
      petshop: {
        id: 1256,
        cnpj: '123.456.789/0001-1',
        name: 'Petshop1',
      },
    };
    const token = jwt.sign(user, defaultConfig.JWT_SECRET, { algorithm: 'HS256' });
    const req = { headers: { authorization: token } };
    const json = jest.fn();
    const res = {
      status: jest.fn().mockReturnValue({ json }),
    };
    const next = jest.fn();
    await Middlewares({ config: defaultConfig })
      .auth(req, res, next);
    const { iat, ...reqUser } = req.user;
    expect(reqUser).toEqual(user);
    expect(next).toHaveBeenCalledWith();
  });

  test('should throw on a invalid token', async () => {
    const user = {
      petshopId: 1256,
      name: 'Usuário1',
      email: 'user@gmail.com',
      petshop: {
        id: 1256,
        cnpj: '123.456.789/0001-1',
        name: 'Petshop1',
      },
    };
    const token = 'token';
    const req = { headers: { authorization: token } };
    const json = jest.fn();
    const res = {
      status: jest.fn().mockReturnValue({ json }),
    };
    const next = jest.fn();
    await Middlewares({ config: defaultConfig })
      .auth(req, res, next);
    expect(next).toHaveBeenCalledWith(Boom.unauthorized('Invalid token'));
  });

  test.todo('auth token expiress should throws an error');
});
