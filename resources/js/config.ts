import { SideBarProps2 } from '@/types';
import { BookOpen, Folder, LayoutGrid } from 'lucide-react';

const adminNav: SideBarProps2 = {
    mainNavItems: [
        {
            title:'General',
            items:[
                {
                    title: 'Dashboard',
                    href: '/admin',
                    icon: LayoutGrid,
                },
            ]
        },
        {
            title:'services',
            items:[
                {
                    title: 'Service',
                    href: '/admin/services',
                    icon: LayoutGrid,
                },
                {
                    title: 'Service Categories',
                    href: '/admin/services/categories',
                    icon: LayoutGrid,
                },

            ]
        },
        {
            title:'Vendors',
            items:[
                {
                    title: 'Vendors',
                    href: '/admin/vendors',
                    icon: LayoutGrid,
                },
            ]

        }

    ],
    footerNavItems: [
        {
            title: 'Repository',
            href: '#',
            icon: Folder,
        },
        {
            title: 'Documentation',
            href: '#',
            icon: BookOpen,
        },
    ],
};
const vendorNav: SideBarProps2 = {
    mainNavItems: [
        {
            title:'',items:[
                {
                    title: 'Dashboard',
                    href: '/vendor',
                    icon: LayoutGrid,
                },
                {
                    title: 'balance',
                    href: '/balance',
                    icon: LayoutGrid,
                },
                {
                    title: 'Buying',
                    href: '/buying',
                    icon: LayoutGrid,
                },
                {
                    title: 'Services',
                    href: '/vendor/services',
                    icon: LayoutGrid,
                },
            ]
        }

    ],
    footerNavItems: [
        {
            title: 'Help',
            href: '#',
            icon: Folder,
        },

    ],
};
const customerNav: SideBarProps2 = {
    mainNavItems: [
        {
            title:'',items:[
                {
                    title: 'Dashboard',
                    href: '/dashboard',
                    icon: LayoutGrid,
                },
                {
                    title: 'Buying',
                    href: '/buying',
                    icon: LayoutGrid,
                },
                {
                    title: 'Balance',
                    href: '/balance',
                    icon: LayoutGrid,
                },

            ]
        },

    ],
    footerNavItems: [

    ],
};
const nullNav: SideBarProps2 = {
    mainNavItems: [],
    footerNavItems: [],
};


export {adminNav, vendorNav, customerNav, nullNav};
