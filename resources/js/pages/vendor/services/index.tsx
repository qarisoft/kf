import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import type { BreadcrumbItem, PaginatedData } from '@/types';
import DataTablePage, { selectColumn } from '@/components/data-table-page';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, EyeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Service',
        href: '/vendor/services',
    },
];
type Service = {
    id: number;
    is_active: boolean;
    category: {
        name: string;
    };
};
export default function ServicesIndex({ pageData }: { pageData: PaginatedData<Service> }) {
    console.log(pageData.data[0]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Services" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-0 lg:p-4">
                <DataTablePage columns={columns} pageData={pageData}  pagePath={'vendor.services'} />
            </div>
        </AppLayout>
    );
}

const columns: ColumnDef<Service>[] = [
    // selectColumn(),
    {
        accessorKey: 'id',
        header: 'id',
        cell: ({ row }) => <div>{row.original.id}</div>,
    },
    {
        accessorKey: 'is_active',
        header: 'status',
        cell: ({ row }) => (
            <div>
                <Button
                onClick={()=>router.get(route('vendor.services.show',row.original.id))}
                >{row.original.is_active ? <div>Active</div> : <div>inActive</div>}</Button>
            </div>
        ),
    },
    {
        accessorKey: 'category',
        header: 'category',
        cell: ({ row }) => <div>{row.original.category.name}</div>,
    },
    // {
    //     accessorKey:'action',
    //     header:'',
    //     cell:({row})=>(
    //         <div>
    //             <EyeIcon/>
    //         </div>
    //     ),
    //
    // },
];

// {
//     "id": 1,
//     "is_active": true,
//     "vendor_id": 1,
//     "category_id": 1,
//     "sub_category_id": null,
//     "service_content_id": null,
//     // "created_at": "2025-06-13T19:18:29.000000Z",
//     // "updated_at": "2025-06-13T19:18:29.000000Z"
// }
