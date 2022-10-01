import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';

import React from 'react';
import ReactDOM from 'react-dom';

window.React = React;
window.ReactDOM = ReactDOM;

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Root } from './Root';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
    },
]);

ReactDOM.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
    document.getElementById('root'),
);
