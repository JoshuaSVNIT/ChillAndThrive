export default {
  name: 'testimonials',
  title: 'Testimonials',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Role/Position',
      type: 'string',
    },
    {
      name: 'review',
      title: 'Review',
      type: 'string',
    },
    {
      name: 'rating',
      title: 'Rating (out of 5)',
      type: 'string',
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
