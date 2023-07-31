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
import React from "react";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, CompositeDecorator, convertFromRaw } from 'draft-js';
import "./text-editor.css";
import getDefaultDecorators from "../decorators/decorators";
import blockRendererFn from "../align-map/align-map";
/*
  Context owned by the editor
*/
export var EditorContext = React.createContext({
    editorState: EditorState.createEmpty(),
    setEditorState: function (state) { },
    decorators: []
});
/*
  Text editor class
*/
var TextEditor = /** @class */ (function (_super) {
    __extends(TextEditor, _super);
    function TextEditor(props) {
        var _this = _super.call(this, props) || this;
        // Main Handler
        /*
          Set the editor state
        */
        _this.setEditorState = function (state) {
            _this.setState({
                editorState: state
            });
            if (_this.props.onChange)
                _this.props.onChange(state);
        };
        /*
          Handle keys command, input, etc.
        */
        _this.handleKeyCommand = function (command, state, time) {
            var defaultHandler = RichUtils.handleKeyCommand(state, command);
            if (defaultHandler) {
                _this.setEditorState(defaultHandler);
                return 'handled';
            }
            return 'not-handled';
        };
        var decorators = getDefaultDecorators();
        _this.state = {
            editorState: _this.getDefaultValue(props, decorators),
            setEditorState: _this.setEditorState,
            decorators: decorators
        };
        _this.editorRef = React.createRef();
        return _this;
    }
    /*
      GET the default value for the editor
    */
    TextEditor.prototype.getDefaultValue = function (props, decorators) {
        var defaultValue = props.defaultValue;
        if (defaultValue) {
            try {
                return EditorState.createWithContent(convertFromRaw(defaultValue), new CompositeDecorator(decorators));
            }
            catch (_a) {
                return EditorState.createEmpty();
            }
        }
        else
            return EditorState.createEmpty(new CompositeDecorator(decorators));
    };
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
            return getDefaultKeyBinding;
    };
    TextEditor.prototype.render = function () {
        var behaviour = this.getBehaviourFromProps();
        var keyMapping = this.getKeyMappingFromProps();
        var otherProps = this.props.otherProps ? this.props.otherProps : {};
        return (_jsx("div", { className: 'text-editor', children: _jsxs(EditorContext.Provider, { value: this.state, children: [_jsx("div", { className: 'text-editor-header', children: this.props.header ? this.props.header : '' }), _jsx(Editor, __assign({ editorState: this.state.editorState, onChange: this.setEditorState, handleKeyCommand: this.handleKeyCommand, ref: this.editorRef, keyBindingFn: keyMapping, blockRendererFn: blockRendererFn }, behaviour, otherProps))] }) }));
    };
    return TextEditor;
}(React.Component));
export default TextEditor;
