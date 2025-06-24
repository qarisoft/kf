import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Category, PaginatedData, PublishRequestData, WithTimeStamp } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Service Categories',
        href: '/admin/services/publish-requests',
    },
];
type PublishRequest = WithTimeStamp<PublishRequestData>

export default function PublishRequests({requests}:ShareData&{requests:PaginatedData<PublishRequest>}) {

    const columns = ['id'];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Table className="" dir='rtl'>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader className="">
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead key={column} className="">
                                    {column}
                                </TableHead>
                            ))}
                            <TableHead  className="">created at</TableHead>
                            <TableHead  className="">updated at</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="">
                        {requests.data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.id}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}


