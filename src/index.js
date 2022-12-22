import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById(process.env.REACT_APP_ROOT_KEY))
root.render(<App />);