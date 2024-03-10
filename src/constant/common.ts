import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const getUtcDateTime = (dateTime: string | null) => (dateTime ? dayjs(dateTime).utc().format() : '');
