import { EventTypeEnum } from '@/enum/Event';

export interface Event {
  id: number;
  name: string;
  date: string;
  type: EventTypeEnum;
}
