import Boom from 'boom';
import jwt from 'jsonwebtoken';

export default function Middleware({ config }) {
  return {

    // eslint-disable-next-line no-unused-vars
    error: (err, _req, res, _next) => {
      // eslint-disable-next-line no-console
      if (config.NODE_ENV === 'development') console.error(err);

      if (Boom.isBoom(err)) {
        res.status(err.output.statusCode).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    },

    auth: async (req, res, next) => {
      try {
        const user = jwt.verify(req.headers?.authorization, config.JWT_SECRET, { expiresIn: '1h' });
        req.user = user;
        next();
      } catch (err) {
        next(Boom.unauthorized('Invalid token'));
      }
    },

  };
}
