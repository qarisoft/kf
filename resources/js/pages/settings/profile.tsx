import DeleteUser from '@/components/admin/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SettingsLayout from '@/layouts/settings-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useLang } from '@/hooks/use-lang';
import { FormEventHandler, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit } from 'lucide-react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: 'settings/profile',
    },
];
type ProfileForm = {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    photo:string | null
};
export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { t } = useLang();
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful,progress } = useForm<Required<ProfileForm>>({
        first_name: auth.user.first_name,
        last_name: auth.user.last_name,
        username: auth.user.username,
        email: auth.user.email,
        photo:auth.user.photo
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };
    const avatarRef = useRef<HTMLInputElement>(null)

    console.log(auth.user);
    return (
        <SettingsLayout title="Profile settings" breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <form onSubmit={submit} className="space-y-6">
                    <div className="flex justify-center">
                        <Avatar className={' size-[100px]'}>
                            <AvatarImage src={'https://github.com/shadcn.png'} />

                            <AvatarFallback>CN</AvatarFallback>
                            {/*<AvatarFallback>{`${data.photo}`}</AvatarFallback>*/}
                            <input
                                ref={avatarRef}
                                className="bg-red-500 absolute w-0"
                                type={'file'}
                                onChange={(e) => {
                                    const a = e.target.files;
                                    if (a && a?.length > 0) {
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-expect-error
                                        setData('photo', a[0]);

                                        console.log('ssssssssss',a);
                                    }
                                }}
                            />
                            <Edit
                                onClick={()=>avatarRef.current?.click()}
                                className={'absolute bottom-1 left-1/2 -translate-x-1/2'} />
                        </Avatar>
                        {/*<input type="file" onChange={e => setData('avatar', e.target.files[0])} />*/}
                        {progress && (
                            <progress value={progress.percentage} max="100">
                                {progress.percentage}%
                            </progress>
                        )}
                    </div>

                    <HeadingSmall title={t('Profile information')} description={t('Update your name and email address')} />
                    <div className="grid gap-2">
                        <Label htmlFor="name">{t('First name')}</Label>

                        <Input
                            id="first_name"
                            className="mt-1 block w-full"
                            value={data.first_name}
                            onChange={(e) => setData('first_name', e.target.value)}
                            required
                            autoComplete="first name"
                            placeholder={t('First name')}
                        />

                        <InputError className="mt-2" message={errors.last_name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="name">{t('Last name')}</Label>

                        <Input
                            id="last_name"
                            className="mt-1 block w-full"
                            value={data.last_name}
                            onChange={(e) => setData('last_name', e.target.value)}
                            required
                            autoComplete="last name"
                            placeholder={t('Last name')}
                        />

                        <InputError className="mt-2" message={errors.last_name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username">{t('Username')}</Label>

                        <Input
                            id="username"
                            type="username"
                            disabled
                            className="mt-1 block w-full"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            required
                            autoComplete="username"
                            placeholder={t('Username')}
                        />

                        <InputError className="mt-2" message={errors.username} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">{t('Email address')}</Label>

                        <Input
                            id="email"
                            type="email"
                            disabled
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="username"
                            placeholder={t('Email address')}
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    {mustVerifyEmail && auth.user.email_verified_at === null && (
                        <div>
                            <p className="text-muted-foreground -mt-4 text-sm">
                                {t('Your email address is unverified.')}{' '}
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                >
                                    {t('Click here to resend the verification email.')}
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className="mt-2 text-sm font-medium text-green-600">
                                    {t('A new verification link has been sent to your email address.')}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>{t('Save')}</Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">{t('Saved')}</p>
                        </Transition>
                    </div>
                </form>
            </div>

            <DeleteUser />
        </SettingsLayout>
    );
}
