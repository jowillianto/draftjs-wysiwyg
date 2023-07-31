import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import App from './App';
var root = createRoot(document.getElementById(process.env.REACT_APP_ROOT_KEY));
root.render(_jsx(App, {}));
