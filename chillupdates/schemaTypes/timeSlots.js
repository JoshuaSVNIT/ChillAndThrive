export default {
  name: 'timeSlots',
  title: 'Time Slots',
  type: 'document',
  fields: [
    {
      name: 'day',
      title: 'Day of the Week',
      type: 'string',
      options: {
        list: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'activeSlots',
      title: 'Open Time Slots (Tick to Enable)',
      type: 'array',
      of: [{type: 'string'}],

      // 👇 ADD THIS SECTION 👇
      // This pre-fills the array with ALL slots, effectively checking all boxes.
      initialValue: [
        '09:00 AM',
        '10:00 AM',
        '11:00 AM',
        '12:00 PM',
        '01:00 PM',
        '02:00 PM',
        '03:00 PM',
        '04:00 PM',
        '05:00 PM',
        '06:00 PM',
      ],
      // 👆 END ADDITION 👆

      options: {
        list: [
          {title: '09:00 AM', value: '09:00 AM'},
          {title: '10:00 AM', value: '10:00 AM'},
          {title: '11:00 AM', value: '11:00 AM'},
          {title: '12:00 PM', value: '12:00 PM'},
          {title: '01:00 PM', value: '01:00 PM'},
          {title: '02:00 PM', value: '02:00 PM'},
          {title: '03:00 PM', value: '03:00 PM'},
          {title: '04:00 PM', value: '04:00 PM'},
          {title: '05:00 PM', value: '05:00 PM'},
          {title: '06:00 PM', value: '06:00 PM'},
        ],
        layout: 'grid',
      },
    },
  ],
  preview: {
    select: {
      title: 'day',
    },
  },
}
