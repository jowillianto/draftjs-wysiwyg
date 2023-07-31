import { ContentBlock, ContentState, DraftDecorator } from "draft-js";
import React from "react";
import { DraftDecoratorComponentProps } from "./interface";
export declare function generalEntitySearch(entity_name: string, block: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState): void;
export declare function Link(props: DraftDecoratorComponentProps): React.ReactNode;
export declare function Image(props: DraftDecoratorComponentProps): React.ReactNode;
export declare function createDecorator(entity_name: string, Component: Function): DraftDecorator;
export default function getDefaultDecorators(): Array<DraftDecorator>;
