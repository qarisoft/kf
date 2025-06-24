// import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useLang } from '@/hooks/use-lang';
import { Button } from '@/components/ui/button';

export default function SectionCards() {
    const { t } = useLang();
    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 lg:grid-cols-3 gap-4  *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>{t('total_balance')}</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        $0.00
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            {/* <IconTrendingUp /> */}
                            +12.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <Button variant={'outline'}>

                    {t('More details')}
                    </Button>

                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>{t('buying')}</CardDescription>
                    <div className="h-2"></div>
                    <div className="grid grid-cols-3 ">
                        <BuyingCardSection title={'Done'} value={0} />
                        <BuyingCardSection title={'In Progress'} value={0} />
                        <BuyingCardSection title={'Canceled'} value={0} />



                    </div>


                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">

                    <Button variant={'outline'}>

                        {t('View Items')}
                    </Button>

                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Active Accounts</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        45,678
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            {/* <IconTrendingUp /> */}
                            +12.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        {/* Strong user retention <IconTrendingUp className="size-4" /> */}
                    </div>
                    <div className="text-muted-foreground">Engagement exceed targets</div>
                </CardFooter>
            </Card>
        </div>
    )
}



function BuyingCardSection({title,value}:{title:string,value:string|number}) {

    const {t}= useLang()
    return (
        <CardTitle className="font-semibold tabular-nums @[250px]/card:text-sm">
            <div className="text-center">{t(title)}</div>
            <div className="h-2"></div>
            <div className="text-center ">{value}</div>
        </CardTitle>
    )
}
