import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  PaperProps,
  Slide,
} from "@mui/material";
import Draggable from "react-draggable";
import { TransitionProps } from "@mui/material/transitions";
import { CalendarEvent } from "../../../../models/api/CalendarEvent";
import { language$ } from "../../../../services/LanguageService";
import { bind } from "react-rxjs";
import CloseIcon from "@mui/icons-material/Close";
import AddEventForm from "./AddEventForm";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "../deleteDialog/DeleteDialog";

interface AddEditEventDialogProps {
  open: boolean;
  onClose: () => void;
  event: Partial<CalendarEvent> | null;
  isEdit: boolean;
  isFullScreen: boolean;
  isInProgress: boolean;
  onEventAdd: (event: Partial<CalendarEvent>) => void;
  onEventEdit: (event: Partial<CalendarEvent>) => void;
  onEventDelete: (eventId: string) => void;
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

const AddEditEventDialog = ({
  open,
  onClose,
  event,
  isEdit,
  isFullScreen,
  isInProgress,
  onEventAdd,
  onEventEdit,
  onEventDelete,
}: AddEditEventDialogProps) => {
  const PaperComponent = (props: PaperProps) => {
    return isFullScreen ? (
      <Paper {...props} />
    ) : (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
        // defaultPosition={{ x: -500, y: -500 }}
      >
        <Paper {...props} />
      </Draggable>
    );
  };

  const LANGUAGE = useLanguage();
  const [deleteEventDialogOpen, setDeleteEventDialogOpen] = useState(false);

  const handleDeleteEvent = (eventId: string | null) => {
    setDeleteEventDialogOpen(false);
    if (eventId) {
      onEventDelete(eventId);
    }
  };

  const handleOpenDeleteEventDialog = () => {
    setDeleteEventDialogOpen(true);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen={isFullScreen}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        hideBackdrop={true}
        style={{ pointerEvents: "none" }}
        TransitionComponent={Transition}
      >
        <div style={{ pointerEvents: "all" }}>
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            <div className="app__calendar__add-event-dialog__header">
              {
                LANGUAGE.CALENDAR.ADD_EDIT_EVENT_DIALOG[
                  isEdit ? "EDIT_TITLE" : "ADD_TITLE"
                ]
              }
              <div>
                {isEdit && (
                  <IconButton onClick={handleOpenDeleteEventDialog}>
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
            <AddEventForm
              event={event}
              isEdit={isEdit}
              isInProgress={isInProgress}
              onClose={onClose}
              onEventAdd={onEventAdd}
              onEventEdit={onEventEdit}
            />
          </DialogContent>
        </div>
      </Dialog>
      {isEdit && event?.id && (
        <DeleteDialog
          open={open && deleteEventDialogOpen}
          loading={isInProgress}
          data={event?.id}
          title={LANGUAGE.CALENDAR.DELETE_EVENT_DIALOG.TITLE}
          description={LANGUAGE.CALENDAR.DELETE_EVENT_DIALOG.DESCRIPTION}
          onClose={handleDeleteEvent}
        />
      )}
    </React.Fragment>
  );
};

export default AddEditEventDialog;
