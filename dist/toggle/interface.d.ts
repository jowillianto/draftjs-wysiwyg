/// <reference types="react" />
export declare const DRAFT_INLINE_STYLE: Record<string, string>;
export declare const DRAFT_BLOCK_TYPE: Record<string, string>;
export declare const DRAFT_BLOCK_ALIGNMENT_TYPE: Record<string, string>;
declare const typeKeys: readonly string[];
type ToggleType = typeof typeKeys[number];
export interface InlineToggleProps {
    styleName: ToggleType;
    children: React.ReactNode;
}
export interface ImageToggleProps {
    children: React.ReactNode;
    convertToLink: (img: Blob) => Promise<string | ArrayBuffer | null>;
}
export interface ImageToggleState {
    uploadedImg: Blob | null;
    dropDown: boolean;
}
export interface EditorLinkToggleProps {
    children: React.ReactNode;
    renderLink?: React.ReactElement;
}
export interface EditorLinkToggleState {
    linkText: string;
    srcText: string;
    showDropDown: boolean;
}
export {};
