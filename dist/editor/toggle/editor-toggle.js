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
import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { EditorContext } from '../text-editor/text-editor';
import { RichUtils } from 'draft-js';
import { ALIGNABLE, getCurrentAlignment } from "../align-map/align-map";
import { DRAFT_INLINE_STYLE, DRAFT_BLOCK_ALIGNMENT_TYPE, DRAFT_BLOCK_TYPE } from './interface';
var EditorToggle = /** @class */ (function (_super) {
    __extends(EditorToggle, _super);
    function EditorToggle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toggleStyle = function (ev) {
            ev === null || ev === void 0 ? void 0 : ev.preventDefault();
            var styleName = _this.props.styleName;
            var editorState = _this.context.editorState;
            // For the condition branches
            var inlineMap = DRAFT_INLINE_STYLE[styleName];
            var blockMap = DRAFT_BLOCK_TYPE[styleName];
            var alignment = DRAFT_BLOCK_ALIGNMENT_TYPE[styleName];
            // branches
            if (inlineMap) {
                var style = DRAFT_INLINE_STYLE[styleName];
                var newState = RichUtils.toggleInlineStyle(editorState, style);
                _this.context.setEditorState(newState);
            }
            else if (blockMap) {
                var splitBlock = getCurrentAlignment(editorState);
                var style = DRAFT_BLOCK_TYPE[styleName];
                var alignable = style in ALIGNABLE;
                if (splitBlock[1] !== '') {
                    var main = splitBlock[0], align = splitBlock[1];
                    if (alignable)
                        _this.setStateWithAlign(editorState, style, align);
                    else
                        _this.setStateWithAlign(editorState, style);
                }
                else {
                    if (alignable)
                        _this.setStateWithAlign(editorState, style, 'left');
                    else
                        _this.setStateWithAlign(editorState, style);
                }
            }
            else if (alignment) {
                var splitBlock = getCurrentAlignment(editorState);
                var style = DRAFT_BLOCK_ALIGNMENT_TYPE[styleName];
                var alignable = splitBlock[0] in ALIGNABLE;
                if (splitBlock[1] !== '') {
                    var main = splitBlock[0], align = splitBlock[1];
                    _this.setStateWithAlign(editorState, main, style);
                }
                else if (alignable)
                    _this.setStateWithAlign(editorState, splitBlock[0], style);
            }
            else {
                console.warn("".concat(styleName, " is not a valid type"));
            }
        };
        _this.onClick = function (ev) {
            ev.preventDefault();
        };
        return _this;
    }
    EditorToggle.prototype.setStateWithAlign = function (editorState, style, align) {
        if (align)
            this.context.setEditorState(RichUtils.toggleBlockType(editorState, "".concat(style, " ").concat(align)));
        else
            this.context.setEditorState(RichUtils.toggleBlockType(editorState, "".concat(style)));
    };
    EditorToggle.prototype.isActive = function () {
        var styleName = this.props.styleName;
        var inlineMap = DRAFT_INLINE_STYLE[styleName];
        var blockMap = DRAFT_BLOCK_TYPE[styleName];
        var alignment = DRAFT_BLOCK_ALIGNMENT_TYPE[styleName];
        if (inlineMap) {
            var styleSet = this.context.editorState.getCurrentInlineStyle();
            return styleSet.includes(inlineMap) ? 'active' : '';
        }
        else if (blockMap) {
            var splitBlock = getCurrentAlignment(this.context.editorState);
            if (splitBlock.length === 2) {
                var main = splitBlock[0], align = splitBlock[1];
                return main === blockMap ? 'active' : '';
            }
            else {
                return splitBlock[0] === blockMap ? 'active' : '';
            }
        }
        else if (alignment) {
            var splitBlock = getCurrentAlignment(this.context.editorState);
            if (splitBlock.length === 2) {
                var main = splitBlock[0], align = splitBlock[1];
                return align === alignment ? 'active' : '';
            }
            else
                return '';
        }
        else
            return '';
    };
    EditorToggle.prototype.render = function () {
        var active = this.isActive();
        return (_jsx("div", { className: "inline-toggle text-editor-toggle ".concat(active), children: _jsx("button", { onMouseDown: this.toggleStyle, onClick: this.onClick, children: this.props.children }) }));
    };
    EditorToggle.contextType = EditorContext;
    return EditorToggle;
}(React.Component));
export default EditorToggle;
