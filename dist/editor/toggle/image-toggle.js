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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CompositeDecorator, EditorState, Modifier } from "draft-js";
import React from "react";
import { EditorContext } from "../text-editor/text-editor";
var EditorImageToggle = /** @class */ (function (_super) {
    __extends(EditorImageToggle, _super);
    function EditorImageToggle(props) {
        var _this = _super.call(this, props) || this;
        /*
          Add the image
        */
        _this.addImage = function (ev) {
            ev === null || ev === void 0 ? void 0 : ev.preventDefault();
            var imgData = _this.state.uploadedImg;
            if (imgData === null)
                return;
            return new Promise(function (res, rej) {
                _this.props.convertToLink(imgData)
                    .then(function (url) {
                    var editorState = _this.context.editorState;
                    var content = editorState.getCurrentContent();
                    content.createEntity(EditorImageToggle.ENTITY_NAME, 'IMMUTABLE', { url: url });
                    var entityKey = content.getLastCreatedEntityKey();
                    var selection = _this.context.editorState.getSelection();
                    var newContent = Modifier.insertText(content, selection, "An Image", editorState.getCurrentInlineStyle(), entityKey);
                    var newState = EditorState.createWithContent(newContent, new CompositeDecorator(_this.context.decorators));
                    var moveCursor = EditorState.moveFocusToEnd(newState);
                    _this.context.setEditorState(moveCursor);
                    _this.toggleDropDown();
                })
                    .catch(function (err) {
                    console.error(err);
                    rej();
                });
            });
        };
        /*
          Toggle DropDown
        */
        _this.toggleDropDown = function (ev) {
            ev === null || ev === void 0 ? void 0 : ev.preventDefault();
            _this.setState({
                uploadedImg: null,
                dropDown: !_this.state.dropDown
            });
        };
        _this.uploadFile = function (ev) {
            _this.setState({
                uploadedImg: ev.target.files ? ev.target.files[0] : null
            });
        };
        _this.onClick = function (ev) {
            ev.preventDefault();
        };
        _this.state = {
            uploadedImg: null,
            dropDown: false
        };
        return _this;
    }
    EditorImageToggle.prototype.render = function () {
        return (_jsxs("div", { className: 'img-toggle text-editor-toggle', children: [_jsx("button", { onMouseDown: this.toggleDropDown, onClick: this.onClick, children: this.props.children }), this.state.dropDown &&
                    _jsx("div", { className: 'upload-bg', children: _jsxs("div", { className: 'img-toggle-dropdown text-editor-toggle upload-msgbox', children: [_jsx("div", { className: 'img-toggle-upload', children: _jsx("input", { type: 'file', onChange: this.uploadFile }) }), _jsxs("div", { className: 'upload-btns', children: [_jsx("button", { onClick: this.onClick, onMouseDown: this.toggleDropDown, children: "Cancel" }), _jsx("button", { className: 'img-toggle-add', onMouseDown: this.addImage, onClick: this.onClick, children: _jsx("p", { children: "Add" }) })] })] }) })] }));
    };
    EditorImageToggle.contextType = EditorContext;
    EditorImageToggle.ENTITY_NAME = 'IMAGE';
    EditorImageToggle.DEFAULT_CSS = { width: '50%' };
    return EditorImageToggle;
}(React.Component));
export default EditorImageToggle;
