import { FileData } from "../models/api/FileData";

const DirectoryIcon = require("../assets/images/folder.png");
const FileIcon = require("../assets/images/file.png");
const DocIcon = require("../assets/images/fileTypes/doc.png");
const GifIcon = require("../assets/images/fileTypes/gif.png");
const JpgIcon = require("../assets/images/fileTypes/jpg.png");
const MusicIcon = require("../assets/images/fileTypes/music.png");
const PdfIcon = require("../assets/images/fileTypes/pdf.png");
const PngIcon = require("../assets/images/fileTypes/png.png");
const PptIcon = require("../assets/images/fileTypes/ppt.png");
const TxtIcon = require("../assets/images/fileTypes/txt.png");
const VideoIcon = require("../assets/images/fileTypes/video.png");
const XlsIcon = require("../assets/images/fileTypes/xls.png");
const XmlIcon = require("../assets/images/fileTypes/xml.png");
const ZipIcon = require("../assets/images/fileTypes/zip.png");

export const getFileIcon = (file: FileData) => {
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
