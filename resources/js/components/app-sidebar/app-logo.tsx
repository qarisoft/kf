import AppLogoIcon from './app-logo-icon';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function AppLogo() {
    const {t}=useLaravelReactI18n()
    return (
        <>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
            <div className="ms-1 grid flex-1 text-start text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">{t('Kafeel')}</span>
            </div>
        </>
    );
}
