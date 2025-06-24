import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, CategoryObject, PaginatedData, WithTimeStamp } from '@/types';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import DataTablePage from '@/components/data-table-page';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Service Categories',
        href: '/admin/services/categories',
    },
];
type Category = WithTimeStamp<CategoryObject>;
const columns: ColumnDef<Category>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => <div >{row.original.name}</div>,
    },
    {
        accessorKey: 'svg',
        header: 'svg',
        cell: ({ row }) => <div >{row.original.svg}</div>,
    },
    {
        accessorKey: 'is_sub',
        header:'is_sub',
        cell: ({ row }) => <div >{row.original.is_sub}</div>,
    },
];


export default function Categories({categories}:ShareData&{categories:PaginatedData<Category>}) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <DataTablePage columns={columns}  pageData={categories}/>
        </AppLayout>
    );
}




