export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Service Name',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price (₹)',
      type: 'number',
    },
    {
      name: 'duration',
      title: 'Duration (mins)',
      type: 'string',
    },
    {
      name: 'shortDescription',
      title: 'Short Description (for the card)',
      type: 'text',
      rows: 3,
    },
    {
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}
