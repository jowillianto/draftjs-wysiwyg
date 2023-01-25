var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
export var DRAFT_INLINE_STYLE = {
    'strike-through': "STRIKETHROUGH",
    bold: "BOLD",
    code: "CODE",
    italic: "ITALIC",
    underline: "UNDERLINE"
};
export var DRAFT_BLOCK_TYPE = {
    h1: 'header-one',
    h2: 'header-two',
    h3: 'header-three',
    h4: 'header-four',
    h5: 'header-five',
    h6: 'header-six',
    section: 'section',
    article: 'article',
    ul: 'unordered-list-item',
    ol: 'ordered-list-item',
    blockquote: 'blockquote',
    codeblock: 'code-block',
    unstyled: 'unstyled'
};
export var DRAFT_BLOCK_ALIGNMENT_TYPE = {
    center: 'center',
    justify: 'justify',
    left: 'left',
    right: 'right'
};
var typeKeys = __spreadArray(__spreadArray([], Object.keys(DRAFT_BLOCK_TYPE), true), Object.keys(DRAFT_INLINE_STYLE), true);
