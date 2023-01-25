import { ContentBlock, EditorState } from "draft-js";
import React from 'react';
import { DraftBlockComponentProps, DraftRenderer } from "./interface";
export declare const ALIGNABLE: Record<string, React.FC<DraftBlockComponentProps>>;
export default function blockStyleFn(block: ContentBlock): DraftRenderer | undefined;
export declare function getCurrentAlignment(state: EditorState): [string, string];
