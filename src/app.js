import express from 'express';
// import { routes } from './rest/index.js';
import fs from 'fs';

export async function createApp(config = {}) {
  const { PORT = 8000 } = config;
  const app = express();

  const addRestRoute = async ({ default: route }) => {
    const router = express.Router();
    await route({ config, router, app });
    app.use(router);
  };

  const routes = fs
    .readdirSync(`./src/rest/`)
    .filter(file => (file.slice(-3) === '.js'))
    .map((file) => import(`./rest/${file}`).then(addRestRoute));

  await Promise.all(routes);
  app.listen(PORT, () => console.log(`Server up in port ${PORT}`));
  return app;
}
