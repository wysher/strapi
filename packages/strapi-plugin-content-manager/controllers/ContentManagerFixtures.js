const pluralize = require('pluralize');
const { upperFirst } = require('lodash');

module.exports = {
  getGeneralSettings: ctx => {
    const generalSettings = {
      bulkable: true,
      filters: true,
      pageSize: 20,
      search: true,
    };

    ctx.body = { generalSettings };
  },
  getGroups: ctx => {
    const groups = [
      {
        name: 'ingredient',
      },
      {
        name: 'car',
      },
    ];

    ctx.body = { groups };
  },

  getLayout: ctx => {
    const layouts = {
      article: {
        uid: 'article',
        schema: {
          connection: 'default',
          collectionName: 'articles',
          info: {
            name: 'article',
            description: '',
          },
          options: {
            increments: true,
            timestamps: ['created_at', 'updated_at'],
            comment: '',
          },
          attributes: {
            title: {
              type: 'string',
              required: true,
              minLength: 2,
            },
            content: {
              type: 'text',
            },
            published: {
              type: 'boolean',
            },
            value: {
              type: 'integer',
            },
            json: {
              type: 'json',
            },
            number: {
              type: 'integer',
            },
            date: {
              type: 'date',
            },
            enum: {
              type: 'enumeration',
              enum: ['morning,', 'noon'],
            },
            bool: {
              type: 'boolean',
            },
            pic: {
              model: 'file',
              via: 'related',
              plugin: 'upload',
            },
            pictures: {
              collection: 'file',
              via: 'related',
              plugin: 'upload',
            },
            mainTag: {
              type: 'relation',
              targetModel: 'tag',
              relationType: 'oneWay',
            },
            linkedTags: {
              targetModel: 'tag',
              relationType: 'manyWay',
              type: 'relation',
            },
            manyTags: {
              targetModel: 'tag',
              type: 'relation',
              relationType: 'manyToMany',
            },
            fb_cta: {
              required: true,
              type: 'group',
              group: 'cta_facebook',
              repeatable: false,
            },
            mainIngredient: {
              type: 'group',
              group: 'ingredients',
              repeatable: false,
            },
            ingredients: {
              type: 'group',
              group: 'ingredients',
              repeatable: true,
              min: 1,
              max: 10,
            },
          },
        },
        metadata: {
          id: {
            edit: {
              label: 'id',
              description: '....',
              editable: true,
              visible: false,
            },
            list: {
              label: 'Id',
              searchable: true,
              sortable: true,
            },
          },
          created_at: {
            edit: {
              label: 'Created At',
              description: '',
              editable: false,
              visible: false,
            },
            list: {
              label: 'Created At',
              searchable: true,
              sortable: true,
            },
          },
          updated_at: {
            edit: {
              label: 'Updated At',
              description: '',
              editable: false,
              visible: false,
            },
            list: {
              label: 'Updated At',
              searchable: true,
              sortable: true,
            },
          },
          title: {
            edit: {
              label: 'Title',
              description: '',
              editable: true,
              visible: true,
            },
            list: {
              label: 'Title',
              searchable: true,
              sortable: true,
            },
          },
          content: {
            edit: {
              label: 'Content',
              description: '',
              editable: true,
              visible: true,
            },
            list: {
              label: 'Content',
              searchable: true,
              sortable: true,
            },
          },
          published: {
            edit: {
              label: 'Published',
              description: '',
              editable: true,
              visible: true,
            },
            list: {
              label: 'Published',
              searchable: true,
              sortable: true,
            },
          },
          value: {
            edit: {
              label: 'Value',
              description: '',
              editable: true,
              visible: true,
            },
            list: {
              label: 'Value',
              searchable: true,
              sortable: true,
            },
          },
          json: {
            edit: {
              label: 'Json',
              description: '',
              editable: true,
              visible: true,
            },
            list: {},
          },
          number: {
            edit: {
              label: 'Number',
              description: '',
              editable: true,
              visible: true,
            },
            list: {
              label: 'Number',
              searchable: true,
              sortable: true,
            },
          },
          date: {
            edit: {
              label: 'Date',
              description: '',
              editable: true,
              visible: true,
            },
            list: {
              label: 'Date',
              searchable: true,
              sortable: true,
            },
          },
          enum: {
            edit: {
              label: 'Enum',
              description: '',
              editable: true,
              visible: true,
            },
            list: {
              label: 'Enum',
              searchable: true,
              sortable: true,
            },
          },
          bool: {
            edit: {
              label: 'Bool',
              description: '',
              editable: true,
              visible: true,
            },
            list: {
              label: 'Bool',
              searchable: true,
              sortable: true,
            },
          },
          pic: {
            edit: {
              label: 'Pic',
              description: '',
              editable: true,
              visible: true,
            },
            list: {},
          },
          pictures: {
            edit: {
              label: 'Pictures',
              description: '',
              editable: true,
              visible: true,
            },
            list: {},
          },
          mainTag: {
            edit: {
              label: 'Main Tag',
              description: '',
              editable: true,
              visible: true,
              mainField: 'name',
            },
            list: {},
          },
          linkedTags: {
            edit: {
              label: 'Linked Tags',
              description: '',
              editable: true,
              visible: true,
              mainField: 'name',
            },
            list: {},
          },
          manyTags: {
            edit: {
              label: 'Many Tags',
              description: '',
              editable: true,
              visible: true,
              mainField: 'name',
            },
            list: {},
          },
          fb_cta: {
            edit: {
              label: 'FB CTA',
              description: '',
              editable: true,
              visible: true,
            },
            list: {},
          },
          mainIngredient: {
            edit: {
              label: 'Main Ingredient',
              description: '',
              editable: true,
              visible: true,
            },
            list: {},
          },
          ingredients: {
            edit: {
              label: 'Ingredients',
              description: '',
              editable: true,
              visible: true,
            },
            list: {},
          },
        },
        layouts: {
          edit: [
            [
              {
                name: 'title',
                size: 6,
              },
              {
                name: 'content',
                size: 6,
              },
            ],
            [
              {
                name: 'value',
                size: 6,
              },
              {
                name: 'published',
                size: 4,
              },
            ],
            [
              {
                name: 'json',
                size: 12,
              },
            ],
            [
              {
                name: 'pic',
                size: 6,
              },
            ],
            [
              {
                name: 'pictures',
                size: 6,
              },
            ],
            [
              {
                name: 'number',
                size: 6,
              },
            ],
            [
              {
                name: 'fb_cta',
                size: 12,
              },
            ],
            [
              {
                name: 'mainIngredient',
                size: 12,
              },
            ],
            [
              {
                name: 'ingredients',
                size: 12,
              },
            ],
          ],
          editRelations: ['mainTag', 'linkedTags', 'manyTags'],
          list: ['id', 'title', 'published'],
        },
        settings: {
          mainField: 'id',
          defaultSortBy: 'id',
          defaultSortOrder: 'ASC',
          searchable: true,
          filterable: true,
          bulkable: true,
          pageSize: 10,
        },
      },
      cta_facebook: {
        schema: {
          name: 'CTA Facebook',
          connection: 'default',
          collectionName: 'cta_facebook_aa',
          attributes: {
            title: {
              type: 'string',
            },
            description: {
              type: 'text',
            },
          },
        },
        settings: {
          mainField: 'id',
          defaultSortBy: 'id',
          defaultSortOrder: 'ASC',
          searchable: true,
          filterable: true,
          bulkable: true,
          pageSize: 10,
        },
        metadata: {
          title: {
            edit: {
              label: 'Title',
              description: '....',
              editable: true,
              visible: true,
            },
            list: {
              label: 'Title',
              searchable: true,
              sortable: true,
            },
          },
          description: {
            edit: {
              label: 'Description',
              description: '....',
              editable: true,
              visible: true,
            },
            list: {
              label: 'Description',
              searchable: true,
              sortable: true,
            },
          },
        },
        layouts: {
          edit: [
            [{ name: 'title', size: 6 }],
            [{ name: 'description', size: 6 }],
          ],
        },
        uid: 'cta_facebook',
      },
      ingredients: {
        uid: 'ingredients',
        schema: {
          collectionName: 'group_ingredients',
          connection: 'default',
          attributes: {
            name: {
              type: 'string',
              required: true,
            },
            quantity: {
              type: 'float',
              required: true,
            },
            picture: {
              model: 'file',
              via: 'related',
              plugin: 'upload',
            },
            article: {
              targetModel: 'article',
              type: 'relation',
              relationType: 'oneToOne',
            },
          },
        },

        layouts: {
          edit: [
            [{ name: 'name', size: 6 }, { name: 'quantity', size: 6 }],
            [{ name: 'picture', size: 6 }, { name: 'article', size: 6 }],
          ],
          editRelations: [],
          list: [],
        },
        metadata: {
          name: {
            edit: {
              label: 'Name',
              description: '....',
              editable: true,
              visible: true,
            },
            list: {
              label: 'Name',
              searchable: true,
              sortable: true,
            },
          },
          quantity: {
            edit: {
              label: 'Quantity',
              description: '....',
              editable: true,
              visible: true,
            },
            list: {
              label: 'Quantity',
              searchable: true,
              sortable: true,
            },
          },
          picture: {
            edit: {
              label: 'Picture',
              description: '....',
              editable: true,
              visible: true,
            },
            list: {},
          },
          article: {
            edit: {
              label: 'Article',
              description: '....',
              editable: true,
              visible: true,
              mainField: 'title',
            },
            list: {},
          },
        },
        settings: {
          mainField: 'id',
          defaultSortBy: 'id',
          defaultSortOrder: 'ASC',
          searchable: true,
          filterable: true,
          bulkable: true,
          pageSize: 10,
        },
      },
      tag: {
        uid: 'tag',
        settings: {
          mainField: 'id',
          defaultSortBy: 'id',
          defaultSortOrder: 'ASC',
          searchable: true,
          filterable: true,
          bulkable: true,
          pageSize: 10,
        },
        schema: {
          connection: 'default',
          collectionName: 'tags',
          info: {
            name: 'tag',
            description: '',
          },
          options: {
            increments: true,
            timestamps: false,
          },
          attributes: {
            name: {
              type: 'string',
              required: true,
              minLength: 1,
            },
            linkedArticles: {
              targetModel: 'article',
              type: 'relation',
              relationType: 'manyToMany',
            },
          },
        },
        metadata: {
          name: {
            edit: {
              label: 'Name',
              description: '....',
              editable: true,
              visible: true,
            },
            list: {
              label: 'Name',
              searchable: true,
              sortable: true,
            },
          },
          linkedArticles: {
            edit: {
              label: 'Linked Articles',
              description: '....',
              editable: true,
              visible: true,
              mainField: 'title',
            },
            list: {},
          },
        },
        layouts: {
          edit: [[{ name: 'name', size: 6 }]],
          editRelations: ['linkedArticles'],
          list: ['name'],
        },
      },
    };

    ctx.body = { layout: layouts[ctx.params.uid] };
  },

  getModels: ctx => {
    const models = Object.keys(strapi.models)
      .filter(key => key !== 'core_store')
      .map(name => {
        const { info } = strapi.models[name];

        return {
          name,
          label: info.name,
          destination: name,
          isDisplayed: true,
        };
      });
    const pluginsModels = Object.keys(strapi.plugins).reduce(
      (acc, pluginKey) => {
        const plugin = strapi.plugins[pluginKey];
        const pluginModels = Object.keys(plugin.models).reduce(
          (acc2, modelName) => {
            const { info } = plugin.models[modelName];

            const modelItem = {
              name: modelName,
              label: info.name,
              destination: modelName,
              isDisplayed: true,
              source: pluginKey,
            };

            if (['file', 'permission', 'role'].includes(modelName)) {
              modelItem.isDisplayed = false;
            }

            return acc2.concat(modelItem);
          },
          []
        );

        if (pluginModels.length > 0) {
          return [...acc, ...pluginModels];
        }

        return acc;
      },
      []
    );
    const adminModels = Object.keys(strapi.admin.models).map(name => {
      return {
        name,
        label: name,
        destination: name,
        isDisplayed: false,
        source: 'admin',
      };
    });
    const pluralizedModels = [...models, ...pluginsModels, ...adminModels].map(
      obj => ({ ...obj, label: upperFirst(pluralize(obj.label)) })
    );

    ctx.body = { models: pluralizedModels };
  },

  updateGeneralSettings: ctx => {
    // Here it should update all the other settings
    ctx.body = { ok: true };
  },

  updateLayout: ctx => {
    // Update specific layout
    ctx.body = { ok: true };
  },
};
