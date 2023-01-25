import React from "react";
import { Editor, EditorState, DraftHandleValue, DraftEditorCommand, DraftDecorator } from 'draft-js';
import "./text-editor.css";
import { EditorBehaviour, TextEditorProps, TextEditorState } from './interface';
export declare const EditorContext: React.Context<TextEditorState>;
export default class TextEditor extends React.Component<TextEditorProps, TextEditorState> {
    editorRef: React.Ref<Editor>;
    constructor(props: TextEditorProps);
    getDefaultValue(props: TextEditorProps, decorators: Array<DraftDecorator>): EditorState;
    setEditorState: (state: EditorState) => void;
    handleKeyCommand: (command: string, state: EditorState, time: number) => DraftHandleValue;
    getBehaviourFromProps(): EditorBehaviour;
    getKeyMappingFromProps(): ((e: React.KeyboardEvent) => DraftEditorCommand | null) | undefined;
    render(): React.ReactNode;
}
