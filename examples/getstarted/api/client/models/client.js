'use strict';

/**
 * Lifecycle callbacks for the `Review` model.
 */

module.exports = {
  lifecycles: {
    afterFind(result) {
      result = result.map(strapi.services.client.setFullName);
    },
    afterFindOne(result) {
      strapi.services.client.setFullName(result);
    },
  },
};
