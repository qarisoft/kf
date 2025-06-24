import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    const { t } = useLaravelReactI18n();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>{t('Platform')}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={item.href === (window?.location?.pathname ?? page.url)}
                            tooltip={{ children: t(item.title) }}
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{t(item.title)}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}

export function NavMain2({ departments }: { departments: { items: NavItem[]; title: string }[] }) {
    const page = usePage();

    const { t } = useLaravelReactI18n();
    return (
        <SidebarGroup className="px-2 py-0">
            {departments.map((department, i) => (
                <div key={department.title + i}>
                    <SidebarGroupLabel>{t(department.title)}</SidebarGroupLabel>
                    <SidebarMenu>
                        {department.items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={item.href === (window?.location?.pathname ?? page.url)}
                                    tooltip={{ children: t(item.title) }}
                                >
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{t(item.title)}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </div>
            ))}
        </SidebarGroup>
    );
}
