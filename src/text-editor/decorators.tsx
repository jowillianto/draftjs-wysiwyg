import { 
  ContentBlock, ContentState, DraftDecorator
} from "draft-js";
import React from "react";

export function generalEntitySearch(
  entity_name : string, 
  block : ContentBlock, 
  callback : (start : number, end : number) => void, 
  contentState : ContentState
){
  block.findEntityRanges((char) => {
    const entityKey   = char.getEntity()
    return(
      entityKey !== null && 
      contentState.getEntity(entityKey).getType() === entity_name
    )
  }, callback)
}

/* 
  Component Specification for Draft Decorator Component 
*/
export interface DraftDecoratorComponentProps{
  contentState  : ContentState, 
  entityKey     : string, 
  blockKey      : string,
  children      : React.ReactNode
}

/*
  Link 
*/
export function Link (props : DraftDecoratorComponentProps) : React.ReactNode{
  const {contentState, children, entityKey, ...other}   = props
  const {url, linkTest} = contentState.getEntity(entityKey).getData()
  return (
    <a href = {url}>
      {linkTest || props.children}
    </a>
  )
}

/* 
  Image 
*/
export function Image (props : DraftDecoratorComponentProps) : React.ReactNode{
  const {contentState, children, entityKey, ...other}   = props
  const { url }   = contentState.getEntity(entityKey).getData()
  return (
    <React.Fragment>
      <img src = {url} style = {{width : '50%'}} />
      <p style = {{visibility : 'hidden'}}>{props.children}</p>
    </React.Fragment>
  )
}

/*
  Create decorator with a given component and entity name
*/
export function createDecorator(
  entity_name : string, Component : Function
) : DraftDecorator{
  return {
    strategy : (
      block   : ContentBlock, 
      callback : (start : number, end : number) => void, 
      contentState : ContentState
    ) => generalEntitySearch(entity_name, block, callback, contentState),
    component : Component
  }
}

export default function getDefaultDecorators() : Array<DraftDecorator>{
  return [
    createDecorator('LINK', Link), 
    createDecorator('IMAGE', Image)
  ]
}
