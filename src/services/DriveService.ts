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

const driveOperationInProgress = new BehaviorSubject<number[]>([]);
export const driveOperationInProgress$ =
  driveOperationInProgress.asObservable();

const downloadProgress = new BehaviorSubject<Map<number, number>>(
  new Map<number, number>()
);
export const downloadProgress$ = downloadProgress.asObservable();

const uploadProgress = new BehaviorSubject<Map<number, number>>(
  new Map<number, number>()
);
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
  if (status) {
    setSecondaryFilesViewPath(primaryFilesViewPath.getValue());
  }
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
  downloadRequestorPath: string
): Observable<OperationResult> => {
  const operationId = Math.random();

  driveOperationInProgress.next([
    ...driveOperationInProgress.getValue(),
    operationId,
  ]);

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
      const primaryFilesViewPathValue = primaryFilesViewPath.getValue()!;
      const secondaryFilesViewPathValue = secondaryFilesViewPath.getValue()!;

      if (
        primaryFilesViewPathValue[primaryFilesViewPathValue!.length - 1]
          .path === downloadRequestorPath
      ) {
        primaryFilesViewFiles.next(files);
      }

      if (
        secondaryFilesViewPathValue[secondaryFilesViewPathValue!.length - 1]
          .path === downloadRequestorPath
      ) {
        secondaryFilesViewFiles.next(files);
      }
    }),
    map((_) => ({ isSuccessful: true })),
    catchError((err) => of({ isSuccessful: false, error: err })),
    finalize(() =>
      driveOperationInProgress.next([
        ...driveOperationInProgress
          .getValue()
          .filter((op) => op !== operationId),
      ])
    )
  );
};

export const uploadFile = (
  fileData: File | null,
  path: string,
  isDir: boolean
): Observable<OperationResult> => {
  const operationId = Math.random();

  driveOperationInProgress.next([
    ...driveOperationInProgress.getValue(),
    operationId,
  ]);

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
          headers: {
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            uploadProgress.next(
              new Map(
                uploadProgress
                  .getValue()
                  .set(
                    operationId,
                    progressEvent.progress ? progressEvent.progress * 100 : 0
                  )
              )
            );
          },
        })
      )
    ),
    map((res) => res.data),
    tap((file) => {
      const primaryFilesViewPathValue = primaryFilesViewPath.getValue()!;
      const secondaryFilesViewPathValue = secondaryFilesViewPath.getValue()!;

      let primaryPath =
        primaryFilesViewPathValue[primaryFilesViewPathValue!.length - 1].path;
      let secondaryPath =
        secondaryFilesViewPathValue[secondaryFilesViewPathValue!.length - 1]
          .path;

      if (isDir) {
        const lastSeparatorIndex = path.lastIndexOf("/");

        if (lastSeparatorIndex !== -1) {
          path = path.substring(0, lastSeparatorIndex);
        }

        if (lastSeparatorIndex === 0) {
          path = "/";
        }
      }

      if (primaryPath === path) {
        primaryFilesViewFiles.next([...primaryFilesViewFiles.getValue(), file]);
      }

      if (secondaryPath === path) {
        secondaryFilesViewFiles.next([
          ...secondaryFilesViewFiles.getValue(),
          file,
        ]);
      }
    }),
    map((_) => ({ isSuccessful: true })),
    catchError((err) => of({ isSuccessful: false, error: err })),
    finalize(() => {
      driveOperationInProgress.next([
        ...driveOperationInProgress
          .getValue()
          .filter((op) => op !== operationId),
      ]);

      const updatedUploadMap = uploadProgress.getValue();
      updatedUploadMap.delete(operationId);

      uploadProgress.next(new Map(updatedUploadMap));
    })
  );
};

export const uploadFiles = (
  filesData: File[],
  path: string
): Observable<any> => {
  return zip(filesData.map((file) => uploadFile(file, path, false))).pipe(
    map((_) => ({ isSuccessful: true })),
    catchError((err) => of({ isSuccessful: false, error: err }))
  );
};

export const deleteFile = (fileId: string): Observable<OperationResult> => {
  const operationId = Math.random();

  driveOperationInProgress.next([
    ...driveOperationInProgress.getValue(),
    operationId,
  ]);

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
    finalize(() =>
      driveOperationInProgress.next([
        ...driveOperationInProgress
          .getValue()
          .filter((op) => op !== operationId),
      ])
    )
  );
};

export const downloadFile = (file: FileData): Observable<OperationResult> => {
  const operationId = Math.random();

  driveOperationInProgress.next([
    ...driveOperationInProgress.getValue(),
    operationId,
  ]);

  return getToken().pipe(
    switchMap((token) =>
      from(
        axios.get(baseUrl + "/file/" + file.id + "/download", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
          onDownloadProgress: (progressEvent) => {
            downloadProgress.next(
              new Map(
                downloadProgress
                  .getValue()
                  .set(
                    operationId,
                    progressEvent.progress ? progressEvent.progress * 100 : 0
                  )
              )
            );
          },
        })
      )
    ),
    map((response) => response.data),
    map((fileContent) => saveAs(fileContent, file.filename)),
    map((_) => ({ isSuccessful: true })),
    catchError((err) => of({ isSuccessful: false, error: err })),
    finalize(() => {
      driveOperationInProgress.next([
        ...driveOperationInProgress
          .getValue()
          .filter((op) => op !== operationId),
      ]);

      const updatedDownloadMap = downloadProgress.getValue();
      updatedDownloadMap.delete(operationId);

      downloadProgress.next(new Map(updatedDownloadMap));
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
