import express from 'express';
import routes from './rest/index.js';


export async function createApp(config = {}) {
  const { PORT = 8000 } = config;
  const app = express();

  const addRestRoute = (route) => {
    const router = express.Router();
    route({ config, router, app });
    app.use(router);
  };

  await Promise.all(routes.map(addRestRoute));
  app.start = () => app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`))
  return app;
}
