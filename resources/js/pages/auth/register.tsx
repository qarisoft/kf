import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { useLang } from '@/hooks/use-lang';
import { WithGoogle } from '@/components/with-google';
import { User } from '@/types';

type RegisterForm = {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
    password_confirmation: string;
};

export default function Register({fake}:{fake:User}) {

    const {props} = usePage()
    console.log(props.errors);

    const {t}=useLang()
    const registerData={
        first_name: fake.first_name,
        last_name: fake.last_name,
        email: fake.email,
        username:fake.username,
        password: 'password',
        password_confirmation: 'password',
    }
    //     const registerData={
    //     first_name: '',
    //     last_name: '',
    //     email: '',
    //     username:'',
    //     password: '',
    //     password_confirmation: '',
    // }
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>(registerData);

    // const populate=()=>{
    //     // setData({email:fake.email,first_name:fake.first_name,last_name:fake.last_name,username:fake.username})
    // }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title={t('Create an account')} description={t('Enter your details below to create your account')}>
            <Head title={t('Register')} />
            <div className="flex flex-col gap-6">

                <WithGoogle title={'Register with Google'}/>
                <form  onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="first_name">{t('First name')}</Label>
                        <Input
                            id="first_name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="first_name"
                            value={data.first_name}
                            onChange={(e) => setData('first_name', e.target.value)}
                            disabled={processing}
                            placeholder={t('First name')}
                        />
                        <InputError message={errors.first_name} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="last_name">{t('Last name')}</Label>
                        <Input
                            id="last_name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="last_name"
                            value={data.last_name}
                            onChange={(e) => setData('last_name', e.target.value)}
                            disabled={processing}
                            placeholder={t('Last name')}
                        />
                        <InputError message={errors.last_name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">{t('Email address')}</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder={t('email@example.com')}
                        />
                        <InputError message={errors.email} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username">{t('Username')}</Label>
                        <Input
                            id="username"
                            type="username"
                            required
                            tabIndex={2}
                            autoComplete="username"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            disabled={processing}
                            placeholder={t('some_one')}
                        />
                        <InputError message={errors.username} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">{t('Password')}</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder={t('Password')}
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">{t('Confirm password')}</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder={t('Confirm password')}
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        {t('Create account')}
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    {t('Already have an account')}?{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        {t('Log in')}
                    </TextLink>
                </div>
            </form>
            </div>

        </AuthLayout>
    );
}
