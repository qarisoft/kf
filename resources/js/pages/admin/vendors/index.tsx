import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PaginatedData, ProfileObject, SpecialityObject, User, VendorObject, WithTimeStamp } from '@/types';
import { Head } from '@inertiajs/react';

import DataTablePage, { selectColumn } from '@/components/data-table-page';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useInitials } from '@/hooks/use-initials';
import { ColumnDef } from '@tanstack/react-table';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { CheckCircle2Icon, LoaderIcon, MoreHorizontal } from 'lucide-react';
// import { Checkbox } from '@/components/ui/checkbox';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Vendors',
        href: '/admin/vendors',
    },
];
type UserWithProfile = User & { profile: WithTimeStamp<ProfileObject> };
type Vendor = WithTimeStamp<VendorObject & { user: UserWithProfile } & { specialities: SpecialityObject[] }>;

function getVendorStatus(v: Vendor): boolean {
    const profile = v.user.profile;

    console.log(profile);
    // if (!profile) {
    //     return false
    // }
    
    if (profile && profile.phone_number !=null) {
        if (profile.id_photos?.length) {
            return true;
        }
    }
    return false;
}

export default function VendorsPage({ vendors }: ShareData & { vendors: PaginatedData<Vendor> }) {
    console.log(vendors.data[0]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <DataTablePage columns={columns} pageData={vendors} />
        </AppLayout>
    );
}

const VendorInfo = ({ user }: { user: User }) => {
    const getInitials = useInitials();
    return (
        <div className={'flex items-center gap-1 p-0.5'}>
            <div>
                <Avatar className="z-[1] h-8 w-8 rounded-full">
                    <AvatarImage src={''} alt={user.first_name} />
                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                        {getInitials(user.first_name)}
                    </AvatarFallback>
                </Avatar>
            </div>
            <div className="space-y-0.5 text-sm">
                <div className="text-xs">
                    {user.first_name} {user.last_name}
                </div>
                <div>{user.email} </div>
            </div>
        </div>
    );
};
const Translated = ({ value }: { value: string }) => {
    const { t } = useLaravelReactI18n();
    return <div className="ps-8">{t(value)}</div>;
};



const columns: ColumnDef<Vendor>[] = [
    selectColumn(),
    {
        accessorKey: 'profile',
        header: () => <Translated value={'Vendor'} />,
        cell: ({ row }) => <VendorInfo user={row.original.user} />,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const is_verified = getVendorStatus(row.original);
            const status = is_verified ? 'verified' : 'in progress';
            return (
                <Badge variant="outline" className="text-muted-foreground flex gap-1 px-1.5 [&_svg]:size-3">
                    {is_verified ? <CheckCircle2Icon className="text-green-500 dark:text-green-400" /> : <LoaderIcon />}
                    {status}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'username',
        header: () => <div className="">User Name</div>,
        cell: ({ row }) => {
            return <div className="lowercase">{row.original.user.username}</div>;
        },
    },
    {
        accessorKey: 'specialities',
        header: () => <Translated value={'specialities'} />,
        cell: ({ row }) => {
            return <div className="text-center">{row.original.specialities[0].name}</div>;
        },
    },
    {
        accessorKey: 'services_count',
        header: 'Services Count',
        cell: ({ row }) => {
            return <div className="text-center">{row.original.services_count}</div>;
        },
    },

    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original;

            return (
                <div className={'flex justify-end'}>
                    <DropdownMenu dir={'rtl'}>
                        <DropdownMenuTrigger asChild dir={'rtl'}>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id.toString())}>Copy payment ID</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View customer</DropdownMenuItem>
                            <DropdownMenuItem>View payment details</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];
