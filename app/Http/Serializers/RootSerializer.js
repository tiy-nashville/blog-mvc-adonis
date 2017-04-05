const _ = require('lodash');

module.exports = class RootSerializer {

  makeRoot(self) {
    return  {
      links: {
        self,
      },
    };
  }

  serializeOne(resourceUrl, data, serializer) {
    const result = this.makeRoot(resourceUrl);
    result.data = serializer.serialize(data);

    return result;
  }

  serializeMany(resourceUrl, data, serializer) {
    const result = this.makeRoot(resourceUrl);
    result.data = _(data).map(e => serializer.serialize(e)).value();

    return result;
  }
};
