import { 
  CompositeDecorator,
  ContentBlock,
  ContentState,
  DraftDecorator,
  EditorState,
  Modifier
} from 'draft-js'
import React from 'react'
import {
  EditorContext, DraftDecoratorComponentProps
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
  /*
    Link Search Strategy
  */
  static linkSearch(
    block : ContentBlock, 
    callback: (start : number, end : number) => void, 
    contentState : ContentState
  ){
    block.findEntityRanges((char) => {
      const entityKey   = char.getEntity()
      return (
        entityKey !== null && 
        contentState
          .getEntity(entityKey)
          .getType() === EditorLinkToggle.ENTITY_NAME
      )
    }, callback)
  }

  constructor(props : EditorLinkToggleProps){
    super(props)
    this.state  = {
      linkText  : '', 
      srcText   : '', 
      showDropDown : false
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
    Handle decorator addition for draft
  */
  addDecorator = () : Record<string, DraftDecorator> => {
    if(this.context.decorators.linkDecorator) 
      return this.context.decorators
    const linkDecorator : DraftDecorator = {
      strategy  : EditorLinkToggle.linkSearch,
      component : this.transformRenderLink, 
    }
    return Object.assign(this.context.decorators, {
      linkDecorator : linkDecorator
    })
  }
  /*
    Create Link Subclass
  */
  transformRenderLink = (
    props : DraftDecoratorComponentProps
  ) : React.ReactNode => {
    const {contentState, entityKey, blockKey, children}   = props
    const {url, linkText}   = contentState.getEntity(entityKey).getData()
    const element           = this.props.renderLink
    return element ? 
      React.cloneElement(
        element, {to : url, children : linkText ? linkText : children}
      )
      :
      (<a href = {url}>
        {linkText || props.children}
      </a>)
  }
  /*
    Add the link to the editor
  */
  addLink = () => {
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
      new CompositeDecorator(Object.values(this.context.decorators))
    )
    const moveCursor  = EditorState.moveFocusToEnd(newState)
    this.context.setEditorState(moveCursor)
    this.toggleDropDown()
  }
  render() : React.ReactNode{
    return(
      <div className = 'link-toggle text-editor-toggle'>
        <div className = 'button' onMouseDown = {this.toggleDropDown}>
          {this.props.children}
        </div>
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
                <div 
                  className = 'button' 
                  onMouseDown = {this.toggleDropDown}
                >
                  Cancel
                </div>
                <div
                  className = 'link-toggle-add button' onClick = {this.addLink}>
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
