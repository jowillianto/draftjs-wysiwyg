import React from "react"
import {
  Editor,
  EditorState,
  RichUtils,
  DraftHandleValue,
  getDefaultKeyBinding,
  DraftEditorCommand,
  DraftDecorator,
  CompositeDecorator,
  convertFromRaw
} from 'draft-js'
import "./text-editor.css"
import getDefaultDecorators from "../decorators/decorators"
import blockRendererFn from "../align-map/align-map"
import {
  EditorBehaviour,
  TextEditorProps,
  TextEditorState
} from './interface'


/*
  Context owned by the editor
*/
export const EditorContext = React.createContext<TextEditorState>({
  editorState   : EditorState.createEmpty(),
  setEditorState: (state : EditorState) => {}, 
  decorators    : []
})

/*
  Text editor class
*/
export default class TextEditor extends React.Component<
  TextEditorProps, TextEditorState
>{
  editorRef   : React.Ref<Editor>
  constructor(props : TextEditorProps){
    super(props)
    const decorators  = getDefaultDecorators()
    this.state  = {
      editorState   : this.getDefaultValue(props, decorators),
      setEditorState: this.setEditorState,
      decorators    : decorators
    }
    this.editorRef  = React.createRef()
  }
  /*
    GET the default value for the editor
  */
  getDefaultValue(
    props : TextEditorProps, decorators : Array<DraftDecorator>
  ) : EditorState{
    const defaultValue  = props.defaultValue
    if(defaultValue){
      try{
        return EditorState.createWithContent(
          convertFromRaw(defaultValue), 
          new CompositeDecorator(decorators)
        )
      }
      catch{
        return EditorState.createEmpty(
          new CompositeDecorator(decorators)
        )
      }
    }
    else return EditorState.createEmpty(
      new CompositeDecorator(decorators)
    )
  }
  // Main Handler
  /*
    Set the editor state
  */
  setEditorState= (state : EditorState) => {
    this.setState({
      editorState : state
    })
    if(this.props.onChange) this.props.onChange(state)
  }
  /*
    Handle keys command, input, etc.
  */
  handleKeyCommand = (
    command : string, state : EditorState, time : number
  ) : DraftHandleValue => {
    const defaultHandler  = RichUtils.handleKeyCommand(state, command)
    if(defaultHandler){
      this.setEditorState(defaultHandler)
      return 'handled'
    }
    return 'not-handled'
  }
  // Props Handling
  /*
    An If statement to parse EditorBehaviour in props
  */
  getBehaviourFromProps() : EditorBehaviour{
    return this.props.editorBehaviour ? this.props.editorBehaviour : {}
  }
  /*
    Get key mapping from props (if given and set the default one if given)
  */
  getKeyMappingFromProps() : 
    ((e : React.KeyboardEvent) => DraftEditorCommand | null) | undefined
  {
    const binder  = this.props.editorShortcut
    if(binder instanceof Function)
      return binder
    else if(typeof(binder) === 'boolean' && binder === true)
      return getDefaultKeyBinding
  }
  render() : React.ReactNode{
    const behaviour   = this.getBehaviourFromProps()
    const keyMapping  = this.getKeyMappingFromProps()
    const otherProps  = this.props.otherProps ? this.props.otherProps : {}
    return (
      <div className = 'text-editor'>
        <EditorContext.Provider value = {this.state}>
          <div className = 'text-editor-header'>
            {this.props.header ? this.props.header : ''}
          </div>
          <Editor
            editorState     = {this.state.editorState}
            onChange        = {this.setEditorState}
            handleKeyCommand= {this.handleKeyCommand}
            ref             = {this.editorRef}
            keyBindingFn    = {keyMapping}
            blockRendererFn = {blockRendererFn}
            {...behaviour}
            {...otherProps}
          />
        </EditorContext.Provider>
      </div>
    )
  }
}
