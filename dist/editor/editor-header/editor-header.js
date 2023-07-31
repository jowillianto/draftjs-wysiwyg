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
        return (_jsx("div", { className: 'editor-toggles', children: _jsxs("div", { className: 'editor-toggle-text', children: [_jsx(EditorToggle, { styleName: 'bold', children: _jsx(FontAwesomeIcon, { icon: faBold }) }), _jsx(EditorToggle, { styleName: 'italic', children: _jsx(FontAwesomeIcon, { icon: faItalic }) }), _jsx(EditorToggle, { styleName: 'underline', children: _jsx(FontAwesomeIcon, { icon: faUnderline }) }), _jsx(EditorToggle, { styleName: 'ul', children: _jsx(FontAwesomeIcon, { icon: faListUl }) }), _jsx(EditorToggle, { styleName: 'ol', children: _jsx(FontAwesomeIcon, { icon: faListOl }) }), _jsx(EditorToggle, { styleName: 'blockquote', children: _jsx(FontAwesomeIcon, { icon: faQuoteLeft }) }), _jsx(EditorToggle, { styleName: 'codeblock', children: _jsx(FontAwesomeIcon, { icon: faCode }) }), _jsx(EditorToggle, { styleName: 'h1', children: "H1" }), _jsx(EditorToggle, { styleName: 'h2', children: "H2" }), _jsx(EditorToggle, { styleName: 'h3', children: "H3" }), _jsx(EditorToggle, { styleName: 'h4', children: "H4" }), _jsx(EditorToggle, { styleName: 'h5', children: "H5" }), _jsx(EditorToggle, { styleName: 'h6', children: "H6" }), _jsx(EditorToggle, { styleName: 'left', children: _jsx(FontAwesomeIcon, { icon: faAlignLeft }) }), _jsx(EditorToggle, { styleName: 'center', children: _jsx(FontAwesomeIcon, { icon: faAlignCenter }) }), _jsx(EditorToggle, { styleName: 'right', children: _jsx(FontAwesomeIcon, { icon: faAlignRight }) }), _jsx(EditorToggle, { styleName: 'justify', children: _jsx(FontAwesomeIcon, { icon: faAlignJustify }) }), _jsx(EditorLinkToggle, { children: _jsx(FontAwesomeIcon, { icon: faLink }) }), _jsx(EditorImageToggle, { convertToLink: this.convertToLink, children: _jsx(FontAwesomeIcon, { icon: faImage }) })] }) }));
    };
    return EditorHeader;
}(React.Component));
export default EditorHeader;
