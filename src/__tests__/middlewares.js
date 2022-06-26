import Boom from 'boom';
import * as middlewares from '../middlewares.js';

describe('Middleware Error', () => {
  test('should receive genereic erros', async () => {
    const err = new Error('dumb message');
    const req = {};
    const json = jest.fn();
    const res = {
      status: jest.fn(() => ({ json })),
    };

    middlewares.error(err, req, res, jest.fn());

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

    middlewares.error(err, req, res, jest.fn());

    // expect(res.status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({ message: err.message });
  });
});
