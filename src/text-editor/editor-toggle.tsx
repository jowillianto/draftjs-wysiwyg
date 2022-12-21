import React from "react";
import {
  EditorContext
} from './text-editor'
import {
  RichUtils,
} from 'draft-js'

export const DRAFT_INLINE_STYLE : Record<string, string> = {
  'strike-through'  : "STRIKETHROUGH",
  bold              : "BOLD", 
  code              : "CODE", 
  italic            : "ITALIC", 
  underline         : "UNDERLINE"
}
export const DRAFT_BLOCK_TYPE : Record<string, string> = {
  h1      : 'header-one', 
  h2      : 'header-two', 
  h3      : 'header-three', 
  h4      : 'header-four', 
  h5      : 'header-five', 
  h6      : 'header-six', 
  section : 'section', 
  article : 'article', 
  ul      : 'unordered-list-item', 
  ol      : 'ordered-list-item', 
  blockquote : 'blockquote', 
  codeblock : 'code-block', 
  unstyled : 'unstyled'
}
const typeKeys  = [
  ...Object.keys(DRAFT_BLOCK_TYPE), ...Object.keys(DRAFT_INLINE_STYLE)
] as const
type ToggleType = typeof typeKeys[number]

interface InlineToggleProps{
  styleName   : ToggleType,
  children    : React.ReactNode
}

export default class EditorToggle extends React.Component<InlineToggleProps>{
  static contextType  = EditorContext
  context !: React.ContextType<typeof EditorContext>
  toggleStyle = (ev : React.MouseEvent) => {
    ev.preventDefault()
    const styleName   = this.props.styleName
    const editorState = this.context.editorState
    // For the condition branches
    const inlineMap   = DRAFT_INLINE_STYLE[styleName]
    const blockMap    = DRAFT_BLOCK_TYPE[styleName]

    // branches
    if(inlineMap){
      const style     = DRAFT_INLINE_STYLE[styleName]
      const newState  = RichUtils.toggleInlineStyle(editorState, style)
      this.context.setEditorState(newState)
    }
    else if(blockMap){
      const style     = DRAFT_BLOCK_TYPE[styleName]
      const newState  = RichUtils.toggleBlockType(editorState, style)
      this.context.setEditorState(newState)
    }
    else{
      console.warn(`${styleName} is not a valid type`)
    }
  }
  isActive() : string{
    const styleName   = this.props.styleName
    const inlineMap   = DRAFT_INLINE_STYLE[styleName]
    const blockMap    = DRAFT_BLOCK_TYPE[styleName]
    if(inlineMap){
      const styleSet  = this.context.editorState.getCurrentInlineStyle()
      return styleSet.includes(inlineMap) ? 'active' : ''
    }
    else{
      const selection = this.context.editorState.getSelection()
      const blockKey  = selection.getEndKey()
      const block     = this.context.editorState
        .getCurrentContent()
        .getBlockForKey(blockKey)
      return block.getType() == blockMap ? 'active' : ''
    }
    
  }
  render() : React.ReactNode{
    const active  = this.isActive()
    return (
      <div className = {`inline-toggle text-editor-toggle ${active}`}>
        <button onMouseDown = {this.toggleStyle}>
          {this.props.children}
        </button>
      </div>
    )
  }
}
