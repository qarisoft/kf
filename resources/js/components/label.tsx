import {Label } from '@/components/ui/label';
import { ComponentProps } from 'react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export function TLabel({value,...props}:ComponentProps<typeof Label> &{value:string}){
    const {t}=useLaravelReactI18n()
    return <Label {...props} >{t(value)}</Label>
}
