import Boom from 'boom';

export function error(err, _req, res, _next) {
  if (Boom.isBoom(err)) {
    console.error(err);
    return res.status(err.code).json(err);
  }

  res.status(500).json({ message: err.message });
}

export function auth(req, _res, next) {
  req.user = { petshopId: 1 };
  next();
}
