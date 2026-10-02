---
'@tiptap/core': patch
---

Non-empty `JSONContent[]` can be used as editor content without crashing. `createDocument` now wraps array Fragments into a top-level document node.
