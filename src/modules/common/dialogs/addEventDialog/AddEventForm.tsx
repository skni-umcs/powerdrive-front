import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { CalendarEvent } from "../../../../models/api/CalendarEvent";
import { bind } from "react-rxjs";
import { language$ } from "../../../../services/LanguageService";
import { DatePicker, MobileTimePicker, TimePicker } from "@mui/x-date-pickers";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";
import { loggedUser$ } from "../../../../services/AuthService";
import { calendars$ } from "../../../../services/CalendarService";
import { MuiColorInput } from "mui-color-input";
import { FormField } from "../../../../models/ui/FormField";
import { RequiredValidator } from "../../../form/validators/RequiredValidator";
import { NotNullValidator } from "../../../form/validators/NotNullValidator";
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

interface AddEventFormProps {
  event: Partial<CalendarEvent> | null;
  isEdit: boolean;
  isInProgress: boolean;
  onClose: () => void;
  onEventAdd: (event: Partial<CalendarEvent>) => void;
  onEventEdit: (event: Partial<CalendarEvent>) => void;
}

const [useLanguage] = bind(language$);
const [useLoggedUser] = bind(loggedUser$);
const [useCalendars] = bind(calendars$);

const getEndTime = (startTime: Date, duration: number) => {
  const date = new Date(startTime!);
  date.setMinutes(startTime!.getMinutes() + duration!);
  return date;
};
const AddEventForm = ({
  event,
  isEdit,
  isInProgress,
  onClose,
  onEventAdd,
  onEventEdit,
}: AddEventFormProps) => {
  const LANGUAGE = useLanguage();
  const loggedUser = useLoggedUser();
  const calendars = useCalendars();

  const [id, setId] = useState<string>(event && event.id ? event.id : "");
  const [name, setName] = useState<FormField<string>>({
    value: event && event.name ? event.name : "",
    hasError: false,
    errorText: "",
    validators: [RequiredValidator],
  });
  const [place, setPlace] = useState<FormField<string>>({
    value: event && event.place ? event.place : "",
    hasError: false,
    errorText: "",
    validators: [RequiredValidator],
  });
  const [startDate, setStartDate] = useState<FormField<Date | null>>({
    value: event && event.start_date ? new Date(event.start_date) : null,
    hasError: false,
    errorText: "",
    validators: [NotNullValidator],
  });
  const [startTime, setStartTime] = useState<FormField<Date | null>>({
    value: event && event.start_date ? new Date(event.start_date) : null,
    hasError: false,
    errorText: "",
    validators: [NotNullValidator],
  });
  const [endTime, setEndTime] = useState<FormField<Date | null>>({
    value:
      event && event.start_date && event.duration
        ? getEndTime(event.start_date, event.duration)
        : null,
    hasError: false,
    errorText: "",
    validators: [NotNullValidator],
  });
  const [description, setDescription] = useState<FormField<string>>({
    value: event && event.description ? event.description : "",
    hasError: false,
    errorText: "",
    validators: [RequiredValidator],
  });
  const [calendarId, setCalendarId] = useState<FormField<string>>({
    value: event && event.calendar_id ? event.calendar_id : "",
    hasError: false,
    errorText: "",
    validators: [RequiredValidator],
  });
  const [organizerId, setOrganizerId] = useState<string>(
    event && event.organizer_id ? event.organizer_id : loggedUser!.id
  );
  const [blockColor, setBlockColor] = useState<FormField<string>>({
    value: event && event.block_color ? event.block_color : "#058ED9",
    hasError: false,
    errorText: "",
    validators: [RequiredValidator],
  });

  const getEvent = (): Partial<CalendarEvent> => {
    const startMinutesDate = new Date(startTime.value!);
    const endMinutesDate = new Date(endTime.value!);

    const startMinutes =
      startMinutesDate.getHours() * 60 + startMinutesDate.getMinutes();
    const endMinutes =
      endMinutesDate.getHours() * 60 + endMinutesDate.getMinutes();

    const start = new Date(startDate.value!);
    start.setHours(startMinutesDate.getHours());
    start.setMinutes(startMinutesDate.getMinutes() + dayjs().utcOffset());

    return {
      ...event,
      id: id,
      name: name.value,
      place: place.value,
      start_date: start,
      duration: endMinutes - startMinutes,
      description: description.value,
      calendar_id: calendarId.value,
      organizer_id: organizerId,
      block_color: blockColor.value,
    };
  };

  const validateEvent = (): boolean => {
    let isValid = true;

    name.validators.forEach((validator) => {
      const validationResult = validator(name.value);
      if (validationResult.hasError) {
        setName({
          ...name,
          hasError: true,
          errorText: validationResult.errorText,
        });
        isValid = false;
      }
    });

    place.validators.forEach((validator) => {
      const validationResult = validator(place.value);
      if (validationResult.hasError) {
        setPlace({
          ...place,
          hasError: true,
          errorText: validationResult.errorText,
        });
        isValid = false;
      }
    });

    startDate.validators.forEach((validator) => {
      const validationResult = validator(startDate.value);
      if (validationResult.hasError) {
        setStartDate({
          ...startDate,
          hasError: true,
          errorText: validationResult.errorText,
        });
        isValid = false;
      }
    });

    startTime.validators.forEach((validator) => {
      const validationResult = validator(startTime.value);
      if (validationResult.hasError) {
        setStartTime({
          ...startTime,
          hasError: true,
          errorText: validationResult.errorText,
        });
        isValid = false;
      }
    });

    endTime.validators.forEach((validator) => {
      const validationResult = validator(endTime.value);
      if (validationResult.hasError) {
        setEndTime({
          ...endTime,
          hasError: true,
          errorText: validationResult.errorText,
        });
        isValid = false;
      }
    });

    description.validators.forEach((validator) => {
      const validationResult = validator(description.value);
      if (validationResult.hasError) {
        setDescription({
          ...description,
          hasError: true,
          errorText: validationResult.errorText,
        });
        isValid = false;
      }
    });

    calendarId.validators.forEach((validator) => {
      const validationResult = validator(calendarId.value);
      if (validationResult.hasError) {
        setCalendarId({
          ...calendarId,
          hasError: true,
          errorText: validationResult.errorText,
        });
        isValid = false;
      }
    });

    blockColor.validators.forEach((validator) => {
      const validationResult = validator(blockColor.value);
      if (validationResult.hasError) {
        setBlockColor({
          ...blockColor,
          hasError: true,
          errorText: validationResult.errorText,
        });
        isValid = false;
      }
    });

    return isValid;
  };

  const handleAddEvent = () => {
    if (validateEvent()) onEventAdd(getEvent());
  };

  const handleEditEvent = () => {
    if (validateEvent()) onEventEdit(getEvent());
  };

  return (
    <div className="app__calendar__event__form">
      <div className="app__calendar__event-form__section">
        <div className="app__calendar__event-form__section__title"></div>
        <div className="app__calendar__event-form__section__row">
          <div className="app__calendar__event-form__section__column">
            <TextField
              fullWidth
              label={LANGUAGE.CALENDAR.ADD_EDIT_EVENT_DIALOG.EVENT_TITLE}
              variant="outlined"
              margin="none"
              value={name.value}
              error={name.hasError}
              onChange={(e) =>
                setName({ ...name, hasError: false, value: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      <div className="app__calendar__event-form__section">
        <div className="app__calendar__event-form__section__row">
          <div className="app__calendar__event-form__section__column">
            <DatePicker
              value={startDate.value ? dayjs(startDate.value) : null}
              label={LANGUAGE.CALENDAR.ADD_EDIT_EVENT_DIALOG.DATE}
              slotProps={{
                textField: {
                  error: startDate.hasError,
                },
              }}
              onChange={(date) =>
                setStartDate({
                  ...startDate,
                  hasError: false,
                  value: date ? date.toDate() : null,
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="app__calendar__event-form__section">
        <div className="app__calendar__event-form__section__row">
          <div className="app__calendar__event-form__section__column">
            <TimePicker
              disabled={!startDate.value}
              ampm={false}
              slotProps={{
                textField: {
                  error: startTime.hasError,
                },
              }}
              value={startTime.value ? dayjs(startTime.value) : null}
              onChange={(date) =>
                setStartTime({
                  ...startTime,
                  hasError: false,
                  value: date ? date.toDate() : null,
                })
              }
              sx={{ width: "100%" }}
              label={LANGUAGE.CALENDAR.ADD_EDIT_EVENT_DIALOG.FROM}
            />
          </div>
          <HorizontalRuleIcon />
          <div className="app__calendar__event-form__section__column">
            <TimePicker
              disabled={!startTime.value}
              ampm={false}
              slotProps={{
                textField: {
                  error: endTime.hasError,
                },
              }}
              value={endTime.value ? dayjs(endTime.value) : null}
              onChange={(date) =>
                setEndTime({
                  ...endTime,
                  hasError: false,
                  value: date ? date.toDate() : null,
                })
              }
              sx={{ width: "100%" }}
              label={LANGUAGE.CALENDAR.ADD_EDIT_EVENT_DIALOG.TO}
            />
          </div>
        </div>
      </div>

      <div className="app__calendar__event-form__section">
        <div className="app__calendar__event-form__section__row">
          <div className="app__calendar__event-form__section__column">
            <TextField
              fullWidth
              label={LANGUAGE.CALENDAR.ADD_EDIT_EVENT_DIALOG.PLACE}
              error={place.hasError}
              variant="outlined"
              margin="none"
              value={place.value}
              onChange={(e) =>
                setPlace({ ...place, hasError: false, value: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <div className="app__calendar__event-form__section">
        <div className="app__calendar__event-form__section__row">
          <div className="app__calendar__event-form__section__column">
            <TextField
              fullWidth
              multiline
              label={LANGUAGE.CALENDAR.ADD_EDIT_EVENT_DIALOG.DESCRIPTION}
              error={description.hasError}
              variant="outlined"
              margin="none"
              value={description.value}
              onChange={(e) =>
                setDescription({
                  ...description,
                  hasError: false,
                  value: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="app__calendar__event-form__section">
        <div className="app__calendar__event-form__section__row">
          <div className="app__calendar__event-form__section__column">
            <FormControl fullWidth error={calendarId.hasError}>
              <InputLabel>
                {LANGUAGE.CALENDAR.ADD_EDIT_EVENT_DIALOG.CALENDAR}
              </InputLabel>
              <Select
                value={calendarId.value}
                error={calendarId.hasError}
                onChange={(e) =>
                  setCalendarId({
                    ...calendarId,
                    hasError: false,
                    value: e.target.value,
                  })
                }
              >
                <MenuItem value="">-</MenuItem>
                {calendars.map((calendar) => (
                  <MenuItem value={calendar.id} key={calendar.id}>
                    {calendar.default
                      ? loggedUser?.first_name + " " + loggedUser?.last_name
                      : calendar.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>

      <div className="app__calendar__event-form__section">
        <div className="app__calendar__event-form__section__row">
          <div className="app__calendar__event-form__section__column">
            <MuiColorInput
              value={blockColor.value}
              error={blockColor.hasError}
              onChange={(_, colors) =>
                setBlockColor({
                  ...blockColor,
                  hasError: false,
                  value: colors.hex,
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="app__calendar__event-form__actions">
        <Button
          onClick={onClose}
          variant="text"
          sx={{
            "&:hover": {
              backgroundColor: "#2A5434",
            },
            color: "#3F784C",
          }}
        >
          {LANGUAGE.CALENDAR.ADD_EDIT_EVENT_DIALOG.CANCEL}
        </Button>
        <LoadingButton
          loading={isInProgress}
          onClick={() => (isEdit ? handleEditEvent() : handleAddEvent())}
          variant="contained"
          sx={{
            "&:hover": {
              backgroundColor: "#2A5434",
            },
            backgroundColor: "#3F784C",
            color: "#fff",
            marginLeft: "0.3rem",
          }}
        >
          {
            LANGUAGE.CALENDAR.ADD_EDIT_EVENT_DIALOG[
              isEdit ? "EDIT_ACTION" : "ADD_ACTION"
            ]
          }
        </LoadingButton>
      </div>
    </div>
  );
};

export default AddEventForm;
