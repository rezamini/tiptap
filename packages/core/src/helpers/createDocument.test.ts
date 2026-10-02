import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { describe, expect, it } from 'vite-plus/test'

import { createDocument } from './createDocument.js'
import { getSchemaByResolvedExtensions } from './getSchemaByResolvedExtensions.js'

describe('createDocument', () => {
  const schema = getSchemaByResolvedExtensions([Document, Paragraph, Text])

  it('creates a document node from a non-empty JSONContent array', () => {
    const content = [
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Hello' }],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'World' }],
      },
    ]

    const doc = createDocument(content, schema)

    expect(doc.type).toBe(schema.topNodeType)
    expect(doc.type.name).toBe('doc')
    expect(doc.toJSON()).toEqual({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Hello' }],
        },
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'World' }],
        },
      ],
    })
  })

  it('creates a document node from a full JSON document', () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Hello' }],
        },
      ],
    }

    const doc = createDocument(content, schema)

    expect(doc.type).toBe(schema.topNodeType)
    expect(doc.toJSON()).toEqual(content)
  })

  it('creates a document node from HTML content', () => {
    const doc = createDocument('<p>Hello</p>', schema)

    expect(doc.type).toBe(schema.topNodeType)
    expect(doc.toJSON()).toEqual({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Hello' }],
        },
      ],
    })
  })

  it('creates an empty document from an empty array', () => {
    const doc = createDocument([], schema)

    expect(doc.type).toBe(schema.topNodeType)
    expect(doc.type.name).toBe('doc')
  })
})
