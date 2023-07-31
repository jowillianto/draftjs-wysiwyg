var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import { EditorBlock } from "draft-js";
import React from 'react';
function HOCWithClassName(elm) {
    return function (props) {
        var className = props.blockProps.className;
        return (React.createElement(elm, { className: className }, _jsx(EditorBlock, __assign({}, props))));
    };
}
export var ALIGNABLE = {
    'header-one': HOCWithClassName('h1'),
    'header-three': HOCWithClassName('h3'),
    'header-five': HOCWithClassName('h5'),
    'header-two': HOCWithClassName('h2'),
    'header-four': HOCWithClassName('h4'),
    'header-six': HOCWithClassName('h6'),
    'section': HOCWithClassName('section'),
    'article': HOCWithClassName('article'),
    'unstyled': HOCWithClassName('span'),
};
var CLASS_ALIGN = {
    center: 'text-editor-style-center',
    left: 'text-editor-style-left',
    right: 'text-editor-style-right',
    justify: 'text-editor-style-justify'
};
export default function blockStyleFn(block) {
    var blockType = block.getType();
    var splitBlock = blockType.split(' ');
    if (splitBlock.length === 2) {
        var main = splitBlock[0], align = splitBlock[1];
        var element = ALIGNABLE[main];
        if (element)
            return {
                component: element,
                editable: true,
                props: {
                    className: CLASS_ALIGN[align]
                }
            };
    }
}
export function getCurrentAlignment(state) {
    var content = state.getCurrentContent();
    var selection = state.getSelection();
    var block = content.getBlockForKey(selection.getEndKey());
    var blockType = block.getType();
    var splitBlock = blockType.split(' ');
    return splitBlock.length === 2 ?
        [splitBlock[0], splitBlock[1]] : [splitBlock[0], ''];
}
