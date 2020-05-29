'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  setFullName(data) {
    const { first_name, last_name } = data;
    data.full_name = [first_name, last_name].filter(Boolean).join(' ');

    return data;
  },
};
