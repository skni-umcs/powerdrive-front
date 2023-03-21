import React, { useCallback, useEffect, useState } from "react";
import { FileData } from "../../../../../../../../models/api/FileData";
import {
  downloadDirectoryContent,
  uploadFiles,
} from "../../../../../../../../services/DriveService";
import DriveBreadcrumbs from "../../../../driveBreadcrumbs/DriveBreadcrumbs";
import FileTile from "./FileTile";
import { Snackbar } from "@mui/material";
import { bind } from "react-rxjs";
import { Alert } from "@mui/lab";
import { language$ } from "../../../../../../../../services/LanguageService";
import { FilesViewTypeEnum } from "../../../../../../../../enums/FilesViewTypeEnum";
import { SortTypeEnum } from "../../../../../../../../enums/SortTypeEnum";
import { SortModeEnum } from "../../../../../../../../enums/SortModeEnum";
import { getSortedFiles } from "../../../../../../../../services/SortUtil";
import SkeletonFileTile from "./SkeletonFileTile";
import { useDropzone } from "react-dropzone";
import { first } from "rxjs";

interface DriveFilesViewProps {
  splitViewEnabled: boolean;
  mobileView: boolean;
  previewPath: FileData[] | null;
  selectedFiles: FileData[];
  files: FileData[];
  onPathChange: (folder: FileData) => void;
  filesViewType: FilesViewTypeEnum;
  onFileDelete: (file: FileData) => void;
  sortType: SortTypeEnum | null;
  sortMode: SortModeEnum | null;
}

const [useLanguage] = bind(language$);

const DriveFilesView = ({
  splitViewEnabled,
  mobileView,
  previewPath,
  selectedFiles,
  files,
  onPathChange,
  filesViewType,
  onFileDelete,
  sortType,
  sortMode,
}: DriveFilesViewProps) => {
  const LANGUAGE = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [errorSnackOpen, setErrorSnackOpen] = useState(false);

  const onDrop = useCallback((droppedFiles: File[]) => {
    handleUploadFile(droppedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true,
  });

  const handleUploadFile = (files: File[]) => {
    if (!files || files.length === 0 || !previewPath) return;

    const path = previewPath[previewPath.length - 1].path;
    uploadFiles(files, path)
      .pipe(first())
      .subscribe((result) => {
        if (!result.isSuccessful) console.error(result.error);
      });
  };

  useEffect(() => {
    if (previewPath === null) return;
    setIsLoading(true);
    downloadDirectoryContent(
      previewPath[previewPath.length - 1].id,
      filesViewType
    ).subscribe((result) => {
      if (!result.isSuccessful) {
        setErrorSnackOpen(true);
      }

      setIsLoading(false);
    });
  }, [previewPath]);

  return (
    <React.Fragment>
      <div {...getRootProps()} className="app__drive__files__view">
        <input className="input-zone" {...getInputProps()} />
        {splitViewEnabled && !mobileView && (
          <DriveBreadcrumbs viewType={filesViewType} />
        )}
        <div className="app__drive__file__files">
          {!isLoading
            ? getSortedFiles(sortType, sortMode, files).map((file) => (
                <FileTile
                  key={file.id}
                  file={file}
                  splitViewEnabled={splitViewEnabled}
                  selectedFiles={selectedFiles}
                  mobileView={mobileView}
                  onPathChange={onPathChange}
                  onFileDelete={onFileDelete}
                />
              ))
            : [...Array(5)].map((_, i) => <SkeletonFileTile key={i} />)}
        </div>
      </div>

      <Snackbar
        open={errorSnackOpen}
        autoHideDuration={6000}
        onClose={() => setErrorSnackOpen(false)}
      >
        <Alert severity={"error"} onClose={() => setErrorSnackOpen(false)}>
          {LANGUAGE.DRIVE.ERRORS.FOLDER_CONTENT_DOWNLOAD_ERROR}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default DriveFilesView;
