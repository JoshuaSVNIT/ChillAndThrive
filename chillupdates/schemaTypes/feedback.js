export default {
  name: 'feedback',
  title: 'User Feedback',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'User Name',
      type: 'string',
    },
    {
      name: 'message',
      title: 'Message / Review',
      type: 'text',
    },
    {
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
    },
    {
      name: 'status',
      title: 'Approval Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending', value: 'pending'},
          {title: 'Approved', value: 'approved'},
          {title: 'Rejected', value: 'rejected'},
        ],
      },
      initialValue: 'pending', // New reviews need approval before showing on site
    },
  ],
}
