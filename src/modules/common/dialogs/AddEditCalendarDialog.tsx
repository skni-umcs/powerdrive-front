import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  TextField,
} from "@mui/material";
import { CalendarData } from "../../../models/api/CalendarData";
import { bind } from "react-rxjs";
import { language$ } from "../../../services/LanguageService";
import { TransitionProps } from "@mui/material/transitions";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import { FormField } from "../../../models/ui/FormField";
import { RequiredValidator } from "../../form/validators/RequiredValidator";
import { MuiColorInput } from "mui-color-input";

interface AddEditCalendarDialogProps {
  open: boolean;
  onClose: () => void;
  isInProgress: boolean;
  isEdit: boolean;
  calendar?: CalendarData;
  onEdit?: (calendar: Partial<CalendarData>) => void;
  onAdd?: (calendar: Partial<CalendarData>) => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const [useLanguage] = bind(language$);

const AddEditCalendarDialog = ({
  open,
  onClose,
  isInProgress,
  isEdit,
  calendar,
  onEdit,
  onAdd,
}: AddEditCalendarDialogProps) => {
  const LANGUAGE = useLanguage();

  const [id, setId] = useState<string>(calendar?.id ?? "");
  const [name, setName] = useState<FormField<string>>({
    value: calendar?.name ?? "",
    hasError: false,
    errorText: "",
    validators: [RequiredValidator],
  });
  const [description, setDescription] = useState<FormField<string>>({
    value: calendar?.description ?? "",
    hasError: false,
    errorText: "",
    validators: [RequiredValidator],
  });
  const [blockColor, setBlockColor] = useState<FormField<string>>({
    value: calendar?.block_color ?? "#058ED9",
    hasError: false,
    errorText: "",
    validators: [RequiredValidator],
  });

  const validateCalendar = (): boolean => {
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

  const handleEditCalendar = () => {
    return;
  };

  const getCalendar = (): Partial<CalendarData> => {
    return {
      ...calendar,
      id: id,
      name: name.value,
      description: description.value,
      block_color: blockColor.value,
    };
  };

  const handleAddCalendar = () => {
    if (!validateCalendar()) {
      onAdd(getCalendar());
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      hideBackdrop={true}
      TransitionComponent={Transition}
    >
      <DialogTitle>
        <div className="app__calendar__add-event-dialog__header">
          {
            LANGUAGE.CALENDAR.ADD_EDIT_CALENDAR_DIALOG[
              isEdit ? "EDIT_TITLE" : "ADD_TITLE"
            ]
          }
          <div>
            {isEdit && (
              <IconButton>
                <DeleteIcon />
              </IconButton>
            )}
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="app__calendar__event-form__section">
          <div className="app__calendar__event-form__section__row">
            <div className="app__calendar__event-form__section__column">
              <TextField
                fullWidth
                label={LANGUAGE.CALENDAR.ADD_EDIT_CALENDAR_DIALOG.NAME}
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
              <TextField
                fullWidth
                multiline
                label={LANGUAGE.CALENDAR.ADD_EDIT_CALENDAR_DIALOG.DESCRIPTION}
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
      </DialogContent>
      <DialogActions>
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
            {LANGUAGE.CALENDAR.ADD_EDIT_CALENDAR_DIALOG.CANCEL}
          </Button>
          <LoadingButton
            loading={isInProgress}
            onClick={() =>
              isEdit ? handleEditCalendar() : handleAddCalendar()
            }
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
              LANGUAGE.CALENDAR.ADD_EDIT_CALENDAR_DIALOG[
                isEdit ? "EDIT_ACTION" : "ADD_ACTION"
              ]
            }
          </LoadingButton>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditCalendarDialog;
