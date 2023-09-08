import format from 'date-fns/format';

export const currencyFormatter = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' });

export const formatDate = (date?: number | string | Date) => date ? format(new Date(date), 'dd.MM.yyyy') : '';