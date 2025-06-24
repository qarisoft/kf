import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function HeadingSmall({ title, description }: { title: string; description?: string }) {
    const {t}=useLaravelReactI18n()
    return (
        <header>
            <h3 className="mb-0.5 text-base font-medium">{t(title)}</h3>
            {description && <p className="text-muted-foreground text-sm">{t(description)}</p>}
        </header>
    );
}
