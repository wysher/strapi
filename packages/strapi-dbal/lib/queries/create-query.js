'use strict';

module.exports = function createQuery({ connectorQuery, model }) {
  return new Query(connectorQuery, model);
};

class Query {
  constructor(connectorQuery, model) {
    this.connectorQuery = connectorQuery;
    this.model = model;
  }

  get orm() {
    return this.model.orm;
  }

  get primaryKey() {
    return this.model.primaryKey;
  }

  get associations() {
    return this.model.associations;
  }

  /**
   * Run custom database logic
   */
  custom(mapping) {
    if (typeof mapping === 'function') {
      return mapping.bind(this, { model: this.model });
    }

    if (!mapping[this.orm]) {
      throw new Error(`Missing mapping for orm ${this.orm}`);
    }

    if (typeof mapping[this.orm] !== 'function') {
      throw new Error(
        `Custom queries must be functions received ${typeof mapping[this.orm]}`
      );
    }

    return mapping[this.model.orm].call(this, { model: this.model });
  }

  async find(...args) {
    const result = this.connectorQuery.find(...args);

    return result;
  }

  async findOne(...args) {
    const result = this.connectorQuery.findOne(...args);

    return result;
  }

  async create(...args) {
    const result = this.connectorQuery.create(...args);

    return result;
  }

  async update(...args) {
    const result = this.connectorQuery.update(...args);

    return result;
  }

  async delete(...args) {
    const result = this.connectorQuery.delete(...args);

    return result;
  }

  async count(...args) {
    return this.connectorQuery.count(...args);
  }

  async search(...args) {
    return this.connectorQuery.search(...args);
  }

  async countSearch(...args) {
    return this.connectorQuery.countSearch(...args);
  }
}
