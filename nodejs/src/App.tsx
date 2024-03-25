import React from 'react'
import TextEditor from './editor/text-editor/text-editor'
import './index.css'
import {
  convertToRaw,
  EditorState
} from 'draft-js'
import EditorHeader from './editor/editor-header/editor-header'

const saveFieldName = process.env.REACT_APP_HIDDEN_FIELD as string

const App = () => {
  const defaultValue = React.useMemo(() => {
    const value = (
      document.getElementById(saveFieldName) as (HTMLInputElement | null)
    )?.value
    if (value)
      return JSON.parse(value)
    else
      return undefined
  }, [])
  const saveToHiddenField = React.useCallback((editor : EditorState) => {
    const elm = document.getElementById(saveFieldName) as 
      (HTMLInputElement | null)
    if (elm){
      elm.value = JSON.stringify(convertToRaw(editor.getCurrentContent()))
    }
  }, [])
  return (
    <React.Fragment>
      <TextEditor 
        header = {<EditorHeader />}
        onChange = {saveToHiddenField}
        defaultValue = {defaultValue}
        editorShortcut
      />
    </React.Fragment>
  )
}

export default App