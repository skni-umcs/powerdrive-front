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

interface DeleteDialogProps {
  open: boolean;
  loading: boolean;
  data: any;
  title: string;
  description: string;
  onClose: (data: any | null) => void;
}

const [useLanguage] = bind(language$);

const DeleteDialog = ({
  open,
  loading,
  data,
  title,
  description,
  onClose,
}: DeleteDialogProps) => {
  const LANGUAGE = useLanguage();

  const handleClose = () => {
    onClose(null);
  };

  const handleSubmitDelete = () => {
    onClose(data);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text">
          {LANGUAGE.COMMON.DELETE_DIALOG.CANCEL}
        </Button>
        <LoadingButton
          autoFocus
          loading={loading}
          onClick={handleSubmitDelete}
          variant="outlined"
          color="error"
        >
          {LANGUAGE.COMMON.DELETE_DIALOG.DELETE}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
