import { Head } from '@/components/head';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/settings-layout';
import { type BreadcrumbItem, NavItem } from '@/types';
import { PropsWithChildren } from 'react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: '/settings/profile',
        icon: null,
    },
    {
        title: 'Password',
        href: '/settings/password',
        icon: null,
    },
    {
        title: 'Appearance',
        href: '/settings/appearance',
        icon: null,
    },
];
export default function ({
    breadcrumbs,
    children,
    title,
}: PropsWithChildren<{
    title: string;
    breadcrumbs?: BreadcrumbItem[];
}>) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <SettingsLayout navItems={sidebarNavItems}>{children}</SettingsLayout>
        </AppLayout>
    );
}
