import { 
  CompositeDecorator,
  EditorState, 
  Modifier 
} from "draft-js"
import React from "react"
import { EditorContext } from "../text-editor/text-editor"
import {
  ImageToggleProps, 
  ImageToggleState
} from './interface'

export default class EditorImageToggle extends React.Component<
  ImageToggleProps, ImageToggleState
>{
  static contextType  = EditorContext
  static ENTITY_NAME  = 'IMAGE'
  static DEFAULT_CSS  = {width : '50%'}
  context !: React.ContextType<typeof EditorContext>
  constructor(props : ImageToggleProps){
    super(props)
    this.state  = {
      uploadedImg : null, 
      dropDown    : false
    }
  }
  /*
    Add the image
  */
  addImage = (ev? : React.MouseEvent) => {
    ev?.preventDefault()
    const imgData = this.state.uploadedImg
    if(imgData === null) return
    return new Promise((res, rej) => {
      this.props.convertToLink(imgData)
      .then((url) => {
        const editorState   = this.context.editorState
        const content       = editorState.getCurrentContent()
        content.createEntity(
          EditorImageToggle.ENTITY_NAME, 'IMMUTABLE', {url : url}
        )
        const entityKey   = content.getLastCreatedEntityKey()
        const selection   = this.context.editorState.getSelection()
        const newContent  = Modifier.insertText(
          content, selection, "An Image", editorState.getCurrentInlineStyle(), 
          entityKey
        )
        const newState    = EditorState.createWithContent(
          newContent, 
          new CompositeDecorator(this.context.decorators)
        )
        const moveCursor  = EditorState.moveFocusToEnd(newState)
        this.context.setEditorState(moveCursor)
        this.toggleDropDown()
      })
      .catch((err) => {
        console.error(err)
        rej()
      })
    })
  }
  /*
    Toggle DropDown
  */
 toggleDropDown = (ev? : React.MouseEvent) => {
  ev?.preventDefault()
  this.setState({
    uploadedImg   : null, 
    dropDown      : !this.state.dropDown
  })
 }
 uploadFile = (ev : React.ChangeEvent<HTMLInputElement>) => {
  this.setState({
    uploadedImg   : ev.target.files ? ev.target.files[0] : null
  })
 }
 onClick = (ev : React.MouseEvent) => {
  ev.preventDefault()
 }
  render() : React.ReactNode{
    return(
      <div className = 'img-toggle text-editor-toggle'>
        <button 
          onMouseDown={this.toggleDropDown}
          onClick    ={this.onClick}
        >
          {this.props.children}
        </button>
        {this.state.dropDown && 
          <div className='upload-bg'>
            <div className = 'img-toggle-dropdown text-editor-toggle upload-msgbox'>
              <div className = 'img-toggle-upload'>
                <input type = 'file' onChange = {this.uploadFile} />
              </div>
              <div className='upload-btns'>
                <button 
                  onClick     = {this.onClick}
                  onMouseDown = {this.toggleDropDown}
                >
                  Cancel
                </button>
                <button 
                  className   = 'img-toggle-add' 
                  onMouseDown = {this.addImage}
                  onClick = {this.onClick}
                >
                  <p>Add</p>
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}