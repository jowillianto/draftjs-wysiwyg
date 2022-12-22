import React from 'react'
import EditorLinkToggle from './link-toggle'
import EditorImageToggle from './image-toggle'
import EditorToggle from './editor-toggle'
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

export default class EditorHeader extends React.Component{
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