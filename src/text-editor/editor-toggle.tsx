import React from "react"
import {
  EditorContext
} from './text-editor'
import {
  RichUtils,
  EditorState
} from 'draft-js'
import { ALIGNABLE, getCurrentAlignment } from "./align-map";

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

export const DRAFT_BLOCK_ALIGNMENT_TYPE : Record<string, string> = {
  center  : 'center', 
  justify : 'justify',
  left    : 'left',
  right   : 'right'
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
  toggleStyle = (ev? : React.MouseEvent) => {
    ev?.preventDefault()
    const styleName   = this.props.styleName
    const editorState = this.context.editorState
    // For the condition branches
    const inlineMap   = DRAFT_INLINE_STYLE[styleName]
    const blockMap    = DRAFT_BLOCK_TYPE[styleName]
    const alignment   = DRAFT_BLOCK_ALIGNMENT_TYPE[styleName]

    // branches
    if(inlineMap){
      const style     = DRAFT_INLINE_STYLE[styleName]
      const newState  = RichUtils.toggleInlineStyle(editorState, style)
      this.context.setEditorState(newState)
    }
    else if(blockMap){
      const splitBlock= getCurrentAlignment(editorState)
      const style     = DRAFT_BLOCK_TYPE[styleName]
      const alignable = style in ALIGNABLE
      if(splitBlock[1] !== ''){
        const [main, align] = splitBlock
        if(alignable) 
          this.setStateWithAlign(editorState, style, align)
        else
          this.setStateWithAlign(editorState, style)
      }
      else{
        if(alignable)
          this.setStateWithAlign(editorState, style, 'left')
        else
          this.setStateWithAlign(editorState, style)
      }
    }
    else if(alignment){
      const splitBlock= getCurrentAlignment(editorState)
      const style     = DRAFT_BLOCK_ALIGNMENT_TYPE[styleName]
      const alignable = splitBlock[0] in ALIGNABLE
      if(splitBlock[1] != ''){
        const [main, align] = splitBlock
        this.setStateWithAlign(editorState, main, style)
      }
      else if(alignable)
        this.setStateWithAlign(editorState, splitBlock[0], style)
    }
    else{
      console.warn(`${styleName} is not a valid type`)
    }
  }
  setStateWithAlign(editorState : EditorState, style : string, align? : string){
    if(align)
      this.context.setEditorState(
        RichUtils.toggleBlockType(editorState, `${style} ${align}`)
      )
    else
      this.context.setEditorState(
        RichUtils.toggleBlockType(editorState, `${style}`)
      )
  }
  isActive() : string{
    const styleName   = this.props.styleName
    const inlineMap   = DRAFT_INLINE_STYLE[styleName]
    const blockMap    = DRAFT_BLOCK_TYPE[styleName]
    const alignment   = DRAFT_BLOCK_ALIGNMENT_TYPE[styleName]
    if(inlineMap){
      const styleSet  = this.context.editorState.getCurrentInlineStyle()
      return styleSet.includes(inlineMap) ? 'active' : ''
    }
    else if(blockMap){
      const splitBlock  = getCurrentAlignment(this.context.editorState)
      if (splitBlock.length === 2){
        const [main, align]   = splitBlock
        return main === blockMap ? 'active' : ''
      }
      else{
        return splitBlock[0] === blockMap ? 'active' : ''
      }
    }
    else if(alignment){
      const splitBlock  = getCurrentAlignment(this.context.editorState)
      if(splitBlock.length === 2){
        const [main, align]   = splitBlock
        return align === alignment ? 'active' : ''
      }
      else return ''
    }
    else return ''
  }
  onClick = (ev : React.MouseEvent) => {
    ev.preventDefault()
  }
  render() : React.ReactNode{
    const active  = this.isActive()
    return (
      <div className = {`inline-toggle text-editor-toggle ${active}`}>
        <button 
          onMouseDown = {this.toggleStyle}
          onClick = {this.onClick}
        >
          {this.props.children}
        </button>
      </div>
    )
  }
}
