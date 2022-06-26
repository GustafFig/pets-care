export default class PetshopService {
  constructor({ models, config }) {
    this.models = models;
    this.config = config;
  }

  static #validate({ name, cnpj }) {
    if (!name) throw new Error('name is required');
    if (!cnpj) throw new Error('cn is required');
  }

  async get() {
    return this.models.petshops.findAll();
  }

  async getById({ id }) {
    return this.models.Petshop.findByPk({ id });
  }

  async create({ name, cnpj }) {
    this.#validate({ name, cnpj });
    return this.models.petshops.create({ data: { name, cnpj } });
  }

  async delete({ id }) {
    return this.models.Petshop.delete(id);
  }

  async update() {
    return this.models.Petshop.findByPk();
  }
}
