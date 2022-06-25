import express from 'express';
import routes from './rest/index.js';
import * as rawServices from './services/index.js';
const models = {};
const middlewares = { auth: (_req, _res, next) => { req.user.petshopId = 1; next() } };

export async function createApp(config = {}) {
  const { PORT = 8000 } = config;
  const app = express();

  const services = Object.freeze(
    Object.entries(rawServices)
      .reduce((acc, [key, Class]) => ({
        ...acc,
        [key]: Object.freeze(new Class({ models, config })),
      }), {}),
  );

  const pathsSet = new Set()
  const addRestRoute = (route) => {
    const router = express.Router();
    const path = route({ config, router, services, middlewares });
    if (!path) {
      throw new Error(`Missing path for ${route.name}`)
    }
    if (pathsSet.has(path)) {
      throw new Error(`Path is ${path} is duplicated`)
    } else {
      pathsSet.add(path)
    }
    app.use(path, router);
  };

  await Promise.all(routes.map(addRestRoute));
  app.start = () => app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`))
  return app;
}
