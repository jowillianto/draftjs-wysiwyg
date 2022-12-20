import React from 'react'
import EditorToggle, { 
  DRAFT_BLOCK_TYPE, DRAFT_INLINE_STYLE 
} from './text-editor/editor-toggle'
import TextEditor from './text-editor/text-editor'
import './index.css'
import EditorLinkToggle from './text-editor/link-toggle'

class EditorHeader extends React.Component{
  render(): React.ReactNode {
    const inlineStyles  = Object.keys(DRAFT_INLINE_STYLE)
    const blockTypes    = Object.keys(DRAFT_BLOCK_TYPE)
    return(
      <div className = 'editor-toggles'>
        <div className = 'upper-row'>
          {inlineStyles.map((name) => 
            <EditorToggle styleName = {name} key = {name}>
              <p>{name}</p>
            </EditorToggle>
          )}
        </div>
        <div className = 'lower-row'>
          {blockTypes.map((name) => 
            <EditorToggle styleName = {name} key = {name}>
              <p>{name}</p>
            </EditorToggle>
          )}
          <EditorLinkToggle>
            <p>Make Link</p>
          </EditorLinkToggle>
        </div>
      </div>
    )
  }
}

export default class App extends React.Component{
  render(){
    return (
      <TextEditor 
        header          = {<EditorHeader />}
        editorShortcut  = {true}
      />
    )
  }
};