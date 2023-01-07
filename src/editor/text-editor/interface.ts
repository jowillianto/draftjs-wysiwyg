import {
  EditorState,
  RawDraftContentState,
  DraftEditorCommand,
  DraftDecorator
} from 'draft-js'
/*
  Editor Behaviour for Editor
*/
export interface EditorBehaviour{
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
export interface TextEditorProps{
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
export interface TextEditorState{
  editorState   : EditorState,
  setEditorState: (
    state : EditorState, decorator? : Record<string, DraftDecorator>
  ) => void
  decorators    : Array<DraftDecorator>
}
