import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App.jsx';
import { theme } from './utils/constants.js';
import { GlobalStyles } from './styles/GlobalStyles.js';
import "../src/styles/index.scss";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <GlobalStyles/>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
);
