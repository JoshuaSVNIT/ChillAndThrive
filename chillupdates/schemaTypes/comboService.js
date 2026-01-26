export default {
  name: 'comboService',
  title: 'Combo Services',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Services Names',
      type: 'string',
    },

    {
      name: 'category',
      title: 'Category',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Ice Bath', value: 'ice'},
          {title: 'Jacuzzi', value: 'jacuzzi'},
          {title: 'Steam Bath', value: 'steam'},
        ],
      },
    },

    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'discount',
      title: 'Discount Percentage',
      type: 'number',
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
    },
  ],
}
