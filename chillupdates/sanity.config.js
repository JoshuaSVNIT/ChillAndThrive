import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'chillUpdates',

  projectId: 'i9n9ey9c',
  dataset: 'production',
  basePath: '/admin', // You had this set, so I kept it!

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // --- FOLDER 1: BLOG ---
            S.listItem()
              .title('Blog System')
              .child(
                S.list()
                  .title('Blog Content')
                  .items([
                    S.documentTypeListItem('post'),
                    S.documentTypeListItem('author'),
                    S.documentTypeListItem('category'),
                  ]),
              ),

            // --- FOLDER 2: SERVICES ---
            S.listItem()
              .title('Services Management')
              .child(
                S.list()
                  .title('Services')
                  .items([
                    S.documentTypeListItem('service'),
                    S.documentTypeListItem('comboService'),
                    S.documentTypeListItem('timeSlots'),
                  ]),
              ),

            // --- FOLDER 3: ENGAGEMENT ---
            S.listItem()
              .title('User Engagement')
              .child(
                S.list()
                  .title('Engagement')
                  .items([
                    S.documentTypeListItem('events'),
                    S.documentTypeListItem('testimonials'),
                    // Ensure your feedback schema name is exactly 'feedback'
                    S.documentTypeListItem('feedback'),
                  ]),
              ),

            S.divider(), // Adds a visual line separator

            // --- FLAT ITEMS ---
            S.documentTypeListItem('awareness'),
            S.documentTypeListItem('myth'),
            S.documentTypeListItem('faq'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
