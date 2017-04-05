const i = require('i');
const inflector = i();
const mapValues = require('lodash.mapvalues');

module.exports = class JsonDataSerializer {
  getAttributes(data) {
    const result = Object.assign({}, data.toJSON ? data.toJSON() : data);

    delete result.id;

    return result;
  }

  get relationshipUrls() {
    return {};
  }

  get type() {
    return inflector.dasherize(
              inflector.underscore(
                inflector.pluralize(this.constructor.name)));
  }

  getRelationships(id) {
    return mapValues(this.relationshipUrls, e => ({
      links: {
        related: e.replace(':id', id),
      },
    }));
  }

  serialize(data) {
    return {
      type: this.type,
      id: data.id,
      attributes: this.getAttributes(data),
      relationships: this.getRelationships(data.id),
    };
  }
};
