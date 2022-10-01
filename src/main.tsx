import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';
import '@frontify/fondue-tokens/styles';
import '@frontify/fondue/style';
import './fonts.css';

import React from 'react';
import ReactDOM from 'react-dom';

window.React = React;
window.ReactDOM = ReactDOM;

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Root } from './Root';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Root />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);
