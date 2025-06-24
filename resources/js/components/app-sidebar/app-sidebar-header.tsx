import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useInitials } from '@/hooks/use-initials';
import { Auth, type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { usePage } from '@inertiajs/react';
import { Breadcrumbs } from './breadcrumbs';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const {
        props: {
            auth: { user },
        },
    } = usePage<{ auth: Auth }>();
    const getInitials = useInitials();
    return (
        <header className="border-sidebar-border/50 flex h-14 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="w-ful flex items-center justify-between gap-2">
                <SidebarTrigger className="-ms-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className="flex-1"></div>
            <div className="max-sm:block hidden">
                {user && (
                    <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                        <AvatarImage src={user.avatar} alt={user.first_name} />
                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                            {getInitials(user.first_name)}
                        </AvatarFallback>
                    </Avatar>
                )}
            </div>
        </header>
    );
}
