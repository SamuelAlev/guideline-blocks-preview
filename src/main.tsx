import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';
import '@frontify/fondue-tokens/styles';
import '@frontify/fondue/style';
import './fonts.css';

import React from 'react';
import ReactDOM from 'react-dom';

window.React = React;
window.ReactDOM = ReactDOM;

import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { Root } from './Root';

const RedirectToV1 = () => {
    const { search } = useLocation();
    return <Navigate to={`/v1${search}`} replace />;
};

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/v1" element={<Root />} />
                <Route path="*" element={<RedirectToV1 />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);
