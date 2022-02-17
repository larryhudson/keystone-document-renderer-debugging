import { config } from '@keystone-6/core';
import { lists } from './schema';
import { componentBlocks } from "./component-blocks.jsx"

export default config({
  db: {
    provider: 'sqlite',
    url: process.env.DATABASE_URL || 'file:./keystone-example.db',
  },
  images: {
    upload: 'local',
    local: {
      storagePath: 'uploads/images',
      baseUrl: '/images'
    }
  },
  lists,
});
