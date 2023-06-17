import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(dateInput: string | Date) {
    const dateNew = new Date(dateInput);

    if (!dateNew) return '--';

    return `${dateNew.toLocaleDateString()} à ${dateNew.toLocaleTimeString()}`;
}

export function getUrlBase() {
    return window.location.origin;
}
