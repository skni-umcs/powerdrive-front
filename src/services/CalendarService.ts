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
  Subject,
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

const calendarEvents = new BehaviorSubject<CalendarEvent[]>([]);
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
  })
);

const openAddEventDialog = new Subject<Date | undefined>();
export const openAddEventDialog$ = openAddEventDialog.asObservable();

const openEditEventDialog = new Subject<Partial<CalendarEvent>>();
export const openEditEventDialog$ = openEditEventDialog.asObservable();

const openAddCalendarDialog = new Subject<void>();
export const openAddCalendarDialog$ = openAddCalendarDialog.asObservable();

const openEditCalendarDialog = new Subject<Partial<CalendarData>>();
export const openEditCalendarDialog$ = openEditCalendarDialog.asObservable();

export const sendOpenAddEventDialogEvent = (date: Date | undefined) => {
  openAddEventDialog.next(date);
};

export const sendOpenEditEventDialogEvent = (event: Partial<CalendarEvent>) => {
  openEditEventDialog.next(event);
};

export const sendOpenAddCalendarDialogEvent = () => {
  openAddCalendarDialog.next();
};

export const sendOpenEditCalendarDialogEvent = (
  calendar: Partial<CalendarData>
) => {
  openEditCalendarDialog.next(calendar);
};

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

export const downloadEventsInRange = (
  start: Date,
  end: Date
): Observable<CalendarEvent[]> => {
  return getToken().pipe(
    switchMap((token) =>
      from(
        axios.get<CalendarEvent[]>(baseUrl + "/calendar/event/all", {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
    ),
    catchError((e) => {
      console.error(e);
      return of(null);
    }),
    filter(Boolean),
    map((response) => response.data),
    map((events) =>
      events
        .map((event) => {
          event.start_date = new Date(event.start_date);
          event.eventOffset =
            event.start_date.getMinutes() + 60 * event.start_date.getHours();
          return event;
        })
        .filter((event) => event.start_date >= start && event.start_date <= end)
    )
  );
};

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
  map(([startingDay, daysCount]) =>
    generateVisibleDays(daysCount, startingDay)
  ),
  switchMap((days) =>
    downloadEventsInRange(days[0], days[days.length - 1]).pipe(
      tap((events) => calendarEvents.next(events)),
      catchError((err) => {
        console.error(err);
        return of(null);
      }),
      map((_) => days)
    )
  ),
  shareReplay(1)
);

export const createEvent = (event: Partial<CalendarEvent>): Observable<any> => {
  return getToken().pipe(
    switchMap((token) =>
      from(
        axios.post<CalendarEvent>(
          baseUrl + "/calendar/" + event.calendar_id + "/event",
          event,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      )
    ),
    tap((response) => {
      const currentEvents = [...calendarEvents.getValue()];
      const responseEvent = response.data;
      responseEvent.start_date = new Date(responseEvent.start_date);
      responseEvent.eventOffset =
        responseEvent.start_date.getMinutes() +
        60 * responseEvent.start_date.getHours();
      currentEvents.push(responseEvent);
      calendarEvents.next(currentEvents);
    })
  );
};

export const updateEvent = (event: Partial<CalendarEvent>): Observable<any> => {
  return getToken().pipe(
    switchMap((token) =>
      from(
        axios.put<CalendarEvent>(baseUrl + "/calendar/event", event, {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
    ),
    tap((response) => {
      const currentEvents = [...calendarEvents.getValue()];
      const eventIdx = currentEvents.findIndex((e) => e.id === event.id);

      if (eventIdx === -1) return;

      const responseEvent = response.data;
      responseEvent.start_date = new Date(responseEvent.start_date);
      responseEvent.eventOffset =
        responseEvent.start_date.getMinutes() +
        60 * responseEvent.start_date.getHours();

      currentEvents.splice(eventIdx, 1, responseEvent);
      calendarEvents.next(currentEvents);
    })
  );
};

export const deleteEvent = (eventId: string): Observable<any> => {
  return getToken().pipe(
    switchMap((token) =>
      from(
        axios.delete(baseUrl + "/calendar/event/" + eventId, {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
    ),
    tap((response) => {
      let currentEvents = [...calendarEvents.getValue()];
      currentEvents = currentEvents.filter((e) => e.id !== eventId);
      calendarEvents.next(currentEvents);
    })
  );
};
