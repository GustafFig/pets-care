
export default class PetshopService {
  constructor({ models, config }) {
    this.models = models;
    this.config = config;
  }

  #validate({ name, cnpj }) {
    // if (!name) throw new Error('name is required')
  }

  async get() {
    
    // return this.models.Petshop.findAll();
    return []
  }
  
  async getById({ id }) {
    return this.models.Petshop.findByPk({ id });
  }

  async create({ name, cnpj }) {
    this.#validate({ name, cnpj })
    return this.models.petshops.create({ data: { name, cnpj } });
  }

  async delete({ id }) {
    return this.models.Petshop.delete(id);
  }
  
  async update() {
    return this.models.Petshop.findByPk();
  }

}
