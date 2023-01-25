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
import React from 'react';
import EditorLinkToggle from '../toggle/link-toggle';
import EditorImageToggle from '../toggle/image-toggle';
import EditorToggle from '../toggle/editor-toggle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faItalic, faUnderline, faListUl, faListOl, faCode, faQuoteLeft, faLink, faImage, faAlignCenter, faAlignJustify, faAlignLeft, faAlignRight } from "@fortawesome/free-solid-svg-icons";
var EditorHeader = /** @class */ (function (_super) {
    __extends(EditorHeader, _super);
    function EditorHeader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditorHeader.prototype.convertToLink = function (img) {
        var reader = new FileReader();
        return new Promise(function (res, rej) {
            reader.readAsDataURL(img);
            reader.addEventListener('loadend', function (ev) {
                res(reader.result);
            });
        });
    };
    EditorHeader.prototype.render = function () {
        return (_jsx("div", __assign({ className: 'editor-toggles' }, { children: _jsxs("div", __assign({ className: 'editor-toggle-text' }, { children: [_jsx(EditorToggle, __assign({ styleName: 'bold' }, { children: _jsx(FontAwesomeIcon, { icon: faBold }) })), _jsx(EditorToggle, __assign({ styleName: 'italic' }, { children: _jsx(FontAwesomeIcon, { icon: faItalic }) })), _jsx(EditorToggle, __assign({ styleName: 'underline' }, { children: _jsx(FontAwesomeIcon, { icon: faUnderline }) })), _jsx(EditorToggle, __assign({ styleName: 'ul' }, { children: _jsx(FontAwesomeIcon, { icon: faListUl }) })), _jsx(EditorToggle, __assign({ styleName: 'ol' }, { children: _jsx(FontAwesomeIcon, { icon: faListOl }) })), _jsx(EditorToggle, __assign({ styleName: 'blockquote' }, { children: _jsx(FontAwesomeIcon, { icon: faQuoteLeft }) })), _jsx(EditorToggle, __assign({ styleName: 'codeblock' }, { children: _jsx(FontAwesomeIcon, { icon: faCode }) })), _jsx(EditorToggle, __assign({ styleName: 'h1' }, { children: "H1" })), _jsx(EditorToggle, __assign({ styleName: 'h2' }, { children: "H2" })), _jsx(EditorToggle, __assign({ styleName: 'h3' }, { children: "H3" })), _jsx(EditorToggle, __assign({ styleName: 'h4' }, { children: "H4" })), _jsx(EditorToggle, __assign({ styleName: 'h5' }, { children: "H5" })), _jsx(EditorToggle, __assign({ styleName: 'h6' }, { children: "H6" })), _jsx(EditorToggle, __assign({ styleName: 'left' }, { children: _jsx(FontAwesomeIcon, { icon: faAlignLeft }) })), _jsx(EditorToggle, __assign({ styleName: 'center' }, { children: _jsx(FontAwesomeIcon, { icon: faAlignCenter }) })), _jsx(EditorToggle, __assign({ styleName: 'right' }, { children: _jsx(FontAwesomeIcon, { icon: faAlignRight }) })), _jsx(EditorToggle, __assign({ styleName: 'justify' }, { children: _jsx(FontAwesomeIcon, { icon: faAlignJustify }) })), _jsx(EditorLinkToggle, { children: _jsx(FontAwesomeIcon, { icon: faLink }) }), _jsx(EditorImageToggle, __assign({ convertToLink: this.convertToLink }, { children: _jsx(FontAwesomeIcon, { icon: faImage }) }))] })) })));
    };
    return EditorHeader;
}(React.Component));
export default EditorHeader;
