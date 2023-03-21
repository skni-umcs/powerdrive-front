import {
  BehaviorSubject,
  catchError,
  filter,
  finalize,
  from,
  map,
  Observable,
  of,
  switchMap,
  tap,
  zip,
} from "rxjs";
import { DriveViewModeEnum } from "../enums/DriveViewModeEnum";
import { SortTypeEnum } from "../enums/SortTypeEnum";
import { FileData } from "../models/api/FileData";
import { SortModeEnum } from "../enums/SortModeEnum";
import { getToken, identityUpdated$, loggedUser$ } from "./AuthService";
import axios from "axios";
import { baseUrl } from "../const/environment";
import { OperationResult } from "../models/api/OperationResult";
import { FilesViewTypeEnum } from "../enums/FilesViewTypeEnum";
import { saveAs } from "file-saver";

const directoryTree = new BehaviorSubject<FileData | null>(null);
export const directoryTree$ = directoryTree.asObservable();

const viewMode = new BehaviorSubject<DriveViewModeEnum>(DriveViewModeEnum.GRID);
export const viewMode$ = viewMode.asObservable();

const splitViewEnabled = new BehaviorSubject<boolean>(false);
export const splitViewEnabled$ = splitViewEnabled.asObservable();

const sortType = new BehaviorSubject<SortTypeEnum | null>(null);
export const sortType$ = sortType.asObservable();

const sortMode = new BehaviorSubject<SortModeEnum | null>(null);
export const sortMode$ = sortMode.asObservable();

const primaryFilesViewPath = new BehaviorSubject<FileData[] | null>(null);
export const primaryFilesViewPath$ = primaryFilesViewPath.asObservable();

const secondaryFilesViewPath = new BehaviorSubject<FileData[] | null>(null);
export const secondaryFilesViewPath$ = secondaryFilesViewPath.asObservable();

const primaryFilesViewFiles = new BehaviorSubject<FileData[]>([]);

export const primaryFilesViewFiles$ = primaryFilesViewFiles.asObservable();

const secondaryFilesViewFiles = new BehaviorSubject<FileData[]>([]);
export const secondaryFilesViewFiles$ = secondaryFilesViewFiles.asObservable();

const selectedFiles = new BehaviorSubject<FileData[]>([]);
export const selectedFiles$ = selectedFiles.asObservable();

const driveOperationInProgress = new BehaviorSubject<boolean>(false);
export const driveOperationInProgress$ =
  driveOperationInProgress.asObservable();

const downloadProgress = new BehaviorSubject<number | undefined>(undefined);
export const downloadProgress$ = downloadProgress.asObservable();

const uploadProgress = new BehaviorSubject<number | undefined>(undefined);
export const uploadProgress$ = uploadProgress.asObservable();

