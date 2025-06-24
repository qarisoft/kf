import { useLang } from '@/hooks/use-lang';

export default function HeadingSmall({ title, description }: { title: string; description?: string }) {
    const {t}=useLang()
    return (
        <header>
            <h3 className="mb-0.5 text-base font-medium">{t(title)}</h3>
            {description && <p className="text-muted-foreground text-sm">{t(description)}</p>}
        </header>
    );
}
