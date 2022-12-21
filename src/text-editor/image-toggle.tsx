import { CompositeDecorator, ContentBlock, ContentState, DraftDecorator, EditorState, Modifier } from "draft-js"
import React from "react"
import { DraftDecoratorComponentProps, EditorContext } from "./text-editor"

interface ImageToggleProps{
  children      : React.ReactNode
  convertToLink : (img : Blob) => Promise<string | ArrayBuffer | null>
}

interface ImageToggleState{
  uploadedImg   : Blob | null, 
  dropDown      : boolean
}

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
  componentDidMount(): void {
    const decorators  = this.addDecorator()
    const newState    = EditorState.createWithContent(
      this.context.editorState.getCurrentContent(), 
      new CompositeDecorator(Object.values(decorators))
    )
    this.context.setEditorState(newState, decorators)
  }
  /*
    Image Searching Decorator
  */
  static imageSearch(
    block : ContentBlock,
    callback : (start : number, end : number) => void, 
    contentState : ContentState
  ){
    block.findEntityRanges((char) => {
      const entityKey = char.getEntity()
      return (
        entityKey !== null && 
        contentState 
          .getEntity(entityKey)
          .getType() === EditorImageToggle.ENTITY_NAME
      )
    }, callback)
  }
  /*
    Toggle Dropdown for Image
  */
  /*
    Decorator handling
  */
  addDecorator = () : Record<string, DraftDecorator> => {
    if(this.context.decorators.imgDecorator)
      return this.context.decorators
    const imgDecorator : DraftDecorator = {
      strategy : EditorImageToggle.imageSearch, 
      component: this.propsToImg
    }
    return Object.assign(this.context.decorators, {
      imgDecorator : imgDecorator
    })
  }
  /*
    image Renderer
  */
  propsToImg = (props  : DraftDecoratorComponentProps) : React.ReactNode => {
    const {contentState, entityKey, blockKey, children} = props
    const {url} = contentState.getEntity(entityKey).getData()
    return (
      <React.Fragment>
        <img src = {url} style = {EditorImageToggle.DEFAULT_CSS}></img>
        <p style = {{visibility : 'hidden'}}>{props.children}</p>
      </React.Fragment>
    )
  }
  /*
    Add the image
  */
  addImage = () => {
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
          new CompositeDecorator(Object.values(this.context.decorators))
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
  render() : React.ReactNode{
    return(
      <div className = 'img-toggle text-editor-toggle'>
        <div className = 'button' onMouseDown={this.toggleDropDown}>
          {this.props.children}
        </div>
        {this.state.dropDown && 
          <div className='upload-bg'>
            <div className = 'img-toggle-dropdown text-editor-toggle upload-msgbox'>
              <div className = 'img-toggle-upload'>
                <input type = 'file' onChange = {this.uploadFile} />
              </div>
              <div className='upload-btns'>
                <div 
                  className = 'button' 
                  onMouseDown = {this.toggleDropDown}
                >
                  Cancel
                </div>
                <div
                  className = 'img-toggle-add button' 
                  onMouseDown = {this.addImage}
                >
                  <p>Add</p>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}