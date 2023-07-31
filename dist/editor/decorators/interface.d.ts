/// <reference types="react" />
import { ContentState } from 'draft-js';
export interface DraftDecoratorComponentProps {
    contentState: ContentState;
    entityKey: string;
    blockKey: string;
    children: React.ReactNode;
}
