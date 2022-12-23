import React from "react"
import {
  Editor,
  EditorState,
  RichUtils,
  DraftHandleValue,
  getDefaultKeyBinding,
  DraftEditorCommand,
  DraftDecorator,
  RawDraftContentState, 
  CompositeDecorator,
  convertFromRaw,
  convertToRaw
} from 'draft-js'
import "./text-editor.css"
import getDefaultDecorators from "./decorators"

/*
  Editor Behaviour for Editor
*/
interface EditorBehaviour{
  autoCapitalize?   : string,
  autoComplete?     : string,
  autoCorrect?      : string,
  readOnly?         : boolean,
  spellCheck?       : boolean,
  stripPastedStyles?: boolean
}

/*
  Props accepted by Text editor
*/
interface TextEditorProps{
  header?         : React.ReactNode,
  editorBehaviour?: EditorBehaviour,
  editorShortcut? : ((e : React.KeyboardEvent) => DraftEditorCommand) | boolean
  onChange?       : (e : EditorState) => any, 
  defaultValue?   : RawDraftContentState, 
  otherProps?     : Object
}

/*
  State of Text Editor
*/
interface TextEditorState{
  editorState   : EditorState,
  setEditorState: (
    state : EditorState, decorator? : Record<string, DraftDecorator>
  ) => void
  decorators    : Array<DraftDecorator>
}

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
        return EditorState.createEmpty()
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
            {...behaviour}
            {...otherProps}
          />
        </EditorContext.Provider>
      </div>
    )
  }
}
