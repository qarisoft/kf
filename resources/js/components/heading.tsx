import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function Heading({ title, description }: { title: string; description?: string }) {
    const {t}=useLaravelReactI18n()
    return (
        <div className="mb-8 space-y-0.5">
            <h2 className="text-xl font-semibold tracking-tight">{t(title)}</h2>
            {description && <p className="text-muted-foreground text-sm">{t(description)}</p>}
        </div>
    );
}
