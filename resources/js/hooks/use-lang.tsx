import { usePage } from '@inertiajs/react';

type Replaces = Record<string, string | number>;
type LangValue = string | { [key: string]: string | LangValue };
type LangObject = Record<string, LangValue>;

export function useLang() {
    const { lang: lang1, lang_json ,locale} = usePage<{ lang: LangObject; lang_json: Record<string, string>,locale:'ar'|'en' }>().props;
    const lang = { ...lang_json, lang1 };

    function trans(key: string, replaces: Replaces | string = {}): string {
        const raw = getValueFromKey(key);
        if (typeof raw !== 'string') return key;

        let translated = raw;

        if (typeof replaces === 'string') {
            translated += ' ' + replaces;
        } else if (typeof replaces === 'object') {
            translated = replacePlaceholders(translated, replaces);
        }

        return translated;
    }

    function __(key: string, replaces: Replaces | string = {}) {
        return trans(key, replaces);
    }
    function t(key: string, replaces: Replaces | string = {}) {
        return trans(key, replaces);
    }

    function replacePlaceholders(text: string, replaces: Replaces): string {
        return Object.entries(replaces).reduce((acc, [key, val]) => acc.replaceAll(`{${key}}`, String(val)), text);
    }

    function getValueFromKey(key: string): string | undefined {
        const segments = key.split('.');
        let current: any = lang;

        for (const segment of segments) {
            if (typeof current !== 'object' || current === null) return undefined;
            current = current[segment];
        }

        return typeof current === 'string' ? current : undefined;
    }
    const side:'right'|'left' = locale=='ar'?'right':'left'
    const dir:'ltr'|'rtl' = locale=='ar'?'rtl':'ltr'

    return { t, trans, __ ,currentLocale:locale,side,dir};
}
