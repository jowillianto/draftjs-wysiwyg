# Text Editor WYSIWYG
A WYSIWYG Suite of Editor implemented for use in an application
## Installation
## Example Usage
```tsx
import React from 'react'
import TextEditor from '@jowillianto/draftjs-wysiwyg/dist'
import {
  EditorState
} from 'draft-js'
const App = () => {
  const [updateEditor, editor] = React.useState(EditorState.createEmpty())
  return (
      <TextEditor 
        header = {<EditorHeader />}
        editorShortcut = {true}
        onChange = {updateEditor}
        defaultValue = {editor}
      />
  )
}
```