import { Head as Header } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
export function Head({title,children}:PropsWithChildren<{title:string}>) {
    const {t}=useLaravelReactI18n()
    return (
        <Header title={t(title)} children={children} />
    )
}
