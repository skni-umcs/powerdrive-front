import React, { useRef, useState } from "react";
import { bind } from "react-rxjs";
import {
  primaryFilesViewFiles$,
  primaryFilesViewPath$,
  secondaryFilesViewFiles$,
  secondaryFilesViewPath$,
  selectedFiles$,
  setPrimaryFilesViewPath,
  setSecondaryFilesViewPath,
  splitViewEnabled$,
  uploadFile,
  deleteFile,
  sortType$,
  sortMode$,
} from "../../../../../../../services/DriveService";
import AddIcon from "@mui/icons-material/Add";
import DriveFilesView from "./components/DriveFilesView";
import { mobileView$ } from "../../../../../../../services/DimensionsService";
import {
  Divider,
  Fab,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { language$ } from "../../../../../../../services/LanguageService";
import { first } from "rxjs";
import CreateFolderDialog from "../../../createFolderModal/CreateFolderDialog";
import { FilesViewTypeEnum } from "../../../../../../../enums/FilesViewTypeEnum";
import { FileData } from "../../../../../../../models/api/FileData";
import { useNavigate } from "react-router-dom";
import DeleteFileDialog from "../../../deleteFileModal/DeleteFileDialog";

const [useLanguage] = bind(language$);
const [useSplitViewEnabled] = bind(splitViewEnabled$);
const [useMobileView] = bind(mobileView$);
const [usePrimaryFilesViewPath] = bind(primaryFilesViewPath$);
const [usePrimaryFilesViewFiles] = bind(primaryFilesViewFiles$);
const [useSecondaryFilesViewPath] = bind(secondaryFilesViewPath$);
const [useSecondaryFilesViewFiles] = bind(secondaryFilesViewFiles$);
const [useSelectedFiles] = bind(selectedFiles$);
const [useSortType] = bind(sortType$);
const [useSortMode] = bind(sortMode$);

const DriveFilesViewContainer = () => {
  const LANGUAGE = useLanguage();
  const splitViewEnabled = useSplitViewEnabled();
  const mobileView = useMobileView();
  const primaryFilesViewPath = usePrimaryFilesViewPath();
  const primaryFilesViewFiles = usePrimaryFilesViewFiles();
  const secondaryFilesViewPath = useSecondaryFilesViewPath();
  const secondaryFilesViewFiles = useSecondaryFilesViewFiles();
  const selectedFiles = useSelectedFiles();
  const sortType = useSortType();
  const sortMode = useSortMode();
  const [addMenuOpen, setAddMenuOpen] = useState<boolean>(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const inputFile = useRef(
    null
  ) as React.MutableRefObject<HTMLInputElement | null>;
  const inputFolder = useRef(
    null
  ) as React.MutableRefObject<HTMLInputElement | null>;
  const [createFolderDialogOpened, setCreateFolderDialogOpened] =
    useState<boolean>(false);
  const [createFolderDialogLoading, setCreateFolderDialogLoading] =
    useState<boolean>(false);
  const [deleteFileDialogOpened, setDeleteFileDialogOpened] =
    useState<boolean>(false);
  const [deleteFileDialogLoading, setDeleteFileDialogLoading] =
    useState<boolean>(false);
  const [fileToDelete, setFileToDelete] = useState<FileData | null>(null);
  const navigate = useNavigate();

  const handleCloseAddMenu = () => {
    setAddMenuOpen(false);
  };

  const handleToggleAddMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAddMenuOpen(!addMenuOpen);
    setMenuAnchor(e.currentTarget);
  };

  const handleOpenFileUpload = () => {
    inputFile!.current!.click();
    handleCloseAddMenu();
  };

  const handleOpenFolderUpload = () => {
    inputFolder!.current!.click();
    handleCloseAddMenu();
  };

  const handleOpenCreateFolderDialog = () => {
    setCreateFolderDialogOpened(true);
    handleCloseAddMenu();
  };

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files[0] || !primaryFilesViewPath) return;

    const path = primaryFilesViewPath[primaryFilesViewPath.length - 1].path;
    uploadFile(files[0], path, false)
      .pipe(first())
      .subscribe((result) => {
        if (!result.isSuccessful) console.error(result.error);
      });
  };

  const handleUploadFolder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      console.log(files);
    }
  };

  const handleCreateFolder = (folderName: string | null) => {
    if (!folderName || !primaryFilesViewPath) {
      setCreateFolderDialogOpened(false);
      setCreateFolderDialogLoading(false);
      return;
    }

    setCreateFolderDialogLoading(true);
    const path =
      primaryFilesViewPath[primaryFilesViewPath.length - 1].path +
      (primaryFilesViewPath.length > 1 ? "/" : "") +
      folderName;

    uploadFile(null, path, true)
      .pipe(first())
      .subscribe((result) => {
        if (result.isSuccessful) {
          setCreateFolderDialogOpened(false);
        } else {
          console.error(result.error);
        }

        setCreateFolderDialogLoading(false);
      });
  };

  const handleChangeFilesViewPath = (
    filesViewType: FilesViewTypeEnum,
    folder: FileData
  ) => {
    if (filesViewType === FilesViewTypeEnum.PRIMARY) {
      if (!primaryFilesViewPath) return;
      const updatedPath = [...primaryFilesViewPath, folder];
      setPrimaryFilesViewPath(updatedPath);
      navigate(folder.filename);
    } else {
      if (!secondaryFilesViewPath) return;
      const updatedPath = [...secondaryFilesViewPath, folder];
      setSecondaryFilesViewPath(updatedPath);
    }
  };

  const handleOpenDeleteFileDialog = (file: FileData) => {
    setFileToDelete(file);
    setDeleteFileDialogOpened(true);
  };

  const handleDeleteFile = (file: FileData | null) => {
    if (!file) {
      setDeleteFileDialogOpened(false);
      setDeleteFileDialogLoading(false);
      return;
    }

    setDeleteFileDialogLoading(true);

    deleteFile(file.id)
      .pipe(first())
      .subscribe((result) => {
        if (result.isSuccessful) {
          setDeleteFileDialogOpened(false);
        } else {
          console.error(result.error);
        }

        setDeleteFileDialogLoading(false);
      });
  };

  return (
    <React.Fragment>
      <div className="app__drive__files__view__container">
        <DriveFilesView
          splitViewEnabled={splitViewEnabled}
          mobileView={mobileView}
          previewPath={primaryFilesViewPath}
          selectedFiles={selectedFiles}
          files={primaryFilesViewFiles}
          onPathChange={(folder) =>
            handleChangeFilesViewPath(FilesViewTypeEnum.PRIMARY, folder)
          }
          filesViewType={FilesViewTypeEnum.PRIMARY}
          onFileDelete={handleOpenDeleteFileDialog}
          sortType={sortType}
          sortMode={sortMode}
        />
        {splitViewEnabled && !mobileView && (
          <React.Fragment>
            <Divider
              sx={{ marginLeft: "2%", marginRight: "2%" }}
              orientation="vertical"
              flexItem
            />
            <DriveFilesView
              splitViewEnabled={splitViewEnabled}
              mobileView={mobileView}
              previewPath={secondaryFilesViewPath}
              selectedFiles={selectedFiles}
              files={secondaryFilesViewFiles}
              onPathChange={(folder) =>
                handleChangeFilesViewPath(FilesViewTypeEnum.SECONDARY, folder)
              }
              filesViewType={FilesViewTypeEnum.SECONDARY}
              onFileDelete={handleOpenDeleteFileDialog}
              sortType={sortType}
              sortMode={sortMode}
            />
          </React.Fragment>
        )}
        <Fab
          onClick={handleToggleAddMenu}
          color={"primary"}
          sx={{ position: "absolute", bottom: mobileView ? 66 : 24, right: 24 }}
        >
          <AddIcon />
        </Fab>
        <Menu
          open={addMenuOpen}
          onClose={handleCloseAddMenu}
          anchorEl={menuAnchor}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleOpenFileUpload}>
            <ListItemIcon>
              <UploadFileIcon />
            </ListItemIcon>
            <ListItemText>{LANGUAGE.DRIVE.UPLOAD_FILE}</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleOpenFolderUpload}>
            <ListItemIcon>
              <DriveFolderUploadIcon />
            </ListItemIcon>
            <ListItemText>{LANGUAGE.DRIVE.UPLOAD_FOLDER}</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleOpenCreateFolderDialog}>
            <ListItemIcon>
              <CreateNewFolderIcon />
            </ListItemIcon>
            <ListItemText>{LANGUAGE.DRIVE.CREATE_FOLDER}</ListItemText>
          </MenuItem>
        </Menu>
      </div>
      <input
        onChange={handleUploadFile}
        type="file"
        id="fileInput"
        ref={inputFile}
        style={{ display: "none" }}
      />
      <input
        onChange={handleUploadFolder}
        type="file"
        multiple
        id="folderInput"
        ref={inputFolder}
        style={{ display: "none" }}
      />
      <CreateFolderDialog
        open={createFolderDialogOpened}
        loading={createFolderDialogLoading}
        onClose={handleCreateFolder}
      />
      <DeleteFileDialog
        open={deleteFileDialogOpened}
        loading={deleteFileDialogLoading}
        file={fileToDelete}
        onClose={handleDeleteFile}
      />
    </React.Fragment>
  );
};

export default DriveFilesViewContainer;