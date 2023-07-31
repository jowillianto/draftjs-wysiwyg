import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
export function generalEntitySearch(entity_name, block, callback, contentState) {
    block.findEntityRanges(function (char) {
        var entityKey = char.getEntity();
        return (entityKey !== null &&
            contentState.getEntity(entityKey).getType() === entity_name);
    }, callback);
}
/*
  Link
*/
export function Link(props) {
    var contentState = props.contentState;
    var entityKey = props.entityKey;
    var _a = contentState.getEntity(entityKey).getData(), url = _a.url, linkTest = _a.linkTest;
    return (_jsx("a", { href: url, children: linkTest || props.children }));
}
/*
  Image
*/
export function Image(props) {
    var contentState = props.contentState;
    var entityKey = props.entityKey;
    var url = contentState.getEntity(entityKey).getData().url;
    return (_jsxs(React.Fragment, { children: [_jsx("img", { src: url, style: { width: '50%' }, alt: 'uploaded' }), _jsx("p", { style: { visibility: 'hidden' }, children: props.children })] }));
}
/*
  Create decorator with a given component and entity name
*/
export function createDecorator(entity_name, Component) {
    return {
        strategy: function (block, callback, contentState) { return generalEntitySearch(entity_name, block, callback, contentState); },
        component: Component
    };
}
export default function getDefaultDecorators() {
    return [
        createDecorator('LINK', Link),
        createDecorator('IMAGE', Image)
    ];
}
