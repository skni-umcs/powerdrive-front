import { CalendarWidgetWeekData } from "./CalendarWidgetWeekData";

export interface CalendarWidgetData {
  month: number;
  year: number;
  weeks: CalendarWidgetWeekData[];
}
