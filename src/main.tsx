import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';
import '@frontify/fondue-tokens/styles';
import '@frontify/fondue/style';
import './fonts/fonts.css';

import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';

window.React = React;
window.ReactDOM = ReactDOM;

const Root = lazy(() => import('./Root').then((module) => ({ default: module.Root })));
const Embed = lazy(() => import('./Embed').then((module) => ({ default: module.Embed })));

const RedirectToV1 = () => {
    const { search, pathname } = useLocation();
    return <Navigate to={`/v1${pathname}${search}`} replace />;
};

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/v1">
                    <Route
                        index
                        element={
                            <Suspense fallback="Loading...">
                                <Root />
                            </Suspense>
                        }
                    />
                    <Route
                        path="embed"
                        element={
                            <Suspense fallback="Loading embed...">
                                <Embed />
                            </Suspense>
                        }
                    />
                </Route>
                <Route path="*" element={<RedirectToV1 />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);
