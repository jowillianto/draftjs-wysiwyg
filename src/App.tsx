import React from 'react'
import EditorToggle from './text-editor/editor-toggle'
import TextEditor from './text-editor/text-editor'
import './index.css'
import EditorLinkToggle from './text-editor/link-toggle'
import EditorImageToggle from './text-editor/image-toggle'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBold, 
  faItalic, 
  faUnderline, 
  faListUl, 
  faListOl, 
  faCode, 
  faQuoteLeft, 
  faLink, 
  faImage 
} from "@fortawesome/free-solid-svg-icons"
import {
  EditorState, 
  RawDraftContentState
} from 'draft-js'

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
    return(
      <div className = 'editor-toggles'>
        <div className='editor-toggle-text'>
          <EditorToggle styleName='bold'>
            <FontAwesomeIcon icon={faBold}/>
          </EditorToggle>
          <EditorToggle styleName='italic'>
            <FontAwesomeIcon icon={faItalic}/></EditorToggle>
          <EditorToggle styleName='underline'>
            <FontAwesomeIcon icon={faUnderline}/>
          </EditorToggle>
          <EditorToggle styleName='ul'>
            <FontAwesomeIcon icon={faListUl}/>
          </EditorToggle>
          <EditorToggle styleName='ol'>
            <FontAwesomeIcon icon={faListOl}/>
          </EditorToggle>
          <EditorToggle styleName='blockquote'>
            <FontAwesomeIcon icon={faQuoteLeft}/>
          </EditorToggle>
          <EditorToggle styleName='codeblock'>
            <FontAwesomeIcon icon={faCode}/>
          </EditorToggle>
          <EditorToggle styleName='h1'>H1</EditorToggle>
          <EditorToggle styleName='h2'>H2</EditorToggle>
          <EditorToggle styleName='h3'>H3</EditorToggle>
          <EditorToggle styleName='h4'>H4</EditorToggle>
          <EditorToggle styleName='h5'>H5</EditorToggle>
          <EditorToggle styleName='h6'>H6</EditorToggle>
          <EditorLinkToggle>
            <FontAwesomeIcon icon={faLink}/>
          </EditorLinkToggle>
          <EditorImageToggle convertToLink = {this.convertToLink}>
            <FontAwesomeIcon icon={faImage}/>
          </EditorImageToggle>
        </div>
      </div>
    )
  }
}

export default class App extends React.Component<
  Object, {editor : EditorState | null}
>{
  defaultValue : RawDraftContentState
  constructor(props : Object){
    super(props)
    this.state  = {
      editor : null
    }
    const stringValue = document.getElementById('draft-form-data')?.textContent
    this.defaultValue = JSON.parse(stringValue ? stringValue : '{}')
  }
  updateEditor = (state : EditorState) => {
    this.setState({editor : state})
  }
  render(){
    return (
      <TextEditor 
        header          = {<EditorHeader />}
        editorShortcut  = {true}
        key             = {1}
        onChange        = {this.updateEditor}
        defaultValue    = {this.defaultValue}
      />
    )
  }
};