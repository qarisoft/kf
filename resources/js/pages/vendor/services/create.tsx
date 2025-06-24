import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useLang } from '@/hooks/use-lang';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, CategoryObject, ServiceContentObject } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { HTMLInputTypeAttribute, MouseEventHandler, useRef, useState } from 'react';
// import { nullNav } from '@/config';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Service',
        href: '/vendor/services',
    },
    {
        title: 'Create',
        href: '/vendor/services/create',
    },
];

type TimeUnits = 'hour' | 'day' | 'week' | 'month';
type ServiceForm = {
    title: string;
    tags: number[];
    service_category_id: number | undefined;
    description: string;
    main_image_url?: File | null;
    price: number;
    time: number;
    time_unit: TimeUnits;
    instructions: string;
    youtube_url: string;
};

export default function CreateService({ categories, service }: { categories: CategoryObject[]; service?: ServiceContentObject }) {
    const { setData, data, post, errors } = useForm<ServiceForm>({
        title: service?.title ?? '',
        description: service?.description ?? '',
        service_category_id: 1,
        tags: [],
        main_image_url: null,
        time: 1,
        time_unit: 'day',
        price: 0,
        instructions: service?.instructions ?? '',
        youtube_url: '',
    });
    const { t } = useLang();

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        console.log(data);
        post(route('vendor.services.store'));
    };
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
                                <ImageUpload onChange={(v: File) => setData('main_image_url', v)} error={errors.main_image_url} />
                            </div>
                            <div className="h-4"></div>
                            <div className="flex flex-wrap gap-4">
                                <div className="">
                                    <Select
                                        defaultValue={'1'}
                                        dir={'rtl'}
                                        required
                                        onValueChange={(v) => {
                                            if (v) {
                                                setData('service_category_id', Number(v));
                                            }
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder={t('Chose Category')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem value={cat.id.toString()} key={cat.id}>
                                                    {cat.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.service_category_id} />
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
                                    error={errors.title}
                                />
                                <FormField
                                    label={t('YouTube Url')}
                                    id={'youtube_url'}
                                    value={data.youtube_url}
                                    onChange={(v) => setData('youtube_url', v)}
                                    iType={'textarea'}
                                    placeholder={t('YouTube Url')}
                                    error={errors.youtube_url}
                                />
                                <FormField
                                    label={t('Description')}
                                    id={'description'}
                                    value={data.description}
                                    onChange={(v) => setData('description', v)}
                                    iType={'textarea'}
                                    error={errors.description}
                                    placeholder={t('description')}
                                />
                                <FormField
                                    id={'instructions'}
                                    error={errors.instructions}
                                    label={t('Instructions')}
                                    placeholder={t('Instructions')}
                                    value={data.instructions}
                                    onChange={(v) => setData('instructions', v)}
                                    iType={'textarea'}
                                />
                                <WorkDurationSelect
                                    timeValue={data.time}
                                    unitValue={data.time_unit}
                                    onUnitChange={(v) => setData('time_unit', v)}
                                    onTimeChange={(v) => setData('time', v)}
                                />

                                <FormField
                                    error={errors.price}
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
                            >
                                {t('Save')}
                            </Button>
                            <Button variant={'ghost'}>{t('Cancel')}</Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}

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

function ImageUpload({ value, onChange, error }: { value?: string; onChange: (v: File) => void; error?: string }) {
    const [fileImg, setFile] = useState<string | undefined>(undefined);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const a = e.target.files;
        if (a?.length && a?.length > 0) {
            // onChange(a[0]);
            onChange(a[0]);
            setFile(URL.createObjectURL(a[0]));
        }
    };

    const ref = useRef<HTMLInputElement>(null);
    const onClick: MouseEventHandler<HTMLButtonElement|HTMLDivElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();
        ref.current?.click();
    };
    const { t } = useLang();
    return (
        <div>
            <div className="relative h-full w-full rounded-lg bg-accent shadow-lg drop-shadow-lg select-none "  onClick={()=>ref.current?.click()}>
                <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center ">
                    <input type={'file'} ref={ref} className={'w-0'} onChange={handleChange} />
                    <Button variant={'ghost'} className="bg-accent opacity-25" onClick={onClick}>
                        {(value?.length ?? 0) > 0 ? t('edit') : t('chose')}
                    </Button>
                </div>

                {fileImg ? <img src={fileImg} alt={'preview'} className={'h-full w-full rounded-xl object-fill'} /> : <div className={'h-40'} />}
            </div>
            <InputError className={'pt-2'} message={error} />
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
