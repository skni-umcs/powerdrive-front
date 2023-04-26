import { LoopTypeEnum } from "../../enums/LoopTypeEnum";
import { ReoccurringDaysEnum } from "../../enums/ReoccurringDaysEnum";

export interface CalendarEvent {
  id: string;
  name: string;
  place: string;
  start_date: Date;
  duration: number;
  description: string;
  calendar_id: string;
  organizer_id: string;
  block_color: string;
  is_recurring: boolean;
  loop_type?: LoopTypeEnum;
  loop_period?: number;
  end_date?: Date;
  reoccurring_days?: ReoccurringDaysEnum[];
  day_of_month?: number;
  day_of_week?: number;
  eventOffset?: number;
  overlapCount?: number;
  overlapIdx?: number;
}
