import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { LaravelReactI18nProvider } from 'laravel-react-i18n';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const a = import.meta.glob('/lang/*.json')
        // console.log(a);
        const root = createRoot(el);

        root.render(
            <LaravelReactI18nProvider
                locale={'ar'}
                fallbackLocale={'ar'}
                files={
                import.meta.glob('/lang/*.json')
                }
            >
                <App {...props}  />
            </LaravelReactI18nProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
