import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Skeleton } from '@/components/ui/skeleton';
import { useLaravelReactI18n } from 'laravel-react-i18n';


type Service = {
    id: number;
    is_active: boolean;
    content: {
        title: string;
        description: string;
    };
};
export default function ServicesIndex({ service }: { service: Service }) {
    console.log(service);

    const {t}=useLaravelReactI18n()

    return (
        <AppLayout breadcrumbs={[

                {
                    title: 'Services',
                    href: '/vendor/services',
                },
                {
                    title: service.content.title,
                    href: '/vendor/services',
                },

        ]}>
            <Head title="Services Edit" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl lg:p-4">
                <div className="">
                    <div className="text-lg">{service.content.title}</div>
                    <div className="py-2">
                        <div className="bg-accent h-[125px] w-full rounded-lg" />
                    </div>
                    <div className="h-[1px] w-full bg-accent mb-2"></div>
                </div>
                    <div className="">
                    <div className="text-muted-foreground border-b w-fit pb-2" >{t('Description')}</div>

                    <div className="text-muted-foregrou">{service.content.description}</div>
                    <div className="h-[1px] w-full bg-accent my-2"></div>
                    </div>

                    <ServiceItem title={'Delivery Time'} value={'5 Days'}/>
                    <ServiceItem title={'Price'} value={'100$'}/>
            </div>
        </AppLayout>
    );
}

function ServiceItem({title,value}:{title:string,value:string}){

    const  {t} = useLaravelReactI18n()
    return (
        <div className="flex gap-2">
            <div className="border-b w-fit pb-1">{t(title)}</div>
            <div className="">{value}</div>
        </div>
    )
}
