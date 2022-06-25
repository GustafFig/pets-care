import Boom from "boom";
import rescue from "express-rescue";

export function defaultAuthCrud(path, names, httpMethods) {
  const createRouter = ({ router, services, middlewares }) => {
    const service = services[names.service];
    const authMidleware = middlewares['auth'];

    if (!service) throw Error('Service not found');
    if (!authMidleware) throw Error('authMidleware not founded');

    // console.count('deaultAuthCrud')
    router.use(authMidleware);
    if (httpMethods.get) {
      router.get(path, rescue(async (req, res) => {
        const userPetshop = req.user.petshop;
        const response = await service.get(userPetshop, req.params);
        res.status(200).json(response);
      }));
    }
    if (httpMethods.getById) {
      router.get(`${path}/:id`, rescue(async (req, res) => {
        const response = await service.get(req.params.id)
          .catch(err => next(err));
        if (response) res.status(200).json(response);
      }));
    }
    if (httpMethods.post) {
      router.post(`${path}/:id`, rescue(async (req, res) => {
        const response = await service.post(req.params);
        if (response) res.status(200).json(response);
      }));
    }
    if (httpMethods.delete) {
      router.delete(`${path}/:id`, rescue(async (req, res) => {
        if (!req.params.id) next(Boom.badData(`id required for take ${req.path}`));
        const response = await service.delete(req.params);
        res.status(200).json(response);
      }));
    }
    if (httpMethods.put) {
      router.put(`${path}/:id`, rescue(async (req, res) => {
        if (!req.params.id) next(Boom.badData(`id required for take ${req.path}`));

        const response = await service.update(req.params, );
        res.status(200).json(response);
      }));
    }
  };
}
