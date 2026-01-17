import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'chillUpdates',

  projectId: 'i9n9ey9c',
  dataset: 'production',
  basePath: '/admin',
  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
