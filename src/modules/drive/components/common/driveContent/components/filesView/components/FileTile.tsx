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
import DeleteIcon from "@mui/icons-material/Delete";
import { first } from "rxjs";

const DirectoryIcon = require("../../../../../../../../assets/images/folder.png");
const FileIcon = require("../../../../../../../../assets/images/file.png");
const DocIcon = require("../../../../../../../../assets/images/fileTypes/doc.png");
const GifIcon = require("../../../../../../../../assets/images/fileTypes/gif.png");
const JpgIcon = require("../../../../../../../../assets/images/fileTypes/jpg.png");
const MusicIcon = require("../../../../../../../../assets/images/fileTypes/music.png");
const PdfIcon = require("../../../../../../../../assets/images/fileTypes/pdf.png");
const PngIcon = require("../../../../../../../../assets/images/fileTypes/png.png");
const PptIcon = require("../../../../../../../../assets/images/fileTypes/ppt.png");
const TxtIcon = require("../../../../../../../../assets/images/fileTypes/txt.png");
const VideoIcon = require("../../../../../../../../assets/images/fileTypes/video.png");
const XlsIcon = require("../../../../../../../../assets/images/fileTypes/xls.png");
const XmlIcon = require("../../../../../../../../assets/images/fileTypes/xml.png");
const ZipIcon = require("../../../../../../../../assets/images/fileTypes/zip.png");

interface FileTileProps {
  file: FileData;
  splitViewEnabled: boolean;
  selectedFiles: FileData[];
  mobileView: boolean;
  onPathChange: (folder: FileData) => void;
  onFileDelete: (file: FileData) => void;
}

const [useLanguage] = bind(language$);

const getTileIcon = (file: FileData) => {
  if (file.is_dir) return DirectoryIcon;

  if (file.type === "application/pdf") return PdfIcon;
  else if (
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.type === "application/msword"
  )
    return DocIcon;
  else if (
    file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.type === "application/vnd.ms-excel"
  )
    return XlsIcon;
  else if (
    file.type ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
    file.type === "application/vnd.ms-powerpoint"
  )
    return PptIcon;
  else if (file.type === "application/xml") return XmlIcon;
  else if (file.type === "text/plain") return TxtIcon;
  else if (file.type === "image/gif") return GifIcon;
  else if (file.type === "image/jpeg") return JpgIcon;
  else if (file.type === "image/png") return PngIcon;
  else if (file.type.startsWith("audio")) return MusicIcon;
  else if (file.type.startsWith("video")) return VideoIcon;
  else if (file.type === "application/zip") return ZipIcon;
  else return FileIcon;
};

const FileTile = ({
  file,
  splitViewEnabled,
  selectedFiles,
  mobileView,
  onPathChange,
  onFileDelete,
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
    // TODO: Implement file rename modal
    handleCloseContextMenu();
  };

  const handleMove = () => {
    // TODO: Implement file move modal
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
            src={getTileIcon(file)}
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
