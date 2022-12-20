"use strict";
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
exports.__esModule = true;
exports.EditorContext = void 0;
var react_1 = require("react");
var draft_js_1 = require("draft-js");
require("./text-editor.css");
exports.EditorContext = react_1["default"].createContext({
    editorState: draft_js_1.EditorState.createEmpty(),
    setEditorState: function (state) { },
    decorators: {}
});
var TextEditor = /** @class */ (function (_super) {
    __extends(TextEditor, _super);
    function TextEditor(props) {
        var _this = _super.call(this, props) || this;
        // Main Handler
        /*
          Set the editor state
        */
        _this.setEditorState = function (state, decorator) {
            if (decorator)
                _this.setState({
                    editorState: state, decorators: decorator
                });
            else
                _this.setState({
                    editorState: state
                });
        };
        /*
          Handle keys command, input, etc.
        */
        _this.handleKeyCommand = function (command, state, time) {
            var defaultHandler = draft_js_1.RichUtils.handleKeyCommand(state, command);
            if (defaultHandler) {
                _this.setEditorState(defaultHandler);
                return 'handled';
            }
            return 'not-handled';
        };
        _this.state = {
            editorState: draft_js_1.EditorState.createEmpty(),
            setEditorState: _this.setEditorState,
            decorators: {}
        };
        _this.editorRef = react_1["default"].createRef();
        return _this;
    }
    // Props Handling
    /*
      An If statement to parse EditorBehaviour in props
    */
    TextEditor.prototype.getBehaviourFromProps = function () {
        return this.props.editorBehaviour ? this.props.editorBehaviour : {};
    };
    /*
      Get key mapping from props (if given and set the default one if given)
    */
    TextEditor.prototype.getKeyMappingFromProps = function () {
        var binder = this.props.editorShortcut;
        if (binder instanceof Function)
            return binder;
        else if (typeof (binder) === 'boolean' && binder === true)
            return draft_js_1.getDefaultKeyBinding;
    };
    TextEditor.prototype.render = function () {
        var behaviour = this.getBehaviourFromProps();
        var keyMapping = this.getKeyMappingFromProps();
        return (react_1["default"].createElement("div", { className: 'text-editor' },
            react_1["default"].createElement(exports.EditorContext.Provider, { value: this.state },
                react_1["default"].createElement("div", { className: 'text-editor-header' }, this.props.header ? this.props.header : ''),
                react_1["default"].createElement(draft_js_1.Editor, __assign({ editorState: this.state.editorState, onChange: this.setEditorState, handleKeyCommand: this.handleKeyCommand, ref: this.editorRef, keyBindingFn: keyMapping }, behaviour)))));
    };
    return TextEditor;
}(react_1["default"].Component));
exports["default"] = TextEditor;
