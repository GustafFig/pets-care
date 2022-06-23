import rescue from 'express-rescue';


export default ({ router }) => {
  // with ids
  router.get('/petshops', rescue(async (req, res, next) => {
    return res
      .status(200)
      .json()
  }));

  // dinamics
  router.get('/petshops/:id', (async (req, res, next) => {
    const id = req.params.id;
    return res
      .status()
      .json()
  }));
};
