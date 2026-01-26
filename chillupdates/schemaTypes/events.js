export default {
  name: 'events',
  title: 'Events',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Event Name',
      type: 'string',
    },

    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'headerImage',
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
    // chillupdates/schemaTypes/event.js

    {
      name: 'videoGallery',
      title: 'Video Gallery (YouTube Links)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'videoLink',
          fields: [
            {
              name: 'url',
              title: 'YouTube URL',
              type: 'url',
              description: 'Paste the full link (e.g., https://www.youtube.com/watch?v=...)',
            },
            {
              name: 'caption',
              title: 'Video Caption',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'caption',
              subtitle: 'url',
            },
          },
        },
      ],
    },
  ],
}
