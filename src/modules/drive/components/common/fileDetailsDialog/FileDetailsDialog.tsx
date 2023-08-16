import React, { useEffect, useState } from "react";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { language$ } from "../../../../../services/LanguageService";
import { FileData } from "../../../../../models/api/FileData";
import { bind } from "react-rxjs";
import { mobileView$ } from "../../../../../services/DimensionsService";
import {getFileIcon} from "../../../../../services/FileUtil";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import HistoryIcon from '@mui/icons-material/History';
import {downloadFile} from "../../../../../services/DriveService";
import {first} from "rxjs";

interface FileDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  detailsFile: FileData;
  handleOpenDeleteFileDialog: (file: FileData) => void;
  handleOpenShareFileDialog: (file: FileData) => void;
}

const [useLanguage] = bind(language$);

const FileDetailsDialog = ({
  open,
  onClose,
  detailsFile,
  handleOpenDeleteFileDialog,
  handleOpenShareFileDialog,
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

  const handleDownload = () => {
    downloadFile(detailsFile).pipe(first()).subscribe();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
        <div className="app__file-details-dialog__icon__container">
          <img
            className="app__file-details-dialog__icon"
            alt={detailsFile.type}
            src={getFileIcon(detailsFile)}
          />
        </div>
        <div className="app__file-details-dialog_rows">
          <div className="app__file-details-dialog__row__content">
            <div className="app__file-details-dialog__row__content__title">
              {LANGUAGE.DRIVE.FILE_DETAILS_DIALOG.NAME}:
            </div>
            <div className="app__file-details-dialog__row__content__value">
              {detailsFile.filename}
            </div>
          </div>
          <div className="app__file-details-dialog__row__content">
            <div className="app__file-details-dialog__row__content__title">
              {LANGUAGE.DRIVE.FILE_DETAILS_DIALOG.PATH}:
            </div>
            <div className="app__file-details-dialog__row__content__value">
              {detailsFile.path}
            </div>
          </div>
          <div className="app__file-details-dialog__row__content">
            <div className="app__file-details-dialog__row__content__title">
              {LANGUAGE.DRIVE.FILE_DETAILS_DIALOG.SIZE}:
            </div>
            <div className="app__file-details-dialog__row__content__value">
              {formatBytes(detailsFile.size!)}
            </div>
          </div>
          <div className="app__file-details-dialog__row__content">
            <div className="app__file-details-dialog__row__content__title">
              {LANGUAGE.DRIVE.FILE_DETAILS_DIALOG.UPDATED}:
            </div>
            <div className="app__file-details-dialog__row__content__value">
              {localLastModified}
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <div className="app__file-details-dialog__actions">
          <Tooltip
            title={LANGUAGE.DRIVE.FILE_CONTEXT.SHARE}
            placement="top"
          >
            <div
              className="app__file-details-dialog__action"
              onClick={() => {handleOpenShareFileDialog(detailsFile)}}
            >
              <IconButton aria-label="share" size="large">
                <ShareIcon fontSize="inherit" />
              </IconButton>
            </div>
          </Tooltip>
          <Tooltip
            title={LANGUAGE.DRIVE.FILE_CONTEXT.DOWNLOAD}
            placement="top"
          >
            <div
              className="app__file-details-dialog__action"
              onClick={handleDownload}
            >
              <IconButton aria-label="download" size="large">
                <DownloadIcon fontSize="inherit" />
              </IconButton>
            </div>
          </Tooltip>
          <Tooltip
            title={LANGUAGE.DRIVE.FILE_CONTEXT.SHOW_HISTORY}
            placement="top"
          >
            <div
              className="app__file-details-dialog__action"
              onClick={() => {console.log("File history not implemented")}}
            >
              <IconButton aria-label="show_history" size="large">
                <HistoryIcon fontSize="inherit" />
              </IconButton>
            </div>
          </Tooltip>
          <Tooltip
            title={LANGUAGE.DRIVE.FILE_CONTEXT.DELETE}
            placement="top"
          >
            <div
              className="app__file-details-dialog__action"
              onClick={() => {handleOpenDeleteFileDialog(detailsFile)}}
            >
              <IconButton aria-label="delete" size="large">
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </div>
          </Tooltip>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default FileDetailsDialog;