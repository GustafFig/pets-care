import Boom from 'boom';

// eslint-disable-next-line no-unused-vars
export function error(err, _req, res, _next) {
  if (Boom.isBoom(err)) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(err.code).json(err);
  } else {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

export function auth(req, _res, next) {
  req.user = { petshopId: 1 };
  next();
}
