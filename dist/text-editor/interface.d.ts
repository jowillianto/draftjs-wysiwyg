/// <reference types="react" />
import { EditorState, RawDraftContentState, DraftEditorCommand, DraftDecorator } from 'draft-js';
export interface EditorBehaviour {
    autoCapitalize?: string;
    autoComplete?: string;
    autoCorrect?: string;
    readOnly?: boolean;
    spellCheck?: boolean;
    stripPastedStyles?: boolean;
}
export interface TextEditorProps {
    header?: React.ReactNode;
    editorBehaviour?: EditorBehaviour;
    editorShortcut?: ((e: React.KeyboardEvent) => DraftEditorCommand) | boolean;
    onChange?: (e: EditorState) => any;
    defaultValue?: RawDraftContentState;
    otherProps?: Object;
}
export interface TextEditorState {
    editorState: EditorState;
    setEditorState: (state: EditorState, decorator?: Record<string, DraftDecorator>) => void;
    decorators: Array<DraftDecorator>;
}
