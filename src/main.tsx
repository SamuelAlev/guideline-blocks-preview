import '@frontify/fondue-tokens/styles';
import '@frontify/fondue/style';
import '@unocss/reset/tailwind.css';
import './fonts/fonts.css';
import 'virtual:uno.css';

import React, { StrictMode, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';

import { rootLoader } from './helpers/loader';

window.React = React;
window.ReactDOM = ReactDOM;

const Root = lazy(() => import('./Root').then((module) => ({ default: module.Root })));
const Embed = lazy(() => import('./Embed').then((module) => ({ default: module.Embed })));

const containerElement = document.getElementById('root');
if (!containerElement) {
    throw new Error('Root element not found');
}

const root = createRoot(containerElement);

const router = createBrowserRouter([
    {
        path: '/v1',
        children: [
            {
                index: true,
                loader: rootLoader,
                element: (
                    <Suspense fallback="Loading...">
                        <Root />
                    </Suspense>
                ),
            },
            {
                path: 'embed',
                loader: rootLoader,
                element: (
                    <Suspense fallback="Loading embed...">
                        <Embed />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: '*',
        loader: () => redirect('/v1'),
    },
]);

root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
