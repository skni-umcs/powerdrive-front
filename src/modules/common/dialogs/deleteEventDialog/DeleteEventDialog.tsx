import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { bind } from "react-rxjs";
import { LoadingButton } from "@mui/lab";
import { language$ } from "../../../../services/LanguageService";

interface DeleteFileDialogProps {
  open: boolean;
  loading: boolean;
  eventId: string;
  onClose: (eventId: string | null) => void;
}

const [useLanguage] = bind(language$);

const DeleteEventDialog = ({
  open,
  loading,
  eventId,
  onClose,
}: DeleteFileDialogProps) => {
  const LANGUAGE = useLanguage();

  const handleClose = () => {
    onClose(null);
  };

  const handleSubmitDelete = () => {
    onClose(eventId);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="deleteEventDialogTitle"
      aria-describedby="deleteEventDialogDescription"
    >
      <DialogTitle id="deleteEventDialogTitle">
        {LANGUAGE.CALENDAR.DELETE_EVENT_DIALOG.TITLE}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {LANGUAGE.CALENDAR.DELETE_EVENT_DIALOG.DESCRIPTION}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text">
          {LANGUAGE.CALENDAR.DELETE_EVENT_DIALOG.CANCEL}
        </Button>
        <LoadingButton
          autoFocus
          loading={loading}
          onClick={handleSubmitDelete}
          variant="outlined"
          color="error"
        >
          {LANGUAGE.CALENDAR.DELETE_EVENT_DIALOG.DELETE}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteEventDialog;
