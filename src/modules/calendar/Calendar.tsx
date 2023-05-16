import React, { useEffect, useState } from "react";
import "../../styles/calendar.css";
import SecuredContainer from "../common/securedContainer/SecuredContainer";
import CalendarWeekView from "./views/weekView/CalendarWeekView";
import { CalendarEvent } from "../../models/api/CalendarEvent";
import {
  createEvent,
  deleteEvent,
  openAddCalendarDialog$,
  openAddEventDialog$,
  openEditCalendarDialog$,
  openEditEventDialog$,
  setHighlightedEvent,
  updateEvent,
} from "../../services/CalendarService";
import AddEditEventDialog from "../common/dialogs/addEventDialog/AddEditEventDialog";
import { mobileView$ } from "../../services/DimensionsService";
import { bind } from "react-rxjs";
import AddEditCalendarDialog from "../common/dialogs/AddEditCalendarDialog";

const [useMobileView] = bind(mobileView$);

const Calendar = () => {
  const mobileView = useMobileView();

  const [eventDialogOpen, setEventDialogOpen] = useState<boolean>(false);
  const [eventDialogEdit, setEventDialogEdit] = useState<boolean>(false);
  const [eventDialogEvent, setEventDialogEvent] =
    useState<Partial<CalendarEvent> | null>(null);
  const [eventActionInProgress, setEventActionInProgress] =
    useState<boolean>(false);

  const [calendarDialogOpen, setCalendarDialogOpen] = useState<boolean>(false);
  const [calendarDialogEdit, setCalendarDialogEdit] = useState<boolean>(false);
  const [calendarDialogCalendar, setCalendarDialogCalendar] =
    useState<Partial<CalendarEvent> | null>(null);
  const [calendarActionInProgress, setCalendarActionInProgress] =
    useState<boolean>(false);

  useEffect(() => {
    const subscription = openAddEventDialog$.subscribe((date) =>
      handleOpenAddEventDialog(date)
    );
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = openEditEventDialog$.subscribe((event) =>
      handleOpenEditEventDialog(event)
    );
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = openAddCalendarDialog$.subscribe(() =>
      handleOpenAddCalendarDialog()
    );
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = openEditCalendarDialog$.subscribe((calendar) =>
      handleOpenEditCalendarDialog(calendar)
    );
    return () => subscription.unsubscribe();
  }, []);

  const handleOpenAddEventDialog = (date: Date | undefined) => {
    setEventDialogEdit(false);
    setEventDialogEvent({ start_date: date });
    setEventActionInProgress(false);
    setHighlightedEvent(null);
    setEventDialogOpen(true);
  };

  const handleOpenEditEventDialog = (event: Partial<CalendarEvent>) => {
    setEventDialogEdit(true);
    setEventDialogEvent(event);
    setEventActionInProgress(false);
    setEventDialogOpen(true);
  };

  const handleCloseEventDialog = () => {
    setEventDialogOpen(false);
    setHighlightedEvent(null);
  };

  const handleAddEvent = (event: Partial<CalendarEvent>) => {
    setEventActionInProgress(true);

    createEvent(event).subscribe({
      next: (event) => {
        setEventActionInProgress(false);
        setEventDialogOpen(false);
        setHighlightedEvent(null);
      },
      error: (error) => {
        console.log("Error adding event: ", error);
        setEventActionInProgress(false);
        setHighlightedEvent(null);
      },
    });
  };

  const handleEditEvent = (event: Partial<CalendarEvent>) => {
    setEventActionInProgress(true);

    updateEvent(event).subscribe({
      next: (event) => {
        setEventActionInProgress(false);
        setEventDialogOpen(false);
        setHighlightedEvent(null);
      },
      error: (error) => {
        console.log("Error adding event: ", error);
        setEventActionInProgress(false);
        setHighlightedEvent(null);
      },
    });
  };

  const handleDeleteEvent = (eventId: string) => {
    setEventActionInProgress(true);

    deleteEvent(eventId).subscribe({
      next: (event) => {
        setEventActionInProgress(false);
        setEventDialogOpen(false);
        setHighlightedEvent(null);
      },
      error: (error) => {
        setEventActionInProgress(false);
        setHighlightedEvent(null);
      },
    });
  };

  const handleOpenAddCalendarDialog = () => {
    setCalendarDialogEdit(false);
    setCalendarDialogCalendar({});
    setCalendarActionInProgress(false);
    setCalendarDialogOpen(true);
  };

  const handleOpenEditCalendarDialog = (calendar: Partial<CalendarEvent>) => {
    setCalendarDialogEdit(true);
    setCalendarDialogCalendar(calendar);
    setCalendarActionInProgress(false);
    setCalendarDialogOpen(true);
  };

  const handleCloseCalendarDialog = () => {
    setCalendarDialogOpen(false);
  };

  return (
    <SecuredContainer>
      <div className="app__calendar__container">
        <CalendarWeekView />
        <AddEditEventDialog
          open={eventDialogOpen}
          onClose={handleCloseEventDialog}
          event={eventDialogEvent}
          isEdit={eventDialogEdit}
          isFullScreen={mobileView}
          isInProgress={eventActionInProgress}
          onEventAdd={handleAddEvent}
          onEventEdit={handleEditEvent}
          onEventDelete={handleDeleteEvent}
        />
        <AddEditCalendarDialog
          open={calendarDialogOpen}
          onClose={handleCloseCalendarDialog}
          isInProgress={calendarActionInProgress}
          isEdit={calendarDialogEdit}
        />
      </div>
    </SecuredContainer>
  );
};

export default Calendar;
