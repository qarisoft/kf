import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { useLang } from '@/hooks/use-lang';

export default function SettingsLayout({ children, navItems }: PropsWithChildren<{ navItems: NavItem[] }>) {
    const { t } = useLang()
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
        <div className="px-4 lg:py-6 ">
            <Heading title={t('Settings')} description={t('Manage your profile and account settings')} />

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48 overflow-y-auto">
                    <nav className="flex flex-row space-y-1 space-x-0 overflow-auto lg:flex-col overflow-y-auto">
                        {navItems.map((item, index) => (
                            <Button
                                key={`${item.href}-${index}`}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('mx-1 lg:w-full lg:mx-0 justify-start   ', {
                                    'bg-muted': currentPath === item.href,
                                })}
                            >
                                <Link
                                    href={item.href} prefetch
                                    className={'w-fi'}
                                >
                                    {t(item.title)}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                {/*<Separator className="my-6 md:hidden" />*/}

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">{children}</section>
                </div>
            </div>
        </div>
    );
}
