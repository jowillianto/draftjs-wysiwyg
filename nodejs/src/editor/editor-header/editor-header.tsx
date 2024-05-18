import React from 'react'
import EditorLinkToggle from '../toggle/link-toggle'
import EditorImageToggle from '../toggle/image-toggle'
import EditorToggle from '../toggle/editor-toggle'
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
  faImage,
  faAlignCenter, 
  faAlignJustify, 
  faAlignLeft, 
  faAlignRight
} from "@fortawesome/free-solid-svg-icons"

/**
 * @params onImageDrop : function to call that returns an src for the image. This can be used to 
 * override the default way of handling images
 */
type EditorHeaderP = {
  onImageDrop? : (img : Blob) => Promise<string>
}
export default class EditorHeader extends React.Component<EditorHeaderP>{
  // Default image saving function
  saveImageToEditorState(img : Blob) : Promise<string | ArrayBuffer | null> {
    const reader  = new FileReader()
    return new Promise((res, rej) => {
      reader.readAsDataURL(img)
      reader.addEventListener('loadend', (ev : ProgressEvent<FileReader>) => {
        res(reader.result)
      })
    })
  }
  convertToLink(img : Blob) : Promise<string | ArrayBuffer | null>{
    // Don't use the default function
    if (this.props.onImageDrop)
      return this.props.onImageDrop(img)
    else
      return this.saveImageToEditorState(img)
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
          <EditorToggle styleName = 'left'>
            <FontAwesomeIcon icon = {faAlignLeft} />
          </EditorToggle>
          <EditorToggle styleName = 'center'>
            <FontAwesomeIcon icon = {faAlignCenter} />
          </EditorToggle>
          <EditorToggle styleName = 'right'>
            <FontAwesomeIcon icon = {faAlignRight} />
          </EditorToggle>
          <EditorToggle styleName = 'justify'>
            <FontAwesomeIcon icon = {faAlignJustify} />
          </EditorToggle>
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