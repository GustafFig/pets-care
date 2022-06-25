
export default class PetshopService {
  constructor({ models, config }) {
    this.models = models;
    this.config = config;
  }

  #validate() {
    
  }

  async get() {
    return this.models.Petshop.findAll();
  }
  
  async getById({ id }) {
    return this.models.Petshop.findByPk({ id });
  }

  async create({ id, name, cnpj }) {
    this.#validate({ id, name, cnpj })
    return this.models.Petshop.findByPk({ id, name, cnpj });
  }

  async delete({ id }) {
    return this.models.Petshop.delete(id);
  }
  
  async update() {
    return this.models.Petshop.findByPk();
  }

}
