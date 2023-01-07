import React from 'react'
import TextEditor from './editor/text-editor/text-editor'
import './index.css'
import {
  convertToRaw,
  EditorState, 
  RawDraftContentState
} from 'draft-js'
import EditorHeader from './editor/editor-header/editor-header'

export default class App extends React.Component<
  Object, {editor : EditorState | null}
>{
  defaultValue : RawDraftContentState
  constructor(props : Object){
    super(props)
    this.state  = {
      editor : null
    }
    const initData    = process.env.REACT_APP_INIT_DATA as string
    const stringValue = (
      document.getElementById(initData) as HTMLInputElement
    )?.value
    this.defaultValue = JSON.parse(stringValue ? stringValue : '{}')
    const autoSaveDelay   = parseInt(process.env.REACT_APP_SAVE_DELAY as string)
    setInterval(this.exportEditor, autoSaveDelay)
  }
  updateEditor = (state : EditorState) => {
    this.setState({editor : state})
  }
  exportEditor = (ev? : React.MouseEvent) => {
    ev?.preventDefault()
    const fieldName = process.env.REACT_APP_HIDDEN_FIELD as string
    const hidden    = document.getElementById(fieldName)
    if(hidden && this.state.editor){
      (hidden as HTMLInputElement).value  = JSON.stringify(convertToRaw(
        this.state.editor.getCurrentContent()
      ))
    }
  }
  render(){
    return (
      <React.Fragment>
        <TextEditor 
          header          = {<EditorHeader />}
          editorShortcut  = {true}
          key             = {1}
          onChange        = {this.updateEditor}
          defaultValue    = {this.defaultValue}
        />
        <button className = 'submit-button' onClick = {this.exportEditor}>
          Save Draft
        </button>
      </React.Fragment>
    )
  }
};