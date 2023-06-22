import React, { useEffect, useState } from "react";
import { FileData } from "../../../../../../../../models/api/FileData";
import { ListItemIcon, Menu, MenuItem, MenuList, Paper } from "@mui/material";
import {
  downloadFile,
  setSelectedFiles,
} from "../../../../../../../../services/DriveService";
import { language$ } from "../../../../../../../../services/LanguageService";
import { bind } from "react-rxjs";
import DownloadIcon from "@mui/icons-material/Download";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import InfoIcon from "@mui/icons-material/Info";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import { first } from "rxjs";
import { getFileIcon } from "../../../../../../../../services/FileUtil";

interface FileTileProps {
  file: FileData;
  splitViewEnabled: boolean;
  selectedFiles: FileData[];
  mobileView: boolean;
  onPathChange: (folder: FileData) => void;
  onFileDelete: (file: FileData) => void;
  onFileShare: (file: FileData) => void;
  onFileRename: (file: FileData) => void;
  onFileMove: (file: FileData) => void;
}

const [useLanguage] = bind(language$);

const FileTile = ({
  file,
  splitViewEnabled,
  selectedFiles,
  mobileView,
  onPathChange,
  onFileDelete,
  onFileShare,
  onFileRename,
  onFileMove,
}: FileTileProps) => {
  const LANGUAGE = useLanguage();
  const [isSelected, setIsSelected] = useState(false);
  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  useEffect(() => {
    setIsSelected(selectedFiles.map((f) => f.id).includes(file.id));
  }, [selectedFiles]);

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();

    let updatedSelectedFiles: FileData[];

    if (isSelected) {
      updatedSelectedFiles = selectedFiles.filter((f) => f.id !== file.id);
      setSelectedFiles(updatedSelectedFiles);
    } else {
      updatedSelectedFiles = [...selectedFiles, file];
    }

    setSelectedFiles(updatedSelectedFiles);
  };

  const handleTileDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!file.is_dir) {
      handleDownload();
    }
  };

  const handleTileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (file.is_dir) {
      onPathChange(file);
    }
  };

  const handleOpenContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleDownload = () => {
    downloadFile(file).pipe(first()).subscribe();
    handleCloseContextMenu();
  };

  const handleRename = () => {
    onFileRename(file);
    handleCloseContextMenu();
  };

  const handleMove = () => {
    // TODO: Implement file move modal
    onFileMove(file);
    handleCloseContextMenu();
  };

  const handleShowDetails = () => {
    // TODO: Implement file details modal
    handleCloseContextMenu();
  };

  const handleDelete = () => {
    onFileDelete(file);
    handleCloseContextMenu();
  };

  const handleShare = () => {
    onFileShare(file);
    handleCloseContextMenu();
  };

  return (
    <React.Fragment>
      <div
        onContextMenu={handleOpenContextMenu}
        className={
          splitViewEnabled && !mobileView
            ? "app__drive__file__tile--splitview"
            : "app__drive__file__tile"
        }
        onDoubleClick={handleTileDoubleClick}
        onClick={handleTileClick}
      >
        <div
          className="app__drive__file__tile__selection__container"
          onClick={handleSelect}
        >
          <div
            className={
              isSelected
                ? "app__drive__file__tile__selection--active"
                : "app__drive__file__tile__selection"
            }
          />
        </div>
        <div className="app__drive__file__tile__icon__container">
          <img
            className="app__drive__file__tile__icon"
            alt={file.type}
            src={getFileIcon(file)}
          />
        </div>
        <div className="app__drive__file__tile__filename">{file.filename}</div>
      </div>
      <Menu
        open={contextMenu !== null}
        onClose={handleCloseContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <Paper>
          <MenuList>
            <MenuItem onClick={handleDownload}>
              <ListItemIcon>
                <DownloadIcon fontSize="small" />
              </ListItemIcon>
              {LANGUAGE.DRIVE.FILE_CONTEXT.DOWNLOAD}
            </MenuItem>
            <MenuItem onClick={handleRename}>
              <ListItemIcon>
                <DriveFileRenameOutlineIcon fontSize="small" />
              </ListItemIcon>
              {LANGUAGE.DRIVE.FILE_CONTEXT.RENAME}
            </MenuItem>
            <MenuItem onClick={handleMove}>
              <ListItemIcon>
                <DriveFileMoveIcon fontSize="small" />
              </ListItemIcon>
              {LANGUAGE.DRIVE.FILE_CONTEXT.MOVE}
            </MenuItem>
            <MenuItem onClick={handleShowDetails}>
              <ListItemIcon>
                <InfoIcon fontSize="small" />
              </ListItemIcon>
              {LANGUAGE.DRIVE.FILE_CONTEXT.SHOW_DETAILS}
            </MenuItem>
            <MenuItem onClick={handleShare}>
              <ListItemIcon>
                <ShareIcon fontSize="small" />
              </ListItemIcon>
              {LANGUAGE.DRIVE.FILE_CONTEXT.SHARE}
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              {LANGUAGE.DRIVE.FILE_CONTEXT.DELETE}
            </MenuItem>
          </MenuList>
        </Paper>
      </Menu>
    </React.Fragment>
  );
};

export default FileTile;
