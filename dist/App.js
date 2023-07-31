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
import React from 'react';
import TextEditor from './editor/text-editor/text-editor';
import './index.css';
import { convertToRaw } from 'draft-js';
import EditorHeader from './editor/editor-header/editor-header';
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = this;
        var _a;
        _this = _super.call(this, props) || this;
        _this.updateEditor = function (state) {
            _this.setState({ editor: state });
        };
        _this.exportEditor = function (ev) {
            ev === null || ev === void 0 ? void 0 : ev.preventDefault();
            var fieldName = process.env.REACT_APP_HIDDEN_FIELD;
            var hidden = document.getElementById(fieldName);
            if (hidden && _this.state.editor) {
                hidden.value = JSON.stringify(convertToRaw(_this.state.editor.getCurrentContent()));
            }
        };
        _this.state = {
            editor: null
        };
        var initData = process.env.REACT_APP_INIT_DATA;
        var stringValue = (_a = document.getElementById(initData)) === null || _a === void 0 ? void 0 : _a.value;
        _this.defaultValue = JSON.parse(stringValue ? stringValue : '{}');
        var autoSaveDelay = parseInt(process.env.REACT_APP_SAVE_DELAY);
        setInterval(_this.exportEditor, autoSaveDelay);
        return _this;
    }
    App.prototype.render = function () {
        return (_jsxs(React.Fragment, { children: [_jsx(TextEditor, { header: _jsx(EditorHeader, {}), editorShortcut: true, onChange: this.updateEditor, defaultValue: this.defaultValue }), _jsx("button", { className: 'submit-button', onClick: this.exportEditor, children: "Save Draft" })] }));
    };
    return App;
}(React.Component));
export default App;
;
