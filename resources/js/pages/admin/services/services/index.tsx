import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PaginatedData, ServiceContent, ServiceObj, WithTimeStamp } from '@/types';
import { Head } from '@inertiajs/react';

import DataTablePage, { makeColumn, selectColumn } from '@/components/data-table-page';
// import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ColumnDef, Row } from '@tanstack/react-table';
import { useEcho, useEchoModel, useEchoPresence, useEchoPublic } from '@laravel/echo-react';
import { useCallback, useState } from 'react';
// import { ReactNode } from 'react';
import { toast } from 'sonner'
import { useLang } from '@/hooks/use-lang';
// type Service2 = WithTimeStamp<ServiceObj & { content: WithTimeStamp<ServiceContent> }>;
type Service3 = WithTimeStamp<ServiceObj> & ServiceContent;
type Service = WithTimeStamp<ServiceObj>;


function getColumns(): ColumnDef<Service3>[] {
    return [
        { k: 'title' },
        {
            k: 'description',
            f: (r: Row<Service3>) => (
                <TooltipProvider skipDelayDuration={1000} disableHoverableContent={true} delayDuration={1000}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className={''}>{r.original.description.substring(0, 20)}</div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className={'max-w-[200px]'}>{r.original.description}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ),
        },
        {
            k: 'price',
            f: (row: Row<Service3>) => {
                const amount = parseFloat(row.getValue('price'));

                // Format the amount as a dollar amount
                const formatted = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(amount);

                return <div className="text-right">{formatted}</div>;
            },
        },
        {
            k: 'main_image_url', h: 'image', f: (row: Row<Service3>) => {
                const preview = row.original.media[0]?.preview_url

                return <div>
                    {preview && (


                        <img
                            width={100}
                            src={row.original.media[0]?.preview_url ?? ''}
                            alt={'image'} />
                    )}

                </div>
            }
        },
        { k: 'hours' },
        { k: 'youtube_url', h: 'video' },
        // { k: 'instructions' },
    ].map((k) => makeColumn(k));
}

const columns: ColumnDef<Service3>[] = [selectColumn(), ...getColumns()];
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Services',
        href: '/admin/services',
    },
];
export default function ServicesPage({ services }: ShareData & { services: PaginatedData<Service> }) {
    const pageData: PaginatedData<Service3> = {
        ...services,
        data: services.data.map((s) => {
            const content = s.content;
            return {
                ...s,
                title: content.title,
                description: content.description,
                price: content.price,
                main_image_url: content.main_image_url,
                hours: content.hours,
                service_id: content.service_id,
                id: content.id,
                youtube_url: content.youtube_url,
                instructions: content.instructions,
                media: content.media
            };
        }),
    };
    const [a, setA] = useState(0)

    // console.log(pageData.data);
    // const a = useEcho('service.created','ServiceCreated',(e)=>{
    //     console.log(e);
    // })
    // a.channel().subscribed(()=>{
    //     console.log('sssssssssssssss');
    // })


    // const a2= useEchoPublic('hi','AnonymousEvent',(e)=>{
    //     console.log('hi event:',e);
    // })
    const { __ } = useLang()
    // useEchoModel('App.Models.Service.Service',)
    const onServiceCreated = useCallback((e: { event: string }) => {
        // console.log(e);
        toast(__('Service Created'))
    }, [])

    useEchoPresence('admin-services', 'ServiceCreated', onServiceCreated)

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <DataTablePage columns={columns} pageData={pageData} />
        </AppLayout>
    );
}
