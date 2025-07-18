import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useLang } from '@/hooks/use-lang';
import { HTMLInputTypeAttribute, MouseEventHandler, useCallback, useRef } from 'react';
import {
    DropdownMenu, DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Service',
        href: '/vendor/services',
    },
];
type Service = {
    id: number;
    is_active: boolean;
    content: {
        id: number;
        title:string,
        description:string,
        main_image_url:string,
        hours:number,
        price:number,
        instructions:string,
        timeUnit:TimeUnits,
        youtube_url:string|undefined


    };
};

type Category={
    id:number,
    name:string
}
type ServiceForm = {
    title: string;
    tags: number[];
    description: string;
    main_image_url?: string | undefined;
    price: number;
    hours: number;
    instructions: string;
    timeUnit: TimeUnits;
    youtube_url: string;
};

export default function EditServices({ service,categories }: { categories:Category[],service: Service }) {
    const { setData, data,put } = useForm<ServiceForm>({
        title: service.content.title,
        description: service.content.description??'',
        tags: [],
        main_image_url: service.content.main_image_url??'',
        hours: service.content.hours??1,
        price: service.content.price??0,
        instructions: service.content.instructions??'',
        timeUnit: 'hour',
        youtube_url: service.content.youtube_url??'',
    });
    const { t } = useLang();

    const addCategory = useCallback(
        (id_: number, a: boolean) => {
            const id = id_;
            if (a) {
                if (data.tags.includes(id)) {
                    return;
                }
                setData('tags', [...data.tags, id]);
            } else {
                setData(
                    'tags',
                    data.tags.filter((i) => i != id),
                );
            }
        },
        [data, setData],
    );
    const onSubmit = (e:{preventDefault:()=>void})=>{
        e.preventDefault()
        put(route('vendor.services.update',service.id))
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Services Edit" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl">
                <form onSubmit={onSubmit}>

                    <Card>
                        <CardContent>
                            <CardHeader>
                                <div className="">{t('Edit Service')}</div>
                            </CardHeader>
                            <div className="h-2"></div>

                            <div className="min-h-32">
                                <div className="my-2">{t('Image')}</div>
                                <ImageUpload value={data.main_image_url} onChange={(v) => setData('main_image_url', v)} />
                            </div>
                            <div className="h-4"></div>
                            <div className="flex flex-wrap gap-4">
                                <div className="">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="">
                                                {t('Chose Category')}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuLabel>Tags</DropdownMenuLabel>
                                            {categories.map((s) => (
                                                <div className="" key={s.id}>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuCheckboxItem
                                                        onSelect={(a) => {
                                                            a.preventDefault();
                                                        }}
                                                        checked={data.tags.includes(s.id)}
                                                        onCheckedChange={(a) => {
                                                            addCategory(s.id, a);
                                                        }}
                                                    >
                                                        {s.name}
                                                    </DropdownMenuCheckboxItem>
                                                </div>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    {data.tags.map((tag) => (
                                        <Badge className={'h-fit'}>{categories.find((i) => i.id == tag)?.name}</Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="h-2"></div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-2">
                                <FormField
                                    label={t('Title')}
                                    id={'title'}
                                    value={data.title}
                                    onChange={(v) => setData('title', v)}
                                    iType={'textarea'}
                                    placeholder={t('title')}
                                />
                                <FormField
                                    label={t('YouTube Url')}
                                    id={'youtube_url'}
                                    value={data.youtube_url}
                                    onChange={(v) => setData('youtube_url', v)}
                                    iType={'textarea'}
                                    placeholder={t('YouTube Url')}
                                />
                                <FormField
                                    label={t('Description')}
                                    id={'description'}
                                    value={data.description}
                                    onChange={(v) => setData('description', v)}
                                    iType={'textarea'}
                                    placeholder={t('description')}
                                />
                                <FormField
                                    id={'instructions'}
                                    label={t('Instructions')}
                                    placeholder={t('Instructions')}
                                    value={data.instructions}
                                    onChange={(v) => setData('instructions', v)}
                                    iType={'textarea'}
                                />
                                <WorkDurationSelect
                                    timeValue={data.hours}
                                    unitValue={data.timeUnit}
                                    onUnitChange={(v) => setData('timeUnit', v)}
                                    onTimeChange={(v) => setData('hours', v)}
                                />

                                <FormField
                                    id={'price'}
                                    label={t('Price')}
                                    value={data.price}
                                    onChange={(v) => {
                                        if (Number(v) > 0) {
                                            setData('price', Number(v));
                                        }
                                    }}
                                    iType={'number'}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className={'gap-2'}>
                            <Button
                            // onClick={onSubmit}
                            >{t('Save')}</Button>
                            <Button variant={'ghost'}>{t('Cancel')}</Button>
                        </CardFooter>
                    </Card>
                </form>

            </div>
        </AppLayout>
    );
}

type TimeUnits = 'hour' | 'day' | 'week' | 'month';

function WorkDurationSelect({
    onTimeChange,
    onUnitChange,
    timeValue,
    unitValue,
}: {
    onUnitChange: (a: TimeUnits) => void;
    onTimeChange: (v: number) => void;
    timeValue?: number;
    unitValue: TimeUnits;
}) {
    const { t } = useLang();
    return (
        <div className="">
            <div className="h-4"></div>
            <Label>{t('Work Duration')}</Label>
            <div className="h-2"></div>
            <div className="my-2 flex gap-2">
                <Select value={unitValue} onValueChange={onUnitChange}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Day" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="hour">Hour</SelectItem>
                            <SelectItem value="day">Day</SelectItem>
                            <SelectItem value="week">Week</SelectItem>
                            <SelectItem value="month">Month</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Input
                    type={'number'}
                    value={timeValue}
                    onChange={(v) => {
                        if (Number(v.target.value) > 0) {
                            onTimeChange(Number(v.target.value));
                        }
                    }}
                />
            </div>
        </div>
    );
}

function ImageUpload({ value, onChange }: { value?: string; onChange: (v: string) => void }) {
    // const [file, setFile] = useState<string|undefined>();

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const a = e.target.files;
        if (a?.length && a?.length > 0) {
            // onChange(a[0]);
            onChange(URL.createObjectURL(a[0]));
        }
    };

    const ref = useRef<HTMLInputElement>(null);
    const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();
        ref.current?.click();
    };
    const { t } = useLang();
    return (
        <div className="bg-accent relative h-full w-full rounded-lg shadow-lg drop-shadow-lg">
            <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                <input type={'file'} ref={ref} className={'w-0'} onChange={handleChange} />
                <Button variant={'ghost'} className="bg-accent opacity-25" onClick={onClick}>
                    {(value?.length ?? 0) > 0 ? t('edit') : t('chose')}
                </Button>
            </div>

            {value ? <img src={value} alt={'preview'} className={'h-full w-full rounded-xl object-fill'} /> : <div className={'h-40'} />}
        </div>
    );
}

function FormField({
    label,
    id,
    value,
    autocomplete,
    iType = 'text',
    required = false,
    onChange,
    error,
    placeholder,
    autofocus,
}: {
    label?: string;
    id: string;
    iType?: HTMLInputTypeAttribute;
    value: string | number;
    required?: boolean;
    autocomplete?: string;
    onChange: (value: string) => void;
    error?: string;
    placeholder?: string;
    autofocus?: boolean;
}) {
    return (
        <div className="mt-4 grid gap-2">
            {label && <Label htmlFor={id}>{label}</Label>}
            <div className=""></div>
            {iType === 'textarea' ? (
                <Textarea
                    id={id}
                    required={required}
                    autoFocus={autofocus}
                    tabIndex={1}
                    autoComplete={autocomplete}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                />
            ) : (
                <Input
                    id={id}
                    type={''}
                    required={required}
                    autoFocus={autofocus}
                    tabIndex={1}
                    autoComplete={autocomplete}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                />
            )}

            <InputError message={error} />
            <div className="h-1"></div>
        </div>
    );
}
