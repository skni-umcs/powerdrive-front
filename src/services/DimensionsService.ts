import { BehaviorSubject, filter, first } from "rxjs";
import {
  calendarWeekViewMode$,
  setCalendarWeekViewMode,
} from "./CalendarService";
import { CalendarWeekViewModeEnum } from "../enums/CalendarWeekViewModeEnum";

const mobileView = new BehaviorSubject<boolean>(false);
export const mobileView$ = mobileView.asObservable();

export const updateView = (width: number) => {
  const isMobile = mobileView.getValue();
  if (isMobile && width > 1024) {
    mobileView.next(false);
    calendarWeekViewMode$
      .pipe(
        first(),
        filter((mode) => CalendarWeekViewModeEnum.DAY === mode)
      )
      .subscribe((mode) => {
        setCalendarWeekViewMode(CalendarWeekViewModeEnum.WEEK);
      });
  } else if (!isMobile && width <= 1024) {
    mobileView.next(true);
    calendarWeekViewMode$
      .pipe(
        first(),
        filter((mode) => CalendarWeekViewModeEnum.WEEK === mode)
      )
      .subscribe((mode) => {
        setCalendarWeekViewMode(CalendarWeekViewModeEnum.DAY);
      });
  }
};
