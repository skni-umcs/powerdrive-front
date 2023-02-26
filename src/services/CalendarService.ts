import { BehaviorSubject } from "rxjs";
import { CalendarData } from "../models/ui/CalendarData";
import { UpcomingEventData } from "../models/ui/UpcomingEventData";

const selectedDay = new BehaviorSubject<Date | null>(null);
export const selectedDay$ = selectedDay.asObservable();

const calendars = new BehaviorSubject<CalendarData[]>([
  { id: "1", name: "Calendar 1", color: "#DB5A42", isActivated: true },
  { id: "2", name: "Calendar 2", color: "#7CB518", isActivated: false },
]);

const upcomingEvents = new BehaviorSubject<UpcomingEventData[]>([
  {
    id: "1",
    title: "Nadchodzące wydarzenie",
    startDate: new Date("2023-01-17T15:00:00"),
    finishDate: new Date("2023-01-17T17:00:00"),
    color: "#7CB518",
  },
]);
export const upcomingEvents$ = upcomingEvents.asObservable();

export const calendars$ = calendars.asObservable();

export const setSelectedDay = (day: Date) => {
  selectedDay.next(day);
};

export const setCalendars = (cals: CalendarData[]) => {
  calendars.next(cals);
};
