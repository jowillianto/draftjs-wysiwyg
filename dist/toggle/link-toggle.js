var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CompositeDecorator, EditorState, Modifier } from 'draft-js';
import React from 'react';
import { EditorContext } from '../text-editor/text-editor';
var EditorLinkToggle = /** @class */ (function (_super) {
    __extends(EditorLinkToggle, _super);
    function EditorLinkToggle(props) {
        var _this = _super.call(this, props) || this;
        /*
          Toggle Dropdown for form filling
        */
        _this.toggleDropDown = function (ev) {
            ev === null || ev === void 0 ? void 0 : ev.preventDefault();
            _this.setState({
                linkText: '',
                srcText: '',
                showDropDown: !_this.state.showDropDown
            });
        };
        /*
          Handle form changing
        */
        _this.onTextChange = function (ev) {
            _this.setState({ linkText: ev.target.value });
        };
        _this.onLinkChange = function (ev) {
            _this.setState({ srcText: ev.target.value });
        };
        /*
          Add the link to the editor
        */
        _this.addLink = function (ev) {
            ev === null || ev === void 0 ? void 0 : ev.preventDefault();
            var linkLabel = _this.state.linkText;
            var linkUrl = _this.state.srcText;
            var editorState = _this.context.editorState;
            var content = editorState.getCurrentContent();
            // Create the entity
            content.createEntity(EditorLinkToggle.ENTITY_NAME, 'MUTABLE', { url: linkUrl, });
            var entityKey = content.getLastCreatedEntityKey();
            var selection = _this.context.editorState.getSelection();
            var newContent = Modifier.insertText(content, selection, linkLabel, editorState.getCurrentInlineStyle(), entityKey);
            var newState = EditorState.createWithContent(newContent, new CompositeDecorator(_this.context.decorators));
            var moveCursor = EditorState.moveFocusToEnd(newState);
            _this.context.setEditorState(moveCursor);
            _this.toggleDropDown();
        };
        _this.onClick = function (ev) {
            ev.preventDefault();
        };
        _this.state = {
            linkText: '',
            srcText: '',
            showDropDown: false
        };
        return _this;
    }
    EditorLinkToggle.prototype.render = function () {
        return (_jsxs("div", __assign({ className: 'link-toggle text-editor-toggle' }, { children: [_jsx("button", __assign({ onMouseDown: this.toggleDropDown, onClick: this.onClick }, { children: this.props.children })), this.state.showDropDown &&
                    _jsx("div", __assign({ className: 'upload-bg' }, { children: _jsxs("div", __assign({ className: 'link-toggle-dropdown text-editor-toggle upload-msgbox' }, { children: [_jsxs("div", __assign({ className: 'link-toggle-text text-editor-toggle' }, { children: [_jsx("p", { children: "Name" }), _jsx("input", { type: 'text', onChange: this.onTextChange })] })), _jsxs("div", __assign({ className: 'link-toggle-href text-editor-toggle' }, { children: [_jsx("p", { children: "Link" }), _jsx("input", { type: 'url', onChange: this.onLinkChange })] })), _jsxs("div", __assign({ className: 'upload-btns' }, { children: [_jsx("button", __assign({ onClick: this.onClick, onMouseDown: this.toggleDropDown }, { children: "Cancel" })), _jsx("button", __assign({ className: 'link-toggle-add', onMouseDown: this.addLink, onClick: this.onClick }, { children: _jsx("p", { children: "Add" }) }))] }))] })) }))] })));
    };
    EditorLinkToggle.contextType = EditorContext;
    EditorLinkToggle.ENTITY_NAME = 'LINK';
    return EditorLinkToggle;
}(React.Component));
export default EditorLinkToggle;
