import {
  BehaviorSubject,
  catchError,
  filter,
  from,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  tap,
  zip,
  zipWith,
} from "rxjs";
import { CalendarData } from "../models/api/CalendarData";
import { UpcomingEventData } from "../models/ui/UpcomingEventData";
import { CalendarViewModeEnum } from "../enums/CalendarViewModeEnum";
import { getToken, identityUpdated$, loggedUser$ } from "./AuthService";
import axios from "axios";
import { baseUrl } from "../const/environment";
import { StorageKeysEnum } from "../enums/StorageKeysEnum";

const selectedDay = new BehaviorSubject<Date | null>(null);
export const selectedDay$ = selectedDay.asObservable();

const calendarViewMode = new BehaviorSubject<CalendarViewModeEnum>(
  CalendarViewModeEnum.WEEK
);
export const calendarViewMode$ = calendarViewMode.asObservable();

const calendars = new BehaviorSubject<CalendarData[]>([]);
export const calendars$ = calendars.asObservable();

const upcomingEvents = new BehaviorSubject<UpcomingEventData[]>([]);
export const upcomingEvents$ = upcomingEvents.asObservable();

const visibleDaysCount = new BehaviorSubject<number>(7);
export const visibleDaysCount$ = visibleDaysCount.asObservable();

const weekViewStartDay = new BehaviorSubject<Date>(new Date());
export const weekViewStartDay$ = weekViewStartDay.asObservable();

export const initializeCalendar = (): Observable<any> => {
  return identityUpdated$.pipe(
    switchMap((_) => loggedUser$),
    tap((user) => {
      if (!user) return;
    }),
    filter(Boolean),
    switchMap((_) => getToken()),
    switchMap((token) =>
      from(
        axios.get<CalendarData[]>(baseUrl + "/calendar/all", {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
    ),
    map((calendars) => getCalendarsWithActivatedStatuses(calendars.data)),
    tap((cals) => calendars.next(cals)),
    catchError((err) => {
      console.error(err);
      return of(null);
    })
  );
};

const getCalendarsWithActivatedStatuses = (
  calendars: CalendarData[]
): CalendarData[] => {
  const storedCalendars = localStorage.getItem(
    StorageKeysEnum.ACTIVATED_CALENDARS
  );

  const activatedCalendars: string[] = storedCalendars
    ? JSON.parse(storedCalendars)
    : [];

  return calendars.map((cal) => {
    cal.isActivated = cal.default || activatedCalendars?.includes(cal.id);
    return cal;
  });
};

export const downloadEventsInRange = (start: Date, end: Date) => {};

export const setSelectedDay = (day: Date) => {
  selectedDay.next(day);
};

export const setCalendars = (cals: CalendarData[]) => {
  calendars.next(cals);

  const activeCalendars = cals
    .filter((cal) => cal.isActivated)
    .map((cal) => cal.id);

  localStorage.setItem(
    StorageKeysEnum.ACTIVATED_CALENDARS,
    JSON.stringify(activeCalendars)
  );
};

export const setCalendarViewMode = (mode: CalendarViewModeEnum) => {
  calendarViewMode.next(mode);
};

export const generateVisibleDays = (
  daysCount: number,
  startingDay: Date
): Date[] => {
  const visibleDays: Date[] = [];

  if (daysCount >= 5) {
    startingDay.setDate(startingDay.getDate() - startingDay.getDay() + 1);
  }

  for (let i = 0; i < daysCount; i++) {
    const day = new Date(startingDay);
    day.setDate(day.getDate() + i);
    visibleDays.push(day);
  }

  return visibleDays;
};

export const visibleDays$ = zip(weekViewStartDay$, visibleDaysCount$).pipe(
  shareReplay(1),
  map(([startingDay, daysCount]) => generateVisibleDays(daysCount, startingDay))
);
