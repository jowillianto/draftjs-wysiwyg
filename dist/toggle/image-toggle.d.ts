import React from "react";
import { EditorContext } from "../text-editor/text-editor";
import { ImageToggleProps, ImageToggleState } from './interface';
export default class EditorImageToggle extends React.Component<ImageToggleProps, ImageToggleState> {
    static contextType: React.Context<import("../text-editor/interface").TextEditorState>;
    static ENTITY_NAME: string;
    static DEFAULT_CSS: {
        width: string;
    };
    context: React.ContextType<typeof EditorContext>;
    constructor(props: ImageToggleProps);
    addImage: (ev?: React.MouseEvent) => Promise<unknown> | undefined;
    toggleDropDown: (ev?: React.MouseEvent) => void;
    uploadFile: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: (ev: React.MouseEvent) => void;
    render(): React.ReactNode;
}
