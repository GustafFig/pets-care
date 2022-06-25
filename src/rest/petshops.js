import Boom from 'boom';
import rescue from 'express-rescue';


export default function createRouter({ router, services, middlewares }) {
  const service = services.PetshopService;
  const authMidleware = middlewares.auth;

  if (!service) throw Error(`Service not found [${Object.keys(services)}]`);
  if (!authMidleware) throw Error('authMidleware not founded');

  router.use(authMidleware);
  router.get('/',  rescue(async (req, res) => {
    const data = await service.get({ ...req.params, petshopId: req.user.petshopId });
    res.status(200).json(data);
  }));
  router.get('/:id', rescue(async (req, res) => {
    const response = await service.get(req.params.id)
      .catch(err => next(err));
    if (response) res.status(200).json(response);
  }));
  router.post('/:id', rescue(async (req, res) => {
    const response = await service.post(req.params);
    if (response) res.status(200).json(response);
  }));
  router.delete('/:id', rescue(async (req, res) => {
    if (!req.params.id) next(Boom.badData(`id required for take ${req.path}`));
    const response = await service.delete(req.params);
    res.status(200).json(response);
  }));
  router.put('/:id', rescue(async (req, res) => {
    if (!req.params.id) next(Boom.badData(`id required for take ${req.path}`));
    const response = await service.update(req.params, );
    res.status(200).json(response);
  }));
  return '/petshops';
}
