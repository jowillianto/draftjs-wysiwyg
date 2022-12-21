import React from 'react'
import EditorToggle, { 
  DRAFT_BLOCK_TYPE, DRAFT_INLINE_STYLE 
} from './text-editor/editor-toggle'
import TextEditor from './text-editor/text-editor'
import './index.css'
import EditorLinkToggle from './text-editor/link-toggle'
import EditorImageToggle from './text-editor/image-toggle'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faItalic, faUnderline, faListUl, faListOl, faCode, faQuoteLeft, faLink, faImage } from "@fortawesome/free-solid-svg-icons"

class EditorHeader extends React.Component{
  convertToLink(img : Blob) : Promise<string | ArrayBuffer | null>{
    const reader  = new FileReader()
    return new Promise((res, rej) => {
      reader.readAsDataURL(img)
      reader.addEventListener('loadend', (ev : ProgressEvent<FileReader>) => {
        res(reader.result)
      })
    })
  }
  render(): React.ReactNode {
    const inlineStyles  = Object.keys(DRAFT_INLINE_STYLE)
    const blockTypes    = Object.keys(DRAFT_BLOCK_TYPE)
    return(
      <div className = 'editor-toggles'>
        <div className='editor-toggle-text'>
          <EditorToggle styleName='bold'><FontAwesomeIcon icon={faBold}/></EditorToggle>
          <EditorToggle styleName='italic'><FontAwesomeIcon icon={faItalic}/></EditorToggle>
          <EditorToggle styleName='underline'><FontAwesomeIcon icon={faUnderline}/></EditorToggle>
          <EditorToggle styleName='ul'><FontAwesomeIcon icon={faListUl}/></EditorToggle>
          <EditorToggle styleName='ol'><FontAwesomeIcon icon={faListOl}/></EditorToggle>
          <EditorToggle styleName='blockquote'><FontAwesomeIcon icon={faQuoteLeft}/></EditorToggle>
          <EditorToggle styleName='codeblock'><FontAwesomeIcon icon={faCode}/></EditorToggle>
          <EditorToggle styleName='h1'>H1</EditorToggle>
          <EditorToggle styleName='h2'>H2</EditorToggle>
          <EditorToggle styleName='h3'>H3</EditorToggle>
          <EditorToggle styleName='h4'>H4</EditorToggle>
          <EditorToggle styleName='h5'>H5</EditorToggle>
          <EditorToggle styleName='h6'>H6</EditorToggle>
          <EditorLinkToggle><FontAwesomeIcon icon={faLink}/></EditorLinkToggle>
          <EditorImageToggle convertToLink = {this.convertToLink}><FontAwesomeIcon icon={faImage}/></EditorImageToggle>
        </div>
        {/* <div className = 'upper-row'>
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
          <EditorImageToggle convertToLink = {this.convertToLink}>
            <p>Make Image</p>
          </EditorImageToggle>
        </div> */}
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