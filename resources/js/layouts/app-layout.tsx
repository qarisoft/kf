import { type BreadcrumbItem, type SharedData,  SideBarProps2 } from '@/types';
import { usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';
import AppLayoutTemplate from './sidebar/app-sidebar-layout';
import { adminNav, customerNav, nullNav, vendorNav } from '@/config';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}


export default function ({ children, breadcrumbs, ...props }: AppLayoutProps) {
    const { auth } = usePage<SharedData>().props;

    const sideBarProps_: () => SideBarProps2 = () => {
        const userType = auth?.user.type;
        if (userType != undefined) {
            if (userType === 'Vendor') return vendorNav;
            if (userType === 'Admin') return adminNav;
            if (userType === 'Customer') return customerNav;
        }
        return nullNav;
    };
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props} sideBarProps={sideBarProps_()}>
            {children}
        </AppLayoutTemplate>
    );
}
