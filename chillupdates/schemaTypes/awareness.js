export default {
  name: 'awareness',
  title: 'Awareness',
  type: 'document',
  fields: [
    {
      name: 'topic',
      title: 'Topic',
      type: 'string',
    },
    {
      name: 'quote',
      title: 'Quote',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description (for the card)',
      type: 'text',
      rows: 3,
    },
    {
      name: 'points',
      title: 'Points',
      type: 'array',
      of: [{type: 'string'}],
    },
  ],
}