export const initializeDrive = (): Observable<any> => {
  return identityUpdated$.pipe(
    switchMap((_) => loggedUser$),
    tap((user) => {
      if (!user) directoryTree.next(null);
    }),
    filter(Boolean),
    switchMap((_) => getToken()),
    switchMap((token) =>
      from(
        axios.get<FileData>(baseUrl + "/file/dir_tree", {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
    ),
    tap((tree) => console.log(tree.data)),
    tap((tree) => directoryTree.next(tree.data)),
    catchError((err) => {
      console.error(err);
      return of(null);
    })
  );
};
export const setViewMode = (mode: DriveViewModeEnum) => {
  if (mode !== viewMode.getValue()) viewMode.next(mode);
};

export const setSplitViewEnabled = (status: boolean) => {
  if (status !== splitViewEnabled.getValue()) splitViewEnabled.next(status);
};

export const setPrimaryFilesViewPath = (path: FileData[] | null) => {
  primaryFilesViewPath.next(path);
};
export const setSecondaryFilesViewPath = (path: FileData[] | null) => {
  secondaryFilesViewPath.next(path);
};

export const setSortType = (type: SortTypeEnum | null) => {
  if (type !== sortType.getValue()) sortType.next(type);
};

export const setSortMode = (mode: SortModeEnum | null) => {
  if (mode !== sortMode.getValue()) sortMode.next(mode);
};

export const setSelectedFiles = (files: FileData[]) => {
  selectedFiles.next(files);
};

export const downloadDirectoryContent = (
  directoryId: string,
  downloadRequestor: FilesViewTypeEnum
): Observable<OperationResult> => {
  driveOperationInProgress.next(true);

  return getToken().pipe(
    switchMap((token) =>
      from(
        axios.get(baseUrl + `/file/${directoryId}/list`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
    ),
    map((res) => res.data),
    tap((files) => {
      if (downloadRequestor === FilesViewTypeEnum.PRIMARY) {
        primaryFilesViewFiles.next(files);
        if (
          secondaryFilesViewPath.getValue() === primaryFilesViewPath.getValue()
        ) {
          secondaryFilesViewFiles.next(files);
        }
      } else {
        secondaryFilesViewFiles.next(files);
        if (
          secondaryFilesViewPath.getValue() === primaryFilesViewPath.getValue()
        ) {
          primaryFilesViewFiles.next(files);
        }
      }
    }),
    map((_) => ({ isSuccessful: true })),
    catchError((err) => of({ isSuccessful: false, error: err })),
    finalize(() => driveOperationInProgress.next(false))
  );
};

export const uploadFile = (
  fileData: File | null,
  path: string,
  isDir: boolean
): Observable<OperationResult> => {
  driveOperationInProgress.next(true);

  const fileMeta = {
    path: path,
    is_dir: isDir,
  };

  const formData = new FormData();
  if (fileData) formData.append("file_data", fileData);
  formData.append("file_meta", JSON.stringify(fileMeta));

  return getToken().pipe(
    switchMap((token) =>
      from(
        axios.post(baseUrl + "/file", formData, {
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              uploadProgress.next(
                Math.round((progressEvent.loaded * 100) / progressEvent.total!)
              );
            }
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
    ),
    map((res) => res.data),
    tap((file) => {
      primaryFilesViewFiles.next([...primaryFilesViewFiles.getValue(), file]);
      if (
        secondaryFilesViewPath.getValue() === primaryFilesViewPath.getValue()
      ) {
        secondaryFilesViewFiles.next([
          ...secondaryFilesViewFiles.getValue(),
          file,
        ]);
      }
    }),
    map((_) => ({ isSuccessful: true })),
    catchError((err) => of({ isSuccessful: false, error: err })),
    finalize(() => {
      driveOperationInProgress.next(false);
      uploadProgress.next(undefined);
    })
  );
};

export const deleteFile = (fileId: string): Observable<OperationResult> => {
  driveOperationInProgress.next(true);

  return getToken().pipe(
    switchMap((token) =>
      from(
        axios.delete(baseUrl + "/file/" + fileId, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
    ),
    tap((_) => {
      primaryFilesViewFiles.next(
        primaryFilesViewFiles.getValue().filter((file) => file.id !== fileId)
      );
      secondaryFilesViewFiles.next(
        secondaryFilesViewFiles.getValue().filter((file) => file.id !== fileId)
      );
      selectedFiles.next(
        selectedFiles.getValue().filter((file) => file.id !== fileId)
      );
    }),
    map((_) => ({ isSuccessful: true })),
    catchError((err) => of({ isSuccessful: false, error: err })),
    finalize(() => driveOperationInProgress.next(false))
  );
};

export const downloadFile = (file: FileData): Observable<OperationResult> => {
  driveOperationInProgress.next(true);

  return getToken().pipe(
    switchMap((token) =>
      from(
        axios.get(baseUrl + "/file/" + file.id + "/download", {
          onDownloadProgress: (progressEvent) => {
            if (progressEvent.total) {
              downloadProgress.next(
                Math.round((progressEvent.loaded * 100) / progressEvent!.total!)
              );
            }
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        })
      )
    ),
    map((response) => response.data),
    map((fileContent) => saveAs(fileContent, file.filename)),
    map((_) => ({ isSuccessful: true })),
    catchError((err) => of({ isSuccessful: false, error: err })),
    finalize(() => {
      driveOperationInProgress.next(false);
      downloadProgress.next(undefined);
    })
  );
};

export const downloadSelectedFiles = (): Observable<OperationResult> => {
  return zip(
    selectedFiles
      .getValue()
      .filter((file) => !file.is_dir)
      .map((file) => downloadFile(file))
  ).pipe(
    map((_) => ({ isSuccessful: true })),
    catchError((err) => of({ isSuccessful: false, error: err }))
  );
};

export const deleteSelectedFiles = (): Observable<OperationResult> => {
  return zip(selectedFiles.getValue().map((file) => deleteFile(file.id))).pipe(
    tap((_) => selectedFiles.next([])),
    map((_) => ({ isSuccessful: true })),
    catchError((err) => of({ isSuccessful: false, error: err }))
  );
};
