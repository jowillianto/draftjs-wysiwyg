import React from "react";
import { EditorContext } from '../text-editor/text-editor';
import { EditorState } from 'draft-js';
import { InlineToggleProps } from './interface';
export default class EditorToggle extends React.Component<InlineToggleProps> {
    static contextType: React.Context<import("../text-editor/interface").TextEditorState>;
    context: React.ContextType<typeof EditorContext>;
    toggleStyle: (ev?: React.MouseEvent) => void;
    setStateWithAlign(editorState: EditorState, style: string, align?: string): void;
    isActive(): string;
    onClick: (ev: React.MouseEvent) => void;
    render(): React.ReactNode;
}
