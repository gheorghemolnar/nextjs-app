export function formatDate(dateInput: string | Date) {
    if (!dateInput) return '';

    const dateNew = new Date(dateInput);

    if (!dateNew) return '--';

    return `${dateNew.toLocaleDateString()} à ${dateNew.toLocaleTimeString()}`;
}

export function getUrlBase() {
    return window.location.origin;
}
