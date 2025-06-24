import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import type { BreadcrumbItem, PaginatedData, ServiceObj } from '@/types';
import DataTablePage from '@/components/data-table-page';
import { ColumnDef } from '@tanstack/react-table';
// import { Eye, EyeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CircleCheck, Loader } from 'lucide-react';
import { useLang } from '@/hooks/use-lang';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Service',
        href: '/vendor/services',
    },
];
// type Service = {
//     id: number;
//     is_active: boolean;
//     category: {
//         name: string;
//     };
// };
export default function ServicesIndex({ pageData }: { pageData: PaginatedData<ServiceObj> }) {
    console.log(pageData.data[0]);
    const {t}=useLang()
const columns: ColumnDef<ServiceObj>[] = [
    // selectColumn(),
    {
        accessorKey: 'id',
        header: t('id'),
        cell: ({ row }) => <div>{row.original.id}</div>,
    },

    {
        accessorKey: "status",
        header: t("Status"),
        cell: ({ row }) => (
            <div className={''}>

            <Badge variant="outline" className="text-muted-foreground px-1.5">
                {row.original.is_active  ? (
                    <div className={'flex items-center'}>

                    <CircleCheck className="fill-green-500 dark:fill-green-400" />
                        {'Done'}
                    </div>
                ) : (
                    <div className={'flex items-center gap-1'}>
                    <Loader size={15} />
                        {'in Progress'}

                    </div>
                )}
                {/*{row.original.status}*/}
            </Badge>
            </div>
        ),
    },
    {
        accessorKey: 'category',
        header: t('Category'),
        cell: ({ row }) => <div>{row.original.category?.name}</div>,
    },
    {
        accessorKey: 'title',
        header: t('Title'),
        cell: ({ row }) => <div>{row.original.content?.title}</div>,
    }
];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Services" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-0 lg:p-4">
                <DataTablePage columns={columns} pageData={pageData}  pagePath={'vendor.services'} />
            </div>
        </AppLayout>
    );
}
