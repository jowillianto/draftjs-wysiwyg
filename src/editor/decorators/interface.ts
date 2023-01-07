import {
  ContentState
} from 'draft-js'
/* 
  Component Specification for Draft Decorator Component 
*/
export interface DraftDecoratorComponentProps{
  contentState  : ContentState, 
  entityKey     : string, 
  blockKey      : string,
  children      : React.ReactNode
}