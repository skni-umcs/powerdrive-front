import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { language$ } from "../../../../../services/LanguageService";
import { bind } from "react-rxjs";
import { LoadingButton } from "@mui/lab";
import { FileData } from "../../../../../models/api/FileData";

interface DeleteFileDialogProps {
  open: boolean;
  loading: boolean;
  file: FileData | null;
  onClose: (file: FileData | null) => void;
}

const [useLanguage] = bind(language$);

const DeleteFileDialog = ({
  open,
  loading,
  file,
  onClose,
}: DeleteFileDialogProps) => {
  const LANGUAGE = useLanguage();

  const handleClose = () => {
    onClose(null);
  };

  const handleSubmitDelete = () => {
    onClose(file);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="deleteFolderDialogTitle"
      aria-describedby="deleteFolderDialogDescription"
    >
      <DialogTitle id="deleteFolderDialogTitle">
        {
          LANGUAGE.DRIVE.DELETE_FILE_DIALOG[
            file?.is_dir ? "FOLDER_TITLE" : "FILE_TITLE"
          ]
        }
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {LANGUAGE.DRIVE.DELETE_FILE_DIALOG.DESCRIPTION}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text">
          {LANGUAGE.DRIVE.DELETE_FILE_DIALOG.CANCEL}
        </Button>
        <LoadingButton
          autoFocus
          loading={loading}
          onClick={handleSubmitDelete}
          variant="outlined"
          color="error"
        >
          {LANGUAGE.DRIVE.DELETE_FILE_DIALOG.DELETE}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteFileDialog;
