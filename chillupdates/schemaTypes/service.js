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
      name: 'longDescription',
      title: 'Long Description (for the card)',
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
    {
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array', // <--- 1. Define it as a list
      options: {
        layout: 'grid', // <--- 2. Makes it look like a photo grid in Admin (instead of a list)
      },
      of: [
        {
          type: 'image', // <--- 3. Define what goes inside the list
          options: {
            hotspot: true, // Allows you to crop/focus important parts of the image
          },
          // Optional: Add fields to each image (like a caption)
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              options: {isHighlighted: true}, // Shows the field directly in the grid view
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
          ],
        },
      ],
    },
  ],
}
