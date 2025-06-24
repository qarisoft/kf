import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;

    [key: string]: unknown;
}

export interface Link {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedData<T> {
    current_page: number;
    data: T[];
    from: number;
    last_page: number;
    first_page_url: string;
    last_page_url: string;
    path: string;
    links: Link[];
    next_page_url: string | null;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

type UserType = 'Customer' | 'Admin' | 'Vendor';

type WithTimeStamp<T> = T & {
    created_at: string;
    updated_at: string;
};

export interface UpdateRequestObject {
    id: number;
}

export interface PublishRequestObject {
    id: number;
}

export interface ServiceOptionObject {
    id: number;
    service_content_id: number;
    title: string;
    price: number;
    hours: number;
}

export interface ServiceContentObject {
    id: number;
    service_id: number;
    title: string;
    description: string;
    main_image_url: string;
    youtube_url: string;
    price: number;
    hours: number;
    instructions: string;
}

export interface CategoryObject {
    id: number;
    name: string;
    svg: string;
    is_sub: boolean;
    parent_category_id: string;
}

interface ServiceObject {
    id: number;
}

interface ServiceOption {
    id: number;
}

export interface UserObject {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    avatar?: string;
    type: UserType;
    photo: string;
    email_verified_at: string | null;

    [key: string]: unknown; // This allows for additional properties...
}

export interface ProfileObject {
    id: number;
    user_id: number;
    is_vendor: boolean;
    phone_number: number | null;
    id_photos: string[] | null;
}

export type User = WithTimeStamp<UserObject>;

interface VendorObject {
    id: number;
    user_id: number;
    services_count: number;
}

export interface SpecialityObject {
    id: number;
    name: string;
    created_by: number;
    pivot?: {
        vendor_id: number;
        specialization_id: number;
    };
}

export interface ServiceContent {
    id: 8;
    title: string;
    service_id: number;
    description: string;
    main_image_url: string | null;
    youtube_url: string | null;
    instructions: string | null;
    price: number;
    hours: number;
}

export interface ServiceObj {
    id: number;
    last_content: WithTimeStamp<ServiceContent>[];
    is_active: boolean;
    vendor_id: number;
    category_id: number;
    sub_category_id: string | null;
    service_content_id: string | null;
}

export type SideBarProps = { mainNavItems: NavItem[]; footerNavItems: NavItem[] };
export type SideBarProps2 = { mainNavItems: { items: NavItem[]; title: string }[]; footerNavItems: NavItem[] };
