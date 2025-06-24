import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Auth, SpecialityObject } from '@/types';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';

type ProfileForm = {
    is_vendor: boolean;
    specialities: number[];
};
type Checked = DropdownMenuCheckboxItemProps['checked'];

export default function CreateProfile({ specialities }: { specialities: SpecialityObject[] }) {
    const { t } = useLaravelReactI18n();
    const [open, setOpen] = useState(false);
    // console.log(specialities);

    const { data, setData, post, processing, errors, reset } = useForm<Required<ProfileForm>>({
        is_vendor: false,
        specialities: [],
    });
    const addSpeciality = useCallback(
        (id_: number, a: boolean) => {
            const id = id_;
            if (a) {
                if (data.specialities.includes(id)) {
                    return;
                }
                setData('specialities', [...data.specialities, id]);
            } else {
                setData(
                    'specialities',
                    data.specialities.filter((i) => i != id),
                );
            }
        },
        [data, setData],
    );

    // const  a = usePage<{auth:Auth}>()
    // console.log(a.props.auth);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('profile.store'), {
        });
    };

    return (
        <AuthLayout title={t('Complete your account setup')} description={t('')}>
            <Head title={t('Register')} />
            <div className="flex flex-col gap-6">
                <form onSubmit={submit}>
                    <div className="grid gap-3">
                        <div className="flex gap-4">
                            {/* <Label htmlFor="first_name">{t('First name')}</Label> */}
                            <Checkbox
                                id="is_vendor"
                                name="is_vendor"
                                checked={data.is_vendor}
                                onClick={() => setData('is_vendor', !data.is_vendor)}
                                tabIndex={3}
                            />
                            <Label htmlFor="remember">{t('Vendor')}</Label>
                        </div>

                        <div className="">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="">
                                        Chose Speciality
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Speciality</DropdownMenuLabel>
                                    {specialities.map((s) => (
                                        <div className="" key={s.id}>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuCheckboxItem
                                                onSelect={(a) => {
                                                    a.preventDefault();
                                                    // a.stopPropagation()
                                                }}
                                                checked={data.specialities.includes(s.id)}
                                                onCheckedChange={(a) => {
                                                    addSpeciality(s.id, a);
                                                }}
                                            >
                                                {s.name}
                                            </DropdownMenuCheckboxItem>
                                        </div>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* <div className="text-sm mt-2">Specialities</div> */}

                        {data.specialities.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {data.specialities.map((s) => (
                                    <Badge variant={'outline'} className=""  key={`badge-${s}`}>
                                        {specialities.find((a) => a.id === s)?.name}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        <div className="h-5"></div>

                        <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            {t('Continue')}
                        </Button>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
