class Repository {
  constructor(query, eventHub) {
    this.query = query;
    this.eventHub = eventHub;
  }

  async find(...args) {
    this.eventHub.emit('beforeFind');
    const result = this.query.find(...args);
    this.eventHub.emit('afterFind');

    return result;
  }

  async findOne(...args) {
    this.eventHub.emit('beforefindOne');
    const result = this.query.findOne(...args);
    this.eventHub.emit('afterFindOne');

    return result;
  }

  async create(...args) {
    this.eventHub.emit('beforeCreate');
    const result = this.query.create(...args);
    this.eventHub.emit('afterCreate');

    return result;
  }

  async update(...args) {
    this.eventHub.emit('beforeUpdate');
    const result = this.query.update(...args);
    this.eventHub.emit('afterUpdate');

    return result;
  }

  async delete(...args) {
    this.eventHub.emit('beforeDelete');
    const result = this.query.delete(...args);
    this.eventHub.emit('afterDelete');

    return result;
  }

  async count(...args) {
    this.query.count(...args);
  }

  async search(...args) {
    this.query.search(...args);
  }

  async countSearch(...args) {
    this.query.countSearch(...args);
  }
}

module.exports = function createRepository({ query, eventHub }) {
  return new Repository(query, eventHub);
};
