import { list } from '@keystone-6/core';
import { select, relationship, text, timestamp, image } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { componentBlocks } from "./component-blocks.jsx"
import path from "path";

export const lists = {
  Post: list({
    fields: {
      title: text({ validation: { isRequired: true } }),
      slug: text({ isIndexed: 'unique', validation: { isRequired: true } }),
      status: select({
        type: 'enum',
        options: [
          { label: 'Draft', value: 'draft' },
          { label: 'Published', value: 'published' },
        ],
      }),
      content: document({
        ui: {
          views: path.join(__dirname, './component-blocks')
        },
        // We want to have support a fully featured document editor for our
        // authors, so we're enabling all of the formatting abilities and
        // providing 1, 2 or 3 column layouts.
        formatting: true,
        dividers: true,
        links: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
        ],
        // We want to support twitter-style mentions in blogs, so we add an
        // inline relationship which references the `Author` list.
        relationships: {
          image: {
            kind: 'prop',
            listKey: 'Image',
            selection: 'altText imageFile { url }'
          }
        },
        componentBlocks,
      }),
      publishDate: timestamp(),
      author: relationship({ ref: 'Author.posts', many: false }),
    },
  }),
  Author: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({ isIndexed: 'unique', validation: { isRequired: true } }),
      posts: relationship({ ref: 'Post.author', many: true }),
      bio: document({
        // We want to constrain the formatting in Author bios to a limited set of options.
        // We will allow bold, italics, unordered lists, and links.
        // See the document field guide for a complete list of configurable options
        formatting: {
          inlineMarks: {
            bold: true,
            italic: true,
          },
          listTypes: { unordered: true },
        },
        links: true,
      }),
    },
  }),
  Image: list({
    fields: {
      imageFile: image(),
      altText: text(),
    }
  })
};
