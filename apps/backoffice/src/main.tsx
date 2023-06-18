import React from 'react';
import ReactDOM from 'react-dom/client';

import { Toaster } from '@big/ui';

import { ReactQueryClientProvider } from './providers/query-provider.tsx';
import App from './App.tsx';

import './index.css';

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
    <React.StrictMode>
        <ReactQueryClientProvider>
            <Toaster />
            <App />
        </ReactQueryClientProvider>
    </React.StrictMode>,
);
