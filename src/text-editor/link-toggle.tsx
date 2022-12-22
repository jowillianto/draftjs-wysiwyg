import { 
  CompositeDecorator,
  EditorState,
  Modifier
} from 'draft-js'
import React from 'react'
import {
  EditorContext
} from './text-editor'

interface EditorLinkToggleProps{
  children    : React.ReactNode
  renderLink? : React.ReactElement
}
interface EditorLinkToggleState{
  linkText      : string, 
  srcText       : string, 
  showDropDown  : boolean
}


export default class EditorLinkToggle extends React.Component<
  EditorLinkToggleProps, EditorLinkToggleState
>{
  static contextType  = EditorContext
  context !: React.ContextType<typeof EditorContext>
  static ENTITY_NAME  = 'LINK'

  constructor(props : EditorLinkToggleProps){
    super(props)
    this.state  = {
      linkText  : '', 
      srcText   : '', 
      showDropDown : false
    }
  }
  /*
    Toggle Dropdown for form filling
  */
  toggleDropDown = (ev? : React.MouseEvent) => {
    ev?.preventDefault()
    this.setState({
      linkText    : '', 
      srcText     : '', 
      showDropDown: !this.state.showDropDown
    })
  }
  /*
    Handle form changing
  */
  onTextChange = (ev : React.ChangeEvent<HTMLInputElement>) => {
    this.setState({linkText : ev.target.value})
  }
  onLinkChange = (ev : React.ChangeEvent<HTMLInputElement>) => {
    this.setState({srcText  : ev.target.value})
  }
  /*
    Add the link to the editor
  */
  addLink = (ev? : React.MouseEvent) => {
    ev?.preventDefault()
    const linkLabel   = this.state.linkText
    const linkUrl     = this.state.srcText
    const editorState = this.context.editorState
    const content     = editorState.getCurrentContent()
    // Create the entity
    content.createEntity(
      EditorLinkToggle.ENTITY_NAME, 'MUTABLE', {url : linkUrl, }
    )
    const entityKey   = content.getLastCreatedEntityKey()
    const selection   = this.context.editorState.getSelection()
    const newContent  = Modifier.insertText(
      content, selection, linkLabel, editorState.getCurrentInlineStyle(),
      entityKey
    )
    const newState    = EditorState.createWithContent(
      newContent, 
      new CompositeDecorator(this.context.decorators)
    )
    const moveCursor  = EditorState.moveFocusToEnd(newState)
    this.context.setEditorState(moveCursor)
    this.toggleDropDown()
  }
  onClick = (ev : React.MouseEvent) => {
    ev.preventDefault()
  }
  render() : React.ReactNode{
    return(
      <div className = 'link-toggle text-editor-toggle'>
        <button 
          onMouseDown={this.toggleDropDown}
          onClick    ={this.onClick}
        >
          {this.props.children}
        </button>
        {this.state.showDropDown && 
          <div className='upload-bg'>
            <div className = 'link-toggle-dropdown text-editor-toggle upload-msgbox'>
              <div className = 'link-toggle-text text-editor-toggle'>
                <p>Name</p>
                <input
                  type = 'text' onChange = {this.onTextChange}
                />
              </div>
              <div className = 'link-toggle-href text-editor-toggle'>
                <p>Link</p>
                <input
                  type = 'url' onChange = {this.onLinkChange}
                />
              </div>
              <div className='upload-btns'>
              <button 
                  onClick     = {this.onClick}
                  onMouseDown = {this.toggleDropDown}
                >
                  Cancel
                </button>
                <button 
                  className = 'link-toggle-add' 
                  onMouseDown = {this.addLink}
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
