import {
  ContentBlock, 
  EditorBlock,
  EditorState
} from "draft-js";
import React from 'react'
import { 
  DraftBlockComponentProps,
  DraftRenderer
} from "./interface";

function HOCWithClassName(elm : string): React.FC<DraftBlockComponentProps>{
  return (props : DraftBlockComponentProps) : React.ReactElement => {
    const className = props.blockProps.className    
    return (
      React.createElement(
        elm, 
        {className : className}, 
        <EditorBlock {...props} />
      )
    )
  }
}

export const ALIGNABLE : Record<string, React.FC<DraftBlockComponentProps> > = {
  'header-one' : HOCWithClassName('h1'), 
  'header-three' : HOCWithClassName('h3'), 
  'header-five' : HOCWithClassName('h5'),
  'header-two' : HOCWithClassName('h2'), 
  'header-four'  : HOCWithClassName('h4'), 
  'header-six'  : HOCWithClassName('h6'), 
  'section' : HOCWithClassName('section'), 
  'article' : HOCWithClassName('article'), 
  'unstyled' : HOCWithClassName('span'), 
}

const CLASS_ALIGN : Record<string, string> = {
  center  : 'text-editor-style-center', 
  left    : 'text-editor-style-left', 
  right   : 'text-editor-style-right', 
  justify : 'text-editor-style-justify'
}

export default function blockStyleFn(block : ContentBlock) : 
DraftRenderer | undefined{
  const blockType   = block.getType()
  const splitBlock  = blockType.split(' ')
  if(splitBlock.length === 2){
    const [main, align]   = splitBlock
    const element         = ALIGNABLE[main]
    if(element)
      return {
        component : element, 
        editable  : true,
        props     : {
          className : CLASS_ALIGN[align]
        }
      }
  }
}

export function getCurrentAlignment(state : EditorState) : [string, string]{
  const content   = state.getCurrentContent()
  const selection = state.getSelection()
  const block     = content.getBlockForKey(selection.getEndKey())
  const blockType = block.getType()
  const splitBlock= blockType.split(' ')
  return splitBlock.length === 2 ? 
    [splitBlock[0], splitBlock[1]]: [splitBlock[0], '']
}