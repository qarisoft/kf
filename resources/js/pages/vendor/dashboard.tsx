import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Auth, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
// import { IconTrendingUp } from '@tabler/icons-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLang } from '@/hooks/use-lang';
import { useEcho, useEchoPresence } from '@laravel/echo-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { props } = usePage<{ auth: Auth }>();
    // console.log(props);


    useEcho(`App.Models.User.${props.auth.user.id}`, 'ServiceCreated', (e) => {
        console.log(e);
    })
    useEchoPresence('services', 'ServiceCreated', (e) => {
        console.log('service created', e);
    })

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <SectionCards />
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}

function SectionCards() {
    const { t } = useLang();
    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:grid-cols-3 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>{t('total_balance')}</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">$0.00</CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            {/* <IconTrendingUp /> */}
                            +12.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <Button variant={'outline'}>{t('More details')}</Button>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>{t('buying')}</CardDescription>
                    <div className="h-2"></div>
                    <div className="grid grid-cols-3">
                        <BuyingCardSection title={'Done'} value={0} />
                        <BuyingCardSection title={'In Progress'} value={0} />
                        <BuyingCardSection title={'Canceled'} value={0} />
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <Button variant={'outline'}>{t('View Items')}</Button>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>{t('Services')}</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">45</CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            {/* <IconTrendingUp /> */}
                            +12.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="grid grid-cols-2 items-start gap-2 text-sm">
                    <ServiceCardItem title={'All'} value={45} />
                    <ServiceCardItem title={'Live'} value={4} />
                    <ServiceCardItem title={'Stop'} value={10} />


                </CardFooter>
            </Card>
        </div>
    );
}

function ServiceCardItem({ title, value }: { title: string, value: string | number }) {
    const { t } = useLang()
    return (
        <div className="line-clamp-1 flex gap-2 font-medium">
            {t(title)}
            <span>

                {value}
            </span>
        </div>
    )
}

function BuyingCardSection({ title, value }: { title: string; value: string | number }) {
    const { t } = useLang();
    return (
        <CardTitle className="text-sm font-semibold tabular-nums @[250px]/card:text-sm">
            <div className="text-center">{t(title)}</div>
            <div className="h-2"></div>
            <div className="text-center">{value}</div>
        </CardTitle>
    );
}
