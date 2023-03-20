import { SortModeEnum } from "../enums/SortModeEnum";
import { SortTypeEnum } from "../enums/SortTypeEnum";
import { FileData } from "../models/api/FileData";

export const getSortedFiles = (
  type: SortTypeEnum | null,
  mode: SortModeEnum | null,
  files: FileData[]
): FileData[] => {
  if (type === null || mode === null) {
    return files;
  }

  if (mode === SortModeEnum.ASC) {
    if (type === SortTypeEnum.NAME) {
      return files.sort((a: FileData, b: FileData) =>
        a.path.localeCompare(b.path)
      );
    } else if (type === SortTypeEnum.SIZE) {
      return files.sort((a: FileData, b: FileData) =>
        a.size && b.size ? a.size - b.size : 0
      );
    } else if (type === SortTypeEnum.DATE) {
      return files.sort((a: FileData, b: FileData) =>
        a.last_modified && b.last_modified
          ? a.last_modified.localeCompare(b.last_modified)
          : 0
      );
    } else {
      return files.sort((a: FileData, b: FileData) =>
        a.type.localeCompare(b.type)
      );
    }
  } else {
    if (type === SortTypeEnum.NAME) {
      return files.sort((a: FileData, b: FileData) =>
        b.path.localeCompare(a.path)
      );
    } else if (type === SortTypeEnum.SIZE) {
      return files.sort((a: FileData, b: FileData) =>
        a.size && b.size ? b.size - a.size : 0
      );
    } else if (type === SortTypeEnum.DATE) {
      return files.sort((a: FileData, b: FileData) =>
        a.last_modified && b.last_modified
          ? b.last_modified.localeCompare(a.last_modified)
          : 0
      );
    } else {
      return files.sort((a: FileData, b: FileData) =>
        b.type.localeCompare(a.type)
      );
    }
  }
};
