import React, { useState } from "react";
import { bind } from "react-rxjs";
import { language$ } from "../../../../../../services/LanguageService";
import {
  deleteSelectedFiles,
  downloadSelectedFiles,
  selectedFiles$,
  setSelectedFiles,
} from "../../../../../../services/DriveService";
import { IconButton, Tooltip } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { FileData } from "../../../../../../models/api/FileData";
import DeleteDialog from "../../../../../common/dialogs/deleteDialog/DeleteDialog";

const [useLanguage] = bind(language$);
const [useSelectedFiles] = bind(selectedFiles$);

const SelectedFiles = () => {
  const LANGUAGE = useLanguage();
  const selectedFiles = useSelectedFiles();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDialogLoading, setDeleteDialogLoading] = useState(false);

  const handleClearSelected = () => {
    setSelectedFiles([]);
  };

  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteSelected = (files: FileData[]) => {
    if (!files) {
      return setDeleteDialogOpen(false);
    }

    setDeleteDialogLoading(true);
    deleteSelectedFiles().subscribe((result) => {
      setDeleteDialogLoading(false);
      setDeleteDialogOpen(false);
      if (!result.isSuccessful) {
        console.log(result.error);
      }
    });
  };

  const handleDownloadSelected = () => {
    downloadSelectedFiles().subscribe((result) => {
      if (!result.isSuccessful) {
        console.log(result.error);
      }
    });
  };

  return (
    <React.Fragment>
      {selectedFiles.length > 0 ? (
        <div className="app__drive__selected__container">
          <div className="app__drive__selected__text">
            {LANGUAGE.DRIVE.SELECTED_FILES.TITLE}: {selectedFiles.length}
          </div>
          <div className="app__drive__selected__actions">
            <Tooltip
              title={LANGUAGE.DRIVE.SELECTED_FILES.SHARE}
              placement="top"
            >
              <div className="app__drive__selected__action">
                <IconButton aria-label="share" size="small">
                  <ShareIcon fontSize="inherit" />
                </IconButton>
              </div>
            </Tooltip>
            <Tooltip
              title={LANGUAGE.DRIVE.SELECTED_FILES.DOWNLOAD}
              placement="top"
            >
              <div
                className="app__drive__selected__action"
                onClick={handleDownloadSelected}
              >
                <IconButton aria-label="download" size="small">
                  <DownloadIcon fontSize="inherit" />
                </IconButton>
              </div>
            </Tooltip>
            <Tooltip
              title={LANGUAGE.DRIVE.SELECTED_FILES.DELETE}
              placement="top"
            >
              <div
                className="app__drive__selected__action"
                onClick={handleOpenDeleteDialog}
              >
                <IconButton aria-label="delete" size="small">
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </div>
            </Tooltip>
            <Tooltip
              title={LANGUAGE.DRIVE.SELECTED_FILES.CLEAR}
              placement="top"
            >
              <div
                className="app__drive__selected__action"
                onClick={handleClearSelected}
              >
                <IconButton aria-label="clear" size="small">
                  <ClearIcon fontSize="inherit" />
                </IconButton>
              </div>
            </Tooltip>
          </div>
        </div>
      ) : null}
      <DeleteDialog
        open={deleteDialogOpen}
        loading={deleteDialogLoading}
        data={selectedFiles}
        title={LANGUAGE.DRIVE.SELECTED_FILES.DELETE_TITLE}
        description={LANGUAGE.DRIVE.SELECTED_FILES.DELETE_DESCRIPTION}
        onClose={handleDeleteSelected}
      />
    </React.Fragment>
  );
};

export default SelectedFiles;
