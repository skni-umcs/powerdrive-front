import React, { useEffect, useState } from "react";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { language$ } from "../../../../../services/LanguageService";
import { FileData } from "../../../../../models/api/FileData";
import { bind } from "react-rxjs";
import { mobileView$ } from "../../../../../services/DimensionsService";

interface FileDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  detailsFile: FileData;
}

const [useLanguage] = bind(language$);

const FileDetailsDialog = ({
  open,
  onClose,
  detailsFile,
}: FileDetailsDialogProps) => {
  const LANGUAGE = useLanguage();

  // const localLastModified = new Date(detailsFile.last_modified!).toLocaleString();
  const localLastModified = new Date(detailsFile.last_modified! + "Z").toLocaleString();
  function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="fileDetailsDialogTitle">
        {LANGUAGE.DRIVE.FILE_DETAILS_DIALOG.TITLE}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {LANGUAGE.DRIVE.FILE_DETAILS_DIALOG.NAME}: {detailsFile.filename}
        </DialogContentText>
        <DialogContentText>
          {LANGUAGE.DRIVE.FILE_DETAILS_DIALOG.PATH}: {detailsFile.path}
        </DialogContentText>
        <DialogContentText>
          {LANGUAGE.DRIVE.FILE_DETAILS_DIALOG.SIZE}: {formatBytes(detailsFile.size!)}
        </DialogContentText>
        <DialogContentText>
          {LANGUAGE.DRIVE.FILE_DETAILS_DIALOG.UPDATED}: {localLastModified}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
      </DialogActions>
    </Dialog>
  );
};

export default FileDetailsDialog;