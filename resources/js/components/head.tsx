import { Head as Header } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { useLang } from '@/hooks/use-lang';
export function Head({title,children}:PropsWithChildren<{title:string}>) {
    const {t}=useLang()
    return (
        <Header title={t(title)} children={children} />
    )
}
