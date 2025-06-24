import { AppContent } from '@/components/app-sidebar/app-content';
import { AppShell } from '@/components/app-sidebar/app-shell';
import { AppSidebar } from '@/components/app-sidebar/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar/app-sidebar-header';
import { type BreadcrumbItem, type SideBarProps, SideBarProps2 } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
    sideBarProps,
}: PropsWithChildren<{
    breadcrumbs?: BreadcrumbItem[];
    sideBarProps: SideBarProps2;
}>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar {...sideBarProps} />
            <AppContent variant="sidebar" className={''}>
                {/*h-14*/}
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <div
                    // style={{height}}
                    className={
                    'overflow-auto  aa  '+
                    'h-[calc(100dvh-3.5rem-16px)] group-has-data-[collapsible=icon]/sidebar-wrapper:h-[calc(100dvh-3rem-16px)] '+
                    'md:w-[calc(100dvw-var(--sidebar-width)-2px)] group-has-data-[collapsible=icon]/sidebar-wrapper:w-[calc(100dvw-var(--sidebar-width-icon)-(--spacing(4))-2px)] '+
                    'transition-all duration-200 ease-linear p-4'
                }>{children}</div>
            </AppContent>
        </AppShell>
    );
}
