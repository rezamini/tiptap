import type { Node as PMNode, ParseOptions, Schema } from '@tiptap/pm/model'
import { Fragment } from '@tiptap/pm/model'

import type { Content } from '../types.js'
import { createNodeFromContent } from './createNodeFromContent.js'
import { isFragment } from './isFragment.js'

/**
 * Create a new Prosemirror document node from content.
 * @param content The JSON or HTML content to create the document from
 * @param schema The Prosemirror schema to use for the document
 * @param parseOptions Options for the parser
 * @returns The created Prosemirror document node
 */
export function createDocument(
  content: Content | PMNode | Fragment,
  schema: Schema,
  parseOptions: ParseOptions = {},
  options: { errorOnInvalidContent?: boolean } = {},
): PMNode {
  const nodeOrFragment = createNodeFromContent(content, schema, {
    slice: false,
    parseOptions,
    errorOnInvalidContent: options.errorOnInvalidContent,
  })

  if (isFragment(nodeOrFragment)) {
    // Re-hydrate via JSON so Fragments from a duplicate prosemirror-model copy still work.
    return schema.topNodeType.create(null, Fragment.fromJSON(schema, nodeOrFragment.toJSON() ?? []))
  }

  return nodeOrFragment
}
