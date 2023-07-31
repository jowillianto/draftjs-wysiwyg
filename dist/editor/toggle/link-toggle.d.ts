import React from 'react';
import { EditorContext } from '../text-editor/text-editor';
import { EditorLinkToggleProps, EditorLinkToggleState } from './interface';
export default class EditorLinkToggle extends React.Component<EditorLinkToggleProps, EditorLinkToggleState> {
    static contextType: React.Context<import("../text-editor/interface").TextEditorState>;
    context: React.ContextType<typeof EditorContext>;
    static ENTITY_NAME: string;
    constructor(props: EditorLinkToggleProps);
    toggleDropDown: (ev?: React.MouseEvent) => void;
    onTextChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    onLinkChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    addLink: (ev?: React.MouseEvent) => void;
    onClick: (ev: React.MouseEvent) => void;
    render(): React.ReactNode;
}
