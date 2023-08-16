import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { language$ } from "../../../../../services/LanguageService";
import { bind } from "react-rxjs";
import { LoadingButton } from "@mui/lab";

interface CreateFolderDialogProps {
  open: boolean;
  loading: boolean;
  onClose: (folderName: string | null) => void;
}

const [useLanguage] = bind(language$);

const CreateFolderDialog = ({
  open,
  loading,
  onClose,
}: CreateFolderDialogProps) => {
  const LANGUAGE = useLanguage();
  const [folderName, setFolderName] = React.useState<string>("");
  const [folderNameError, setFolderNameError] = React.useState<boolean>(false);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFolderName = event.target.value;
    setFolderName(updatedFolderName);
    setFolderNameError(
      updatedFolderName.length === 0 ||
        updatedFolderName.includes("/") ||
        folderName.includes(" ")
    );
  };

  const handleClose = () => {
    onClose(null);
    setFolderName("");
    setFolderNameError(false);
  };

  const handleSubmit = () => {
    if (
      folderName.length === 0 ||
      folderName.includes("/") ||
      folderName.includes(" ")
    ) {
      setFolderNameError(true);
      return;
    }

    onClose(folderName);
    setFolderName("");
    setFolderNameError(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="createFolderDialogTitle">
        {LANGUAGE.DRIVE.CREATE_FOLDER_DIALOG.TITLE}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {LANGUAGE.DRIVE.CREATE_FOLDER_DIALOG.DESCRIPTION}
        </DialogContentText>
        <TextField
          autoFocus
          error={folderNameError}
          fullWidth
          label={LANGUAGE.DRIVE.CREATE_FOLDER_DIALOG.DESCRIPTION}
          margin="dense"
          variant="filled"
          value={folderName}
          onChange={handleValueChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text" color="error">
          {LANGUAGE.DRIVE.CREATE_FOLDER_DIALOG.CANCEL}
        </Button>
        <LoadingButton
          loading={loading}
          onClick={handleSubmit}
          variant="outlined"
        >
          {LANGUAGE.DRIVE.CREATE_FOLDER_DIALOG.CREATE}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateFolderDialog;
