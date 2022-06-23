import rescue from 'express-rescue';


export default ({ router }) => {
  // with ids
  router.get('/pets', rescue(async (req, res, next) => {
    return res
      .status()
      .json()
  }));

  // dinamics
  router.get('/pets/:id', (async (req, res, next) => {
    const id = req.params.id;
    return res
      .status()
      .json()
  }));
};
