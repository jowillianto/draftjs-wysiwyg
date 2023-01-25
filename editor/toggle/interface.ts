export const DRAFT_INLINE_STYLE : Record<string, string> = {
  'strike-through'  : "STRIKETHROUGH",
  bold              : "BOLD", 
  code              : "CODE", 
  italic            : "ITALIC", 
  underline         : "UNDERLINE"
}

export const DRAFT_BLOCK_TYPE : Record<string, string> = {
  h1      : 'header-one', 
  h2      : 'header-two', 
  h3      : 'header-three', 
  h4      : 'header-four', 
  h5      : 'header-five', 
  h6      : 'header-six', 
  section : 'section', 
  article : 'article', 
  ul      : 'unordered-list-item', 
  ol      : 'ordered-list-item', 
  blockquote : 'blockquote', 
  codeblock : 'code-block', 
  unstyled : 'unstyled'
}

export const DRAFT_BLOCK_ALIGNMENT_TYPE : Record<string, string> = {
  center  : 'center', 
  justify : 'justify',
  left    : 'left',
  right   : 'right'
}

const typeKeys  = [
  ...Object.keys(DRAFT_BLOCK_TYPE), ...Object.keys(DRAFT_INLINE_STYLE)
] as const
type ToggleType = typeof typeKeys[number]

export interface InlineToggleProps{
  styleName   : ToggleType,
  children    : React.ReactNode
}

export interface ImageToggleProps{
  children      : React.ReactNode
  convertToLink : (img : Blob) => Promise<string | ArrayBuffer | null>
}

export interface ImageToggleState{
  uploadedImg   : Blob | null, 
  dropDown      : boolean
}

export interface EditorLinkToggleProps{
  children    : React.ReactNode
  renderLink? : React.ReactElement
}
export interface EditorLinkToggleState{
  linkText      : string, 
  srcText       : string, 
  showDropDown  : boolean
}

