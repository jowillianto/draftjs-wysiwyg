/// <reference types="react" />
import { ContentBlock, ContentState } from 'draft-js';
export interface DraftBlockComponentProps extends React.PropsWithChildren {
    block: ContentBlock;
    contentState: ContentState;
    blockProps: {
        className: string;
        src?: string;
    };
}
export interface DraftRenderer {
    component: React.FC<DraftBlockComponentProps>;
    editable: boolean;
    props: Object;
}
