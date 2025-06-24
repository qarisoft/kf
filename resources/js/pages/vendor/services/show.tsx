import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useLang } from '@/hooks/use-lang';
import { Service } from '@/types';
import { Button } from '@/components/ui/button';

export default function ServicesIndex({ service }: { service: Service }) {
    console.log(service);

    const { t } = useLang();

    return (
        <AppLayout
            breadcrumbs={[
                {
                    title: 'Services',
                    href: '/vendor/services',
                },
                {
                    title: service.content.title,
                    href: '/vendor/services',
                },
            ]}
        >
            <Head title="Services Edit" />
            <div className=" relative flex h-full flex-1 flex-col gap-4 rounded-xl lg:p-4">

                <div className="">
                    <div className="flex gap-2 justify-between" >

                    <div className="text-lg">{service.content.title}</div>
                    <Button>{t('Edit')}</Button>

                    </div>

                    <div className="py-2">
                        <div className="min-h-[125px] w-full rounded-lg bg-accent">
                            <img src={`/images/${service.content.main_image_url}`} alt={''} />
                        </div>
                    </div>
                    <div className="mb-2 h-[1px] w-full bg-accent"></div>
                </div>
                <div className="">
                    <div className="w-fit border-b pb-2 text-muted-foreground">{t('Description')}</div>

                    <div className="text-muted-foregrou">{service.content.description}</div>
                    <div className="my-2 h-[1px] w-full bg-accent"></div>
                </div>
                <div className="">
                    <div className="w-fit border-b pb-2 text-muted-foreground">{t('Instructions')}</div>

                    <div className="text-muted-foregrou">{service.content.instructions}</div>
                    <div className="my-2 h-[1px] w-full bg-accent"></div>
                </div>

                <ServiceItem title={'Delivery Time'} value={`${service.content.hours}`} />
                <ServiceItem title={'Price'} value={`${service.content.price} RS`} />
            </div>
        </AppLayout>
    );
}

function ServiceItem({ title, value }: { title: string; value: string }) {
    const { t } = useLang();
    return (
        <div className="flex gap-2">
            <div className="w-fit border-b pb-1">{t(title)}</div>
            <div className="">{value}</div>
        </div>
    );
}
