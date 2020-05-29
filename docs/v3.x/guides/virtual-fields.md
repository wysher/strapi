# Virtual Fields

In this guide we will see how you can add Virtual Fields.
Virtual Fields can be used to return computed or formatted values.

## Adding new Content Type

For this example we will create new **Cient** Content Type with three `string` attributes:

- `first_name`
- `last_name`
- `full_name` (our virtual field)

At the end we will have **Client** Content type with theese settings:

`/api/client/services/client.settings.json`

```json
{
  "kind": "collectionType",
  "collectionName": "clients",
  "info": {
    "name": "client",
    "description": ""
  },
  "options": {
    "increments": true,
    "timestamps": ["created_at", "updated_at"],
    "comment": ""
  },
  "attributes": {
    "first_name": {
      "type": "string"
    },
    "last_name": {
      "type": "string"
    },
    "full_name": {
      "type": "string"
    }
  }
}
```

::: tip
Because Virtual Fields should be read-only it's good idea to disable virtual field from editing. Just set `Editable field` to false in `Configure the view`.
:::

## Adding logic for compute data

Now we will use `afterFind` and `afterFindOne` lifecycle methods to compute `full_name` with `first_name` and `last_name`.

1. Let's create `setFullName` service method:

`/api/client/services/client.js`

```js
module.exports = {
  setFullName(data) {
    const { first_name, last_name } = data;
    data.full_name = [first_name, last_name].filter(Boolean).join(' ');

    // we need to return data, because we will update array of entities with map
    return data;
  },
};
```

2. Last step is to **add lifecycle methods**

`/api/client/models/client.js`

```js
module.exports = {
  lifecycles: {
    afterFind(result) {
      // update array of results
      result = result.map(strapi.services.client.setFullName);
    },
    afterFindOne(result) {
      // update one item
      strapi.services.client.setFullName(result);
    },
  },
};
```

::: warning
In this example we edit returned data, but data will never be saved in your database. If you want to save data, you shouldn't have Virtual Fields and use beforeCreate/beforeUpdate methods instead.
:::

## Use data from Virtual Field

Now everytime you will fetch `client` data using service, controller or browsing content-manager `full_name` will be computed.

## Final thoughts

Because Virtual Fields updates returned data it will never be out of date, which means that you can compute values based on relation fields. This will not be possible with beforeCreate/beforeUpdate lifecycles, because update on relation Content Type will not trigger lifecycle methods for related Content Types.
