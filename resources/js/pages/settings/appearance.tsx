import { type BreadcrumbItem } from '@/types';
import HeadingSmall from '@/components/heading-small';
import AppearanceTabs from '@/components/settings/appearance-tabs';
import SettingsLayout from '@/layouts/settings-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: 'settings/appearance',
    },
];

export default function AppearancePage() {
    return (
        <SettingsLayout breadcrumbs={breadcrumbs} title="Appearance settings">
            <div className="space-y-6">
                <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                <AppearanceTabs />
            </div>
        </SettingsLayout>
    );
}
