import {Label } from '@/components/ui/label';
import { ComponentProps } from 'react';
import { useLang } from '@/hooks/use-lang';

export function TLabel({value,...props}:ComponentProps<typeof Label> &{value:string}){
    const {t}=useLang()
    return <Label {...props} >{t(value)}</Label>
}
