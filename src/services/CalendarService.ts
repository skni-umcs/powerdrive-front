import {
  BehaviorSubject,
  catchError,
  combineLatest,
  filter,
  first,
  from,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  tap,
} from "rxjs";
import { CalendarData } from "../models/api/CalendarData";
import { UpcomingEventData } from "../models/ui/UpcomingEventData";
import { CalendarWeekViewModeEnum } from "../enums/CalendarWeekViewModeEnum";
import { getToken, identityUpdated$, loggedUser$ } from "./AuthService";
import axios from "axios";
import { baseUrl } from "../const/environment";
import { StorageKeysEnum } from "../enums/StorageKeysEnum";
import { CalendarEvent } from "../models/api/CalendarEvent";

const selectedDay = new BehaviorSubject<Date | null>(null);
export const selectedDay$ = selectedDay.asObservable();

const calendarWeekViewMode = new BehaviorSubject<CalendarWeekViewModeEnum>(
  CalendarWeekViewModeEnum.WEEK
);
export const calendarWeekViewMode$ = calendarWeekViewMode.asObservable();

const calendars = new BehaviorSubject<CalendarData[]>([]);
export const calendars$ = calendars.asObservable();

const calendarEvents = new BehaviorSubject<CalendarEvent[]>([
  {
    id: "1",
    name: "Team Meeting",
    place: "Conference Room A",
    start_date: new Date("2023-04-26T09:00:00"),
    duration: 130,
    description: "Weekly team meeting to discuss progress and goals.",
    calendar_id: "1",
    organizer_id: "1234",
    block_color: "#FBB02D",
    is_recurring: true,
    loop_period: 1,
    end_date: new Date("2023-12-31"),
    eventOffset: 9 * 60,
  },
  {
    id: "2",
    name: "Lunch with John",
    place: "Cafe Bistro",
    start_date: new Date("2023-04-26T12:30:00"),
    duration: 90,
    description: "Meet with John to discuss project updates.",
    calendar_id: "2",
    organizer_id: "5678",
    block_color: "#DB5A42",
    is_recurring: false,
    eventOffset: 12 * 60 + 30,
  },
  {
    id: "3",
    name: "Marketing Presentation",
    place: "Main Auditorium",
    start_date: new Date("2023-04-26T13:00:00"),
    duration: 120,
    description: "Presentation on new marketing strategies.",
    calendar_id: "3",
    organizer_id: "9012",
    block_color: "#00B295",
    is_recurring: true,
    loop_period: 1,
    end_date: new Date("2023-12-31"),
    day_of_month: 10,
    eventOffset: 13 * 60,
  },
]);
export const calendarEvents$ = calendarEvents.asObservable();

const upcomingEvents = new BehaviorSubject<UpcomingEventData[]>([]);
export const upcomingEvents$ = upcomingEvents.asObservable();

export const visibleDaysCount$ = calendarWeekViewMode$.pipe(
  shareReplay(1),
  map((mode) => {
    switch (mode) {
      case CalendarWeekViewModeEnum.DAY:
        return 1;
      case CalendarWeekViewModeEnum.SCHEDULE:
        return 3;
      case CalendarWeekViewModeEnum.WEEK:
        return 7;
    }
  }),
  tap((mode) => console.log(mode))
);

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

const highlightedEvent = new BehaviorSubject<CalendarEvent | null>(null);
export const highlightedEvent$ = highlightedEvent.asObservable();

export const setHighlightedEvent = (event: CalendarEvent | null) => {
  highlightedEvent.next(event);
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

export const changeRangeToNextPeriod = () => {
  const updatedStartDay = weekViewStartDay.getValue();
  visibleDaysCount$.pipe(first()).subscribe((daysCount) => {
    updatedStartDay.setDate(updatedStartDay.getDate() + daysCount);
    weekViewStartDay.next(updatedStartDay);
  });
};

export const changeRangeToPreviousPeriod = () => {
  const updatedStartDay = weekViewStartDay.getValue();
  visibleDaysCount$.pipe(first()).subscribe((daysCount) => {
    updatedStartDay.setDate(updatedStartDay.getDate() - daysCount);
    weekViewStartDay.next(updatedStartDay);
  });
};

export const setCalendarWeekViewMode = (mode: CalendarWeekViewModeEnum) => {
  calendarWeekViewMode.next(mode);
  weekViewStartDay.next(new Date());
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

export const visibleDays$ = combineLatest(
  weekViewStartDay$,
  visibleDaysCount$
).pipe(
  shareReplay(1),
  map(([startingDay, daysCount]) => generateVisibleDays(daysCount, startingDay))
);
